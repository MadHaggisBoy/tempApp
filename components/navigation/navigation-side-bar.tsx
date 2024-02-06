import { currentProfile } from "@/lib/current-profile"
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Navigation } from "lucide-react";
import { CreateGroup } from "./create-group";
import { GroupButton } from "./group-button";

export const NavigationSidebar = async () => {
    const profile = await currentProfile();

    if (!profile) {
        return redirect("/");//might have to change this to sign in 
    }

    const group = await db.group.findMany({
        where: {
            members: {
                some: {
                    profileId: profile.id
                }
            }
        }
    });

    return (
        <div
            className="space-y-4 flex flex-col items-center h-full mt-[60px] text-primary w-full bg-[#E3E5E8] py-3"
        >   
            <CreateGroup />
            <Separator 
                className="h-[2px] bg-zinc-400 rounded-md w-20 mx-auto"
            />
            <ScrollArea className="flex-1 w-full">
                {group.map((group) =>(
                    <div key={group.id} className="mb-4">
                        <GroupButton
                            name={group.name}
                            id={group.id}
                        />
                    </div>
                ))}
            </ScrollArea>
            <div className="pb-3 mt-auto flex items-center flex-col gap-y-4">
                Footer stuff
            </div>
        </div>
    )
}