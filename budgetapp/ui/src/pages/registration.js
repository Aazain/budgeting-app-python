import { UserForm } from "@/components/UserForm";
import { usePathname } from "next/navigation";

const Registration = () => {
  const location = usePathname();
  return(
      <div>
          { location.pathname === "/login"
            ? <UserForm currentForm="Login" redirectLink="/signup" /> 
            : <UserForm currentForm="Sign Up" redirectLink="/login" />}
        </div>
  )
}

export default Registration