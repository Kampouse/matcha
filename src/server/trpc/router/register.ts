import { z } from "zod";
import { setToken } from "~/utils/trpc";
import { procedure, router } from "../utils";
import { registerFormSchema } from "~/utils/schemas";
import { createCookieSessionStorage } from "solid-start";
import { userSessionSchema } from "~/lib/session";
export default router({
    register: procedure.input(registerFormSchema).query(({ input, ctx }) => {

        console.log("register", input);
        return input
    }),
    cookie: procedure.input(userSessionSchema).query(({ input, ctx }) => {
        setToken(input)
        return input
    })


});

