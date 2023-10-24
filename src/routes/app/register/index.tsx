import  { trpc } from '~/utils/trpc';
import {
  POST, GET
} from '~/routes/api/register';
import { redirect, useRequest } from 'solid-start/server'
import { setCookie } from 'undici';
import { createCookie } from 'solid-start';
import { createServerData$,createServerAction$ } from 'solid-start/server';
import { createRouteAction } from 'solid-start';
import { createCookieSessionStorage } from 'solid-start';
import { createUserSession,getUser } from '~/lib/session';
// 
export default function Register() {
    const redir = async () => {
        createUserSession ( "hello" , "/app/profile" )
    }
    const [Form, sendForm] = createServerAction$(() => createUserSession ( "hello" , "/app/profiles" ))

 
const hello = "hello"  

  






  
 //  send data to the server the form data  
  const [form, setForm] = createServerAction$(async (form: FormData, { request }) => {

    if (!form.get("field_one")) {
       console.log("hello from server")
      return  { error: "field_one is required"}
    } 
     console.log(form.get("field_one"))
    
   return (createUserSession ( "hello" , "/app/profiles" ))
  })
  

const [data, setData] = createServerAction$((_,e) => {  
  e.request.formData().then((data) => {
     console.log(data.get("field_one"))
  })
    return  getUser(e.request)  
  } )
  
  const handleSubmit = (e: Event) => {
    const form = e.target as HTMLFormElement;
    // get form data 
    const formData = new FormData(form);
    // this will send data to the server 
     console.log(formData.get("field_one"))
     setForm(formData).then((data) => {
       if (typeof data === "string") {
         console.log(data)
       }
        console.log("hello")
      })
    //form data 
    
    e.preventDefault();
    setData().then(() => {

      console.log(data.result?.data)
      /*
          red().then ( () => {
              console.log("hello")
          } )
        */
      // check the cookie is set
          })
} 

  return (
       <div class=" flex flex-col items-center justify-center 
       border border-1 border-gray-900 rounded-lg  my-[100px] p-[2em]"  >
      <h1> Register to this shit fest </h1>
               <form onSubmit={(e) => handleSubmit(e)}> 
    <div class={"flex flex-col items-center justify-center    w-96 h-[25rem] border-1  "}>
           
      <div class="flex flex-col items-center justify-center    w-96 h-[25rem] border-1  ">
      <input name="field_one" type="text"  placeholder="username" class="bg-transparent border border-1 border-gray-900 text-center text-slate-50" />
      <input name="field_two" type="text" placeholder="password" class="bg-transparent border border-1 border-gray-900 text-slate-50 text-center" />
      <input name="field_three" type="text" placeholder="confirm password" class="bg-transparent border border-1 border-gray-900text-slate-50  text-center" />
             
        <button class="mt-6" type="submit" > hello </button>
         </div>


      </div>

      </form>

</div>
  );
}

