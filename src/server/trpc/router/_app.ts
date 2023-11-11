import { router } from './../utils';
import { createSolidAPIHandler, createSolidAPIHandlerContext } from 'solid-start-trpc';
import { getUserTPC } from './../context';
import { IContext, createContextInner, createContext } from './../context';
import { t, procedure } from "~/server/trpc/utils"
import { useServerContext } from "solid-start";

//trpc.register. register. useQuery(() => content)
import example from "./example";
import database from "./database";
import session from "./session";
import { Clientdb as db } from "../database"
export const appRouter = router({
  example,
  database,
  session
});
const ctx = useServerContext();
const cookieHeaders = new Headers();
cookieHeaders.set("Set-Cookie", ctx.request?.headers.get("Cookie") ?? "");

export const caller = appRouter.createCaller({
  req: ctx.request,
  res: {
    headers: cookieHeaders
  },
  db: db,
  getUserServerSide: () => { return null }

})


// how to create a caller for this router
// import { createCaller } from "solid-start-trpc";
export type IAppRouter = typeof appRouter;

