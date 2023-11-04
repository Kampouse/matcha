import { z } from "zod";
import { procedure, router } from "../utils";
import { registerFormSchema } from "~/utils/schemas";
import { createCookieSessionStorage } from "solid-start";
export default router({
    register: procedure.input(registerFormSchema).query(({ input, ctx }) => {
        console.log("register", input);
        return input
    }),

});

