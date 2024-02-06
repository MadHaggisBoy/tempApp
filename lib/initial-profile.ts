import { currentUser, redirectToSignIn } from "@clerk/nextjs";

import { db } from "./db";

export const initialProfile =async () => {
    //this gets the current users clerk profile
    const user = await currentUser();

    //if they are not logged in then send them to the sign in page
    if(!user){
        return redirectToSignIn();
    }

    //query database for profile with same id as the clerk acc id
    const profile = await db.profile.findUnique({
        where: {
            userId: user.id
        }
    });

    //if their profile exists return it
    if(profile){
        return profile;
    }
    //else create a new profile in the database using the information from clerk acc
    const newProfile = await db.profile.create({
        data: {
            userId: user.id,
            name: `${user.firstName} ${user.lastName}`,
            imageUrl: user.imageUrl,
            email: user.emailAddresses[0].emailAddress
        }
    });
    //thenreturn that profile
    return newProfile;
}