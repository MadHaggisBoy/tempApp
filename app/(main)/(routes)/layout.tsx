import { NavigationSidebar } from "@/components/navigation/navigation-side-bar";

const GroupOuterLayout = async ({
    children
}:{
    children: React.ReactNode;
}) => {
    return ( 
        <div className="h-full">
            <div className="hidden md:flex h-100 w-[150px] z-30 flex-col fixed inset-y-0">
                <NavigationSidebar />
            </div>
            <main className="md:pl-[72px] h-full">
                { children }
            </main>
        </div>
     );
}

export default GroupOuterLayout;