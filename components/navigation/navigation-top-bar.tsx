"use client";

import { UserButton } from "@clerk/nextjs";
import { Book, HelpCircle, Search } from "lucide-react";

export const NavigationTopbar = () => {
    
    return (
        <div className="flex flex-direction:row justify-center py-3 space-x-10 bg-rose-200">
            <p>BrainStorm</p>
            <a href="/groups" className="flex flex-direction:row hover:bg-rose-100 transition rounded-md"><Book/>My Groups</a>
            <a href="/help" className="flex flex-direction:row hover:bg-rose-100 rounded-md transition"><HelpCircle />Help</a>
            <a href="/browse" className="flex flex-direction:row hover:bg-rose-100 rounded-md transition"><Search />Browse Groups</a>
            <UserButton 
                afterSignOutUrl="/"
            />
        </div>
    )
}