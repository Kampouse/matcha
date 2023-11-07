import { initTRPC, TRPCError } from "@trpc/server";
import type { IContext } from "./context";

export const t = initTRPC.context<IContext>().create();
export const middleware = t.middleware;
export const router = t.router;
export const procedure = t.procedure;




const getServerUser = middleware(async (opts) => {
    const { ctx } = opts;

    if (await ctx.getUserServerSide()) {

        return opts.next({ ctx: { user: await ctx.getUserServerSide() } });
    }
    return opts.next({
        ctx: {
            user: ctx.getUserServerSide(),
        },
    });
});

export const auth = procedure.use(getServerUser);


