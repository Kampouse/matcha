import { z } from "zod";
import { procedure, router } from "../utils";
import { createCookieSessionStorage } from "solid-start";
export default router({
    register: procedure.input(z.object({
        name: z.string(),
        password: z.string(),
        email: z.string()
    })).query(({ input, ctx }) => {

        return "no"
    }),

});

