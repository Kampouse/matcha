import { Turso } from './../database';
import { router } from './../utils';
import { createSolidAPIHandler, createSolidAPIHandlerContext } from 'solid-start-trpc';
import { IContext, createContextInner, createContext } from './../context';
import { t, procedure } from "~/server/trpc/utils"
import { useServerContext } from "solid-start";

//trpc.register. register. useQuery(() => content)
import example from "./example";
import database from "./database";
import register from "./register";
export const appRouter = router({
  example,
  database,
  register
});
const ctx = useServerContext();
const header = ctx.request.headers as unknown as Record<string, unknown>;
export const caller = appRouter.createCaller({
  req: ctx.request,
  res: {
    headers: header
  },
  Turso: Turso

})


// how to create a caller for this router
// import { createCaller } from "solid-start-trpc";
export type IAppRouter = typeof appRouter;

