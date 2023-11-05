import { type VoidComponent } from "solid-js";
import { Outlet } from "solid-start";
import Navbar from "../components/Navbar";
import { Headless } from "~/components/HeadLess";
import { createSignal, For, JSX, useContext, onMount } from "solid-js";
import { A } from "@solidjs/router"
 const Layout: VoidComponent = () => {
  return (
<div>
       <Headless >
            <h1 class=" " />
          <Outlet />
        </Headless>
</div>
  );
};

export default Layout;
