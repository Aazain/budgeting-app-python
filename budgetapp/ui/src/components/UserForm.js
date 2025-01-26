import { useState } from "react";
import { usePathname, redirect } from "next/navigation";
import { login, signup } from "../services/user.service";
import Swal from "sweetalert2";

export const UserForm = (props) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const location = usePathname();

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
            
          if (location === '/login'){
            result = await login(username, password)
          }
          else if (location === '/signup'){
            result = await signup(username, password)
          }
          else{
            redirect(`/login`)
          }

          if (result.success === true){
            redirect('/')
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
              title: `${props.currentForm} Failed`,
              text: "Please try again.",
            });
        }
      }
    };

    return(
        <div>
            <h1>{props.currentForm}</h1>
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
                  <button type="submit">{props.currentForm}</button>
              </div>
            </form>
        </div>
    )
}