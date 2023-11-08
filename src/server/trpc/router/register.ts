import { z } from "zod";
import { setToken } from "~/utils/trpc";
import { procedure, router } from "../utils";
import { registerFormSchema, loginFormSchema, SessionsVerif } from "~/utils/schemas";
import { createCookieSessionStorage } from "solid-start";
import { userSessionSchema } from "~/lib/session";
export default router({
    register: procedure.input(registerFormSchema).query(({ input, ctx }) => {

        console.log("register", input);
        return input
    }),
    login: procedure.input(SessionsVerif).query(({ input, ctx }) => {
        console.log("login->> wot", input.email);
        const data = {
            userId: "2",
            username: input.email,
            loggedIn: true,
            user: true,

        }
        setToken(data)
        return input
    }),
    cookie: procedure.input(userSessionSchema).query(({ input, ctx }) => {
        setToken(input)
        return input
    })


});

