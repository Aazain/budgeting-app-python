import { useLocation } from "react-router-dom"
import { UserForm } from '../components/UserForm'

const Registration = () => {
  const location = useLocation();
  return(
      <div>
          { location.pathname === "/login"
            ? <UserForm currentForm="Login" redirectLink="/signup" /> 
            : <UserForm currentForm="Sign Up" redirectLink="/login" />}
        </div>
  )
}

export default Registration