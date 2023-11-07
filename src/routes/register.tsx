import {
  POST, GET
} from '~/routes/api/register';
import { createServerData$, createServerAction$, redirect } from 'solid-start/server';
import { Headless } from '~/components/HeadLess';
import { createUserSession, getUser, UserSession } from '~/lib/session';
import type z from 'zod';
import { registerFormSchema } from "~/utils/schemas"
import { catchError } from 'solid-js';
import { caller } from "~/server/trpc/router/_app"
export default function Register() {


  type registerForm = z.infer<typeof registerFormSchema> | z.ZodIssue[]


  const [user, getus] = createServerAction$(async (_, { request }) => {
    const data = await getUser(request)
    console.log(data)
    return data

  })


  const [Cookie, sendCookie] = createServerAction$((user:FormData) =>  { 


  const  cookie = {  
    email: user.get("email") as string,
    username: user.get("username") as string,
    userId : "1",
    user  : true,
  loggedIn : true
    
   }  

   caller.register.cookie(cookie)




    return createUserSession(cookie, "/app/profiles")









  }) 

  //  send data to the server the form data  


  const [form, setForm] = createServerAction$(async (form: FormData, { request }) => {
    try {
      const output = await caller.register.register(form)
      return output
    }
    catch (e) {
      return e
    }
  })
  const Validation = (formData: FormData) => {
    type registerForm = z.infer<typeof registerFormSchema> | z.ZodIssue[]
    const result = registerFormSchema.safeParse(formData);
    return result.success ? result.data : result.error.issues.map((issue) => issue)
  }

  const onClientSubmit = (data: registerForm | z.ZodIssue[]) => {
    if (Array.isArray(data)) {
      const issues = data.map((issue) => { return { path: issue.path, message: issue.message } })
      console.log(issues)
      return false
    }
    else {
      return true

    }
  }
  const onServerSubmit = (data: FormData) => {
    console.log(data.get("email"))
    try {
      setForm(data).then((servData) => {
        if (typeof servData == typeof "string") {
          console.log(servData)
        }
      })
    }
    catch (e) {
      console.log(e)
    }

    sendCookie(data);

  }

  const MockSumbit = () => {
    const pass = { email: "jpmartel98@gmail.com", username: "Kampous", password: "HelloWord!123", re_password: "HelloWord!123" }
    const invalid_mail = { email: "jpmartel98gmail.com", username: "Kampous", password: "HelloWord!123", re_password: "HelloWord!123" }
    const invalid_username = { email: "jpmartel98@gmail.com", username: "Ka", password: "HelloWord!123", re_password: "HelloWord!123" }
    const invalid_pass = { email: "jpmartel98@gmail.com", username: "Ka", password: "He", re_password: "HelloWord!123" }


    const mocked = [pass, invalid_mail, invalid_username, invalid_pass]


    const mockForm = (mockData: typeof pass) => {
      const data = new FormData()

      data.append("email", mockData.email)
      data.append("username", mockData.username)
      data.append("password", mockData.password)
      data.append("re_password", mockData.re_password)

      return data
    }
    mocked.forEach((data) => {
      const status = Validation(mockForm(data))

      if (onClientSubmit(status)) {
        console.log("sending data to server", data)
        onServerSubmit(mockForm(data))
      }
      else { console.log("error", status) }


    })
  }

  const handleSubmit = (e: Event) => {
    const form = e.target as HTMLFormElement;
    e.preventDefault();
    const formData = new FormData(form);
    const validatedContent = Validation(formData)
    onClientSubmit(validatedContent) ? onServerSubmit(formData) : console.log("fall back to error state here")
  }
  const mockData = { email: "jpmartel98@gmail.com", username: "Kampouse", password: "HelloWord!123", re_password: "HelloWord!123" }
  const mockFn = (field: string) => {
    const mock = true;
    if (mock) {

      return field == "email" ? mockData.email : field == "username" ? mockData.username : field == "password" ? mockData.password : mockData.re_password

    }
    else { return "" }
  }

  //MockSumbit()
  return (
      <Headless>
    <div class=" flex flex-col items-center justify-center 
       border border-1 border-gray-900 rounded-lg  my-[100px] p-[2em]"  >
      <h1> Register to this shit fest </h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div class={"flex flex-col items-center justify-center    w-96 h-[25rem] border-1  "}>

          <div class="flex flex-col items-center justify-center    w-96 h-[25rem] border-1  ">
            <input name="email" type="text" placeholder="email" value={mockFn("email")} class="bg-transparent border border-1 border-gray-900 text-center text-slate-50" />

            <input name="username" type="text" placeholder="username" value={mockFn("username")} class="bg-transparent border border-1 border-gray-900 text-center text-slate-50" />

            <input name="password" type="text" placeholder="password" value={mockFn("password")} class="bg-transparent border border-1 border-gray-900 text-slate-50 text-center" />
            <input name="re_password" type="text" placeholder="confirm password" value={mockFn("password")} class="bg-transparent border border-1 border-gray-900text-slate-50  text-center" />

            <button class="mt-6" type="submit" > hello </button>
          </div>


        </div>

      </form>

    </div>
</Headless>
  );
}

