import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { MemberRole } from "@prisma/client";
import { redirect } from "next/navigation";
import { ScrollArea } from "../ui/scroll-area";
import { Hash, Mic, ShieldAlert, ShieldCheck, Video } from "lucide-react";
import { Separator } from "../ui/separator";
import { GroupSection } from "./group-section";
import { TopicButton } from "./topic-button";
import { GroupHeader } from "./group-header";

//props for passthrough from function call
interface GroupSidebarProps {
    groupId: string;
}

//this is a hashmap that assigns an icon to the different roles
const roleIconMap = {
    [MemberRole.MEMBER]: null,
    [MemberRole.MODERATOR]: <ShieldCheck className="h-4 w-4 mr-2 text-rose-500"/>,
    [MemberRole.OWNER]: <ShieldAlert className="h-4 w-4 mr-2 text-yellow-500"/>,
}

export const GroupSidebar = async ({
    groupId
}: GroupSidebarProps) => {
    //fetch current profile
    const profile = await currentProfile();

    //if there not logged in send back to root
    if(!profile) {
        return redirect("/");
    }

    //fetch the group
    const group = await db.group.findUnique({
        where: {
            id: groupId,
        },
        include: {
            topics: {
                orderBy: {
                    name: "asc",
                },
            },
            members: {
                include: {
                    profile: true,
                },
                orderBy: {
                    role: "asc",
                },
            },
        },
    });

    //fetch the topics
    const topics = group?.topics;
    //fetch the members (except the current user)
    const members = group?.members.filter((member) => member.profileId !== profile.id);

    //if theres no group redirect
    if(!group){
        //return redirect("/");
        return redirect("/groups");
    }

    //look through all members, serch for our matching profile id, once found search for roles.
    const role = group?.members.find((member) => member.profileId === profile.id)?.role;

    return (
        <div className="flex flex-col h-full text-primary w-full ml-[150] mt-[60px] bg-[#F2F3F5]">
            <GroupHeader 
                group = {group}
                role = {role}
            />
            <ScrollArea className="flex-1 px-3">
                <div className="mt-2">
                    Search Maybe
                </div>
                <Separator className="bg-zinc-200 rounded-md my-2"/>
                {!!topics?.length && (
                    <div className="mb-2">
                        <GroupSection
                            sectionType="topics"
                            role={role}
                            label="Create Topic"
                        />
                        <div className="space-y-[2px]">
                            {topics.map((topic) => (
                                <div>
                                    <TopicButton
                                        topic = {topic}
                                        group = {group}
                                        role = {role}
                                    
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                )}                
                {!!members?.length && (
                    <div className="mb-2">
                        <GroupSection sectionType="members" role={role} label="Members" />
                        <div className="space-y-[2px]">
                            {members.map((member) => (
                                <div>{member.profile.name}</div>
                            ))}
                        </div>
                    </div>
                )}
            </ScrollArea>
        </div>
    )
}