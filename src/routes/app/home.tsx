import { For } from 'solid-js';
import { createBeforeLeave } from '@solidjs/router';
import { create } from 'domain';
import { on } from 'events';
import { Suspense,onMount,createSignal, createEffect,createResource } from 'solid-js';
import { trpc } from '~/utils/trpc';


const List  =  () => {
 const value = trpc.database.example.useQuery()
  value.isSuccess && console.log(value?.data)
  return (
    <div>
      <h1>list</h1>

      
      </div>
  );
}


export default function Home() {
  const [stuff2, setStuff2] = createSignal<string>("")
  const [stuffy, setStuffy] = createSignal<{ name: string, thing: string }>()


      
  return (
    <div>
       <List/>
      <h1>home page </h1>
    </div>

  );
}

