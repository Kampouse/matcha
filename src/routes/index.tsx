import { type VoidComponent } from "solid-js";
import { Outlet } from "solid-start";
import Navbar from "../components/Navbar";
import { Headless } from "~/components/HeadLess";
import { createSignal, For, JSX, useContext, onMount } from "solid-js";
import { A } from "@solidjs/router"
import { trpc } from '~/utils/trpc';
 const Layout: VoidComponent = () => {
   
// const data =  trpc.database.example.useQuery()
  return (
<div>
       <Headless >
        <h1>
          
      hello

            </h1>
          <Outlet />
        </Headless>
</div>
  );
};

export default Layout;
