import { type VoidComponent } from "solid-js";
import { Outlet } from "solid-start";
import Navbar from "../components/Navbar";

import { createSignal, For, JSX, useContext, onMount } from "solid-js";
import { A } from "@solidjs/router"
import {  Headless  } from "../components/Headless";
 const Layout: VoidComponent = () => {
  return (
<div>
       <Navbar fields={["profiles","preferences"]} />
       <Headless >
            <h1 class=" ">hello this from a protected route in therory</h1>
          <Outlet />
        </Headless>
</div>
  );
};

export default Layout;
