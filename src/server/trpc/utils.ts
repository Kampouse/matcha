import { initTRPC, TRPCError } from "@trpc/server";
import type { IContext } from "./context";

export const t = initTRPC.context<IContext>().create();
export const middleware = t.middleware;
export const router = t.router;
export const procedure = t.procedure;




const proctedted = middleware(async (opts) => {
    const { ctx } = opts;
    if (await ctx.user()) {

        throw new TRPCError({ code: 'UNAUTHORIZED' });
    }
    return opts.next({
        ctx: {
            user: ctx.user,
        },
    });
});

export const proc = procedure.use(proctedted);