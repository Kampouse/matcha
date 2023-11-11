import {
  StartServer,
  createHandler,
  renderAsync,
} from "solid-start/entry-server";

import { redirect } from "solid-start";
import { getUser, userSessionSchema } from "./lib/session";
import { caller } from "./server/trpc/router/_app";
import { copyFileSync } from "fs";
export default createHandler(
  ({ forward }) => {
    return async event => {

        //look if the url start with /app/ if it does then check if the user is logged in 
      const run = false;
        const url = new URL(event.request.url)
        if (url.pathname.startsWith("/app/")) {
           
          const user = await getUser(event.request)
          if ( user === null || user?.username === undefined )
          {
            return redirect("/", { status: 302 });

          }          
            console.log("awaited",user)


            const cookie = userSessionSchema.safeParse(user)
            if (cookie.success) {
           // caller.session.cookie(cookie.data)
            }
            else {
              console.log("cookie", cookie.error)
            }
             console.log("called from entry server")


        
          // change this to something cleaner or safer ? ???
          //remove the /app/ from the url
        }
      return forward(event); // if we got here, and the pathname is inside the `protectedPaths` array - a user is logged in
    };
  },
  renderAsync(event => <StartServer event={event} />)
);



