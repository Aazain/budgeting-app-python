import { useState } from "react";
import { usePathname, redirect } from "next/navigation";
import { login, signup } from "../../services/user.service";
import { useRouter } from 'next/navigation';
import Swal from "sweetalert2";
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

export const UserForm = () => {
  const router = useRouter();
  const [authMode, setAuthMode] = useState("Sign Up")
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('email:' + username )
    console.log('password:' + password )
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
        
        authMode == 'Sign Up' 
        ? result = await signup(username, password, password2) 
        : result = await login(username, password);

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
            title: `${authMode} Failed`,
            text: "Please try again.",
          });
      }
    }
  };
  return(
    <div className={cn("flex flex-col gap-6")}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome back</CardTitle>
          <CardDescription>
            {authMode} with your Google account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <FieldGroup>
              <Field>
                <Button variant="outline" type="button">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                      fill="currentColor"
                    />
                  </svg>
                  {authMode} with Google
                </Button>
              </Field>
              <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                Or continue with
              </FieldSeparator>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  onChange={e => setUsername(e.target.value)}
                  required
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <a
                    href="#"
                    className="ml-auto text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input id="password" type="password" onChange={e => setPassword(e.target.value)} required />
              </Field>
              {authMode === 'Sign Up' &&
                <div>
                  <Field>
                    <div className="flex items-center">
                      <FieldLabel htmlFor="confirm-password">Confirm Password</FieldLabel>
                    </div>
                    <Input id="confirm-password" type="password" onChange={e => setPassword2(e.target.value)} required />
                  </Field>
                </div>
              }
              <Field>
                <Button type="submit">{authMode}</Button>
                <FieldDescription className="text-center">
                  {
                  authMode == 'Sign Up'
                    ? <>Already have an account? <a onClick={() => setAuthMode("Login")}>Log In</a></>
                    : <>Don&apos;t have an account? <a onClick={() => setAuthMode("Sign Up")}>Sign up</a></>
                  }
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}