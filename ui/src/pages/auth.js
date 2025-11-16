import { UserForm } from "@/components/UserForm";
import { useState } from "react";
const Auth = () => { // Single link to registration to reuse logic for both signup and login
  const [mode, setMode] = useState("Sign Up")

  return(
      <div>
          <UserForm authMode={mode} />

          {mode == "Sign Up" ? 
            <h1>Already have an account? 
            <button onClick={() => setMode("Login")}>Log In</button></h1>: 
            <h1>Don't have an account? 
            <button onClick={() => setMode("Sign Up")}>Sign Up</button></h1>
          }
      </div>
  )
}

export default Auth