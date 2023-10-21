
export default function Register() {
  const handleSubmit = (e: Event) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
      console.log("submitted");
    const data = Object.fromEntries(formData.entries())
    console.log(data);

  };

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

