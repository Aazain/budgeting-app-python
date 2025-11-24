
"use client"

import { UserForm } from "@/components/UserForm";
import { useState } from "react";
const Auth = () => { // Single link to registration to reuse logic for both signup and login
  return(
      <div>
        <UserForm/>
      </div>
  )
}

export default Auth