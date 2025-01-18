import { useState } from "react";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (event) =>{
        event.preventDefault();

    }

    return(
        <div>
            <h1>Login</h1>  
            <form onSubmit={handleSubmit}></form>
        </div>
    )
}

export default Login