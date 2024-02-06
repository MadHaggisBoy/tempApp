import { currentProfile } from "@/lib/current-profile";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { MemberRole } from "@prisma/client";

export async function DELETE(
    req: Request,
    { params }: { params: { topicId: string } }
) {
    try {
        const profile = await currentProfile();
        const { searchParams } = new URL(req.url);

        const groupId = searchParams.get("groupId");

        if(!profile){
            return new NextResponse("Unauthorised", {status: 401});
        }

        if(!groupId){
            return new NextResponse("Group ID missing", {status: 400});
        }

        if(!params.topicId){
            return new NextResponse("Topic ID missing", {status: 400});
        }

        const group = await db.group.update({
            where: {
                id: groupId,
                members: {
                    some: {
                        profileId: profile.id,
                        role: {
                            in: [MemberRole.OWNER, MemberRole.MODERATOR],
                        }
                    }
                }
            },
            data: {
                topics: {
                    delete: {
                        id: params.topicId,
                        name: {
                            not: "general",
                        }
                    }
                }
            }
        });

        return NextResponse.json(group);

    } catch(error) {
        console.log("[TOPIC_ID_DELETE]", error);
        return new NextResponse("Internal Error", {status: 500});
    }
}