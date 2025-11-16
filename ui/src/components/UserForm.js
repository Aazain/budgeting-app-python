import { useState } from "react";
import { usePathname, redirect } from "next/navigation";
import { login, signup } from "../services/user.service";
import { useRouter } from 'next/navigation';
import Swal from "sweetalert2";

export const UserForm = (props) => {
  const router = useRouter();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (event) => {
      event.preventDefault();
  
      if(!username || !password){
        Swal.fire({
          icon: "error",
          title: "Username and password are required.",
          text: "Please try again.",
        });
      }
      else{
        try{
          let result;

          props.authMode == 'Sign Up' ? result = await signup(username, password) : result = await login(username, password);

          console.log(result)

          if (result.success === true){
            router.push('/dashboard')
          }
          else{
            Swal.fire({
              icon: "error",
              title: `${result.message}`,
              text: `Please enter a valid username and password.`,
            })
          }
        } catch(err) {
            console.log(err)
            Swal.fire({
              icon: "error",
              title: `${props.authMode} Failed`,
              text: "Please try again.",
            });
        }
      }
    };

    return(
        <div>
            <h1>{props.authMode == "Login" ? "Log In" : "Sign Up"}</h1>
            <form onSubmit={handleSubmit}>
               <label>
                   <p>Username</p>
                  <input type="text" id="id_username" name="username" onChange={e => setUsername(e.target.value)}/>
              </label>
              <label>
                   <p>Password</p>
                  <input type="password" id="id_passsword" name="password" onChange={e => setPassword(e.target.value)}/>
              </label>
              <div>
                  <button type="submit">{props.authMode}</button>
              </div>
            </form>
        </div>
    )
}