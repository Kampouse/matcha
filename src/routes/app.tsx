import { type VoidComponent } from "solid-js";
import { Outlet } from "solid-start";
import Navbar from "../components/Navbar";

import { createSignal, For, JSX, useContext, onMount } from "solid-js";
import { A } from "@solidjs/router"
import {  Headless  } from "../components/Headless";
 const Layout: VoidComponent = () => {
  return (
<div>
       <Navbar fields={["profiles","preferences" ,"register"]} />
       <Headless >
            <h1 class=" " />
          <Outlet />
        </Headless>
</div>
  );
};

export default Layout;
