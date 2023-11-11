import { set, z } from "zod";
import { IAppRouter } from "./_app";
import { procedure, router, auth } from "../utils";
import { getUser } from "~/lib/session";
import type { ResultSet } from "@libsql/client/.";
const User = z.array(z.object({
    uid: z.string(),
    email: z.string(),
}))
const raw = z.object({
    input: z.string(),
    params: z.array(z.any())
})
export default router({

    raw: procedure.input(raw).query(async ({ ctx, input }) => {

        const stuff = await ctx.db.execute(input.input, [...input.params])
        console.log("raw", stuff);

        return stuff.rows


    }),
    example: procedure.query(({ ctx }) => {
        return ctx.db.execute("select * from example_users").then((result) => {
            return result.rows
        })

    }),

});

