import { set, z } from "zod";
import { IAppRouter } from "./_app";
import { procedure, router, auth } from "../utils";
import { getUser } from "~/lib/session";
import type { ResultSet } from "@libsql/client/.";
const User = z.array(z.object({
    uid: z.string(),
    email: z.string(),
}))
export default router({
    raw: procedure.input(z.string()).query(async ({ ctx, input }) => {
        let data: ResultSet | null = null
        try {

            data = await ctx.Turso.execute(input)
        }
        catch (e) {
            console.log(e)
            return null
        }

        return data
    }),
    example: procedure.query(({ ctx }) => {
        const user = ctx.getUserServerSide()
        console.log("server side", user?.username)
        return ctx.Turso.execute("select * from example_users").then((result) => {
            return User.parse(result.rows.map((row) => {
                return { uid: row.uid, email: row.email }
            }))
        })

    }),

});

