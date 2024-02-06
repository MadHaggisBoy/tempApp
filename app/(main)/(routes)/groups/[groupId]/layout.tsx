import { GroupSidebar } from "@/components/group/group-side-bar";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const GroupLayout = async ({
    children,
    params,
}: {
    children: React.ReactNode;
    params: {groupId: string};
}) => {
    //get the current user profile
    const profile = await currentProfile();

    //if they are not signed in redirect to sign in page
    if(!profile){
        return redirectToSignIn();
    }


    const group = await db.group.findUnique({
        where: {
            id: params.groupId,
            members: {
                some: {
                    profileId: profile.id
                }
            }
        }
    });

    if(!group) {
        return redirect("/");
    }

    return (
        <div className="h-full">
            <div className="hidden md:flex h-full w-60 z-20 flex-col ml-[80px] fixed inset-y-0">
                <GroupSidebar groupId={params.groupId}/>
            </div>
            <main className="ml-[90px] h-full md:pl-60">
                {children}
            </main>
        </div>
    );
}

export default GroupLayout;