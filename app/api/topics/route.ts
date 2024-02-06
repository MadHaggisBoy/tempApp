import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { MemberRole } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(
    req: Request
) {
    try {
        const profile = await currentProfile();
        const { name } = await req.json();
        const { searchParams} = new URL(req.url);

        const groupId = searchParams.get("groupId");

        if(!profile){
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if(!groupId){
            return new NextResponse("Group ID Missing", { status: 400 });
        }

        if (name === "general") {
            return new NextResponse("Topic name cannot be 'general'", { status: 400 });
        }

        const group = await db.group.update({
            where: {
                id: groupId,
                members: {
                    some: {
                        profileId: profile.id,
                        role: {
                            in: [MemberRole.OWNER, MemberRole.MODERATOR]
                        }
                    }
                }
            },
            data: {
                topics: {
                    create: {
                        profileId: profile.id,
                        name,
                    }
                }
            }
        });

        return NextResponse.json(group);

        
    } catch(error) {
        console.log("TOPICS_ERROR", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}