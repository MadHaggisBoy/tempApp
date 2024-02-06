import { db } from "@/lib/db";
import { initialProfile } from "@/lib/initial-profile";
import { redirect } from "next/navigation";

const LandingPage = async () => {
    //get profile of user
    const profile = await initialProfile();
    
    /*
    //find a group where the user is a member
    const group = await db.group.findFirst({
        where: {
            members: {
                some: {
                    profileId: profile.id
                }
            }
        }
    });

    */

    return ( 
        <div className="w-full h-full">
            Welcome {profile.name}, this will be the homepage
            <br />
            Some hot and upcoming groups::
            <br />
            
            {profile.email}
            <br />
            Admin analytics button(only displayed to admins)
        </div>
     );
}
 
export default LandingPage;