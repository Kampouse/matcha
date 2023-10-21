import { set, z } from "zod";
import { IAppRouter } from "./_app";
import { procedure, router, } from "../utils";
const User = z.array(z.object({
    uid: z.string(),
    email: z.string(),
}))
export default router({
    raw: procedure.input(z.string()).query(({ ctx, input }) => {
        return ctx.Turso.execute(input)
    }),
    example: procedure.query(({ ctx }) => {
        return ctx.Turso.execute("select * from example_users").then((result) => {
            return User.parse(result.rows.map((row) => {
                return { uid: row.uid, email: row.email }
            }))
        })

    }),

});
