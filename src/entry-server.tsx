import {
  StartServer,
  createHandler,
  renderAsync,
} from "solid-start/entry-server";

import { redirect } from "solid-start";
import { getUser } from "./lib/session";
export default createHandler(
  ({ forward }) => {
    return async event => {

        //look if the url start with /app/ if it does then check if the user is logged in 
      const run = false;
        const url = new URL(event.request.url)
        if (url.pathname.startsWith("/app/")) {
          const user = await getUser(event.request)
          // change this to something cleaner or safer ? ???
          //remove the /app/ from the url
          url.pathname = url.pathname.replace("/app/", "/")
           
          if (!user.data?.username) {
            return redirect("/"); // a page for a non logged in user
          }
        }
      return forward(event); // if we got here, and the pathname is inside the `protectedPaths` array - a user is logged in
    };
  },
  renderAsync(event => <StartServer event={event} />)
);



