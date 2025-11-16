import { env } from "@/config/env";

const getCsrfToken = async () => {
  const res = await fetch("http://127.0.0.1:8000/csrf/", {
    credentials: "include",
  });
  const data = await res.json()

  return data.csrftoken
}

export async function login(username, password){
    try {
        const response = await fetch(`${env()}/login/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrfToken,  // Send CSRF token in the headers
          },
          credentials: 'include',  // Include cookies 
          body: JSON.stringify({ username: username, password: password }),  // Send data in JSON format
        });

        const result = await response.json();
    
        if (response.ok) {
            return { success: true, data: result }
        } 
        else {
            return { success: false, message: result.message };
        }
      } catch (error) {
        return { success: false };
      }
}

export async function signup(username, password){

  let csrfToken = await getCsrfToken();
  console.log(csrfToken)

  try{
    const response = await fetch(`${env()}/signup/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrfToken,
      },
      credentials: 'include',
      body: JSON.stringify({ username: username, password1: password, password2: password})
    });

    const result = await response.json();

    if (response.ok) {
      return { success: true, data: result }
    } 
    else {
      console.log(result)
      return { success: false, message: result.message, details: result.details };
    }

  }catch(error){
    console.error('Error during signup:', error);
  }
}