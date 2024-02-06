import { NavigationTopbar } from "@/components/navigation/navigation-top-bar";

const AuthLayout = ({ children }: { children: React.ReactNode}) => {
    return ( 
        <div>
            <NavigationTopbar />
            {children}
        </div>
     );
}
 
export default AuthLayout;