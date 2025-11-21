import { env } from "@/config/env";

export async function login(username, password){
    try {
        const response = await fetch(`${env()}/api/token/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username: username, password: password }),  
        });

        const result = await response.json();
    
        if (response.ok) {
            localStorage.setItem('accessToken', result.access)
            localStorage.setItem('refreshToken', result.refresh)
            return {result, message: "Successfully logged in!", success: true}
        } 
        else {
            return { success: false, message: result.message };
        }
      } catch (error) {
        return { success: false, error: error };
      }
}

export async function refresh(){
  refreshToken = localStorage.getItem('refresh');
  
  try{
    const response = await fetch(`${env()}/api/token/refresh`, {
      method: 'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body: refreshToken
    })
    result = await response.json()

    if (response.ok){
      localStorage.setItem('accessToken', result.access)
    }
  }catch(err){
    return { success: false, error: err };
  }
}

export async function signup(username, password, password2){
  try{
    const response = await fetch(`${env()}/signup/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ username: username, password1: password, password2: password2})
    });

    const result = await response.json();

    if (response.ok) {
      login(username, password)
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

