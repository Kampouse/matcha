import type {JSX} from "solid-js";

export const  Headless = (props:{ children:JSX.Element }  ) => {
  return (    
    <main class="flex h-screen flex-col items-center  bg-gradient-to-b       from-slate-900 to-purple-900 ">
       { props.children }
     </main>
    )
}
