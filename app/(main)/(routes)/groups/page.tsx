import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { initialProfile } from "@/lib/initial-profile";
import { redirect } from "next/navigation";

const NoGroupsPage = async () => {
    const profile = await initialProfile();

    const group = await db.group.findFirst({
        where: {
            members: {
                some: {
                    profileId: profile.id
                }
            }
        }
    });

    if (group) {
        return redirect(`/groups/${group.id}`);
    }

    return ( 
        <div className="ml-[80px]">
            You arent in any groups
        </div>
     );
}
 
export default NoGroupsPage;