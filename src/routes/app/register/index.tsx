import {
  POST, GET
} from '~/routes/api/register';
import { createServerData$, createServerAction$ } from 'solid-start/server';
import { createUserSession, getUser } from '~/lib/session';
import type z from 'zod';
import { ZodType } from "~/utils/schemas"
import { catchError } from 'solid-js';
import { caller }  from "~/server/trpc/router/_app"

// 
const { formSchema } = ZodType()
export default function Register() {
  const redir = async () => {
    createUserSession("hello", "/app/profile")
  }

  type registerForm = z.infer<typeof formSchema> | z.ZodIssue[]
  const [Form, sendForm] = createServerAction$(() => createUserSession("hello", "/app/profiles"))
  //  send data to the server the form data  
  const [form, setForm] = createServerAction$(async (form: FormData, { request }) => {
       const content =  formSchema.parse(form)
     const output =  await caller.register.register(content)
      return output
  })
  const Validation = (formData: FormData) => {
    type registerForm = z.infer<typeof formSchema> | z.ZodIssue[]
    const result = formSchema.safeParse(formData);
    return result.success ? result.data : result.error.issues.map((issue) => issue)
  }

  const onClientSubmit = (data: registerForm | z.ZodIssue[]) => {
    if (Array.isArray(data)) {

      console.log("todo show error")
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

  }
  const handleSubmit = (e: Event) => {
    const form = e.target as HTMLFormElement;
    e.preventDefault();
    const formData = new FormData(form);
    const validatedContent = Validation(formData)
    onClientSubmit(validatedContent) ? onServerSubmit(formData) : console.log("fall back to error state here")
  }

  return (
    <div class=" flex flex-col items-center justify-center 
       border border-1 border-gray-900 rounded-lg  my-[100px] p-[2em]"  >
      <h1> Register to this shit fest </h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div class={"flex flex-col items-center justify-center    w-96 h-[25rem] border-1  "}>

          <div class="flex flex-col items-center justify-center    w-96 h-[25rem] border-1  ">
            <input name="email" type="text" placeholder="email" class="bg-transparent border border-1 border-gray-900 text-center text-slate-50" />

            <input name="username" type="text" placeholder="username" class="bg-transparent border border-1 border-gray-900 text-center text-slate-50" />

            <input name="password" type="text" placeholder="password" class="bg-transparent border border-1 border-gray-900 text-slate-50 text-center" />
            <input name="re_password" type="text" placeholder="confirm password" class="bg-transparent border border-1 border-gray-900text-slate-50  text-center" />

            <button class="mt-6" type="submit" > hello </button>
          </div>


        </div>

      </form>

    </div>
  );
}

