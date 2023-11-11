import { z } from "zod";
import { setToken } from "~/utils/trpc";
import { procedure, router } from "../utils";
import { registerFormSchema, loginFormSchema, SessionsVerif } from "~/utils/schemas";
import { createCookieSessionStorage } from "solid-start";
import { userSessionSchema } from "~/lib/session";
import pbkdf from 'js-crypto-pbkdf'
import { caller } from "./_app";
export default router({


    password: procedure.input(z.string()).query(async ({ input, ctx }) => {
        const ray = Uint8Array.from([42, 0, 3, 4, 5, 3, 7, 42]);
        const key = await pbkdf.pbkdf2(input, ray, 1000, 32, 'SHA-256');
        const hex = Array.prototype.map.call(key, x => ('00' + x.toString(16)).slice(-2)).join('');
        return hex
    }),

    register: procedure.input(registerFormSchema).query(async ({ input, ctx }) => {

        // find a user with the same email
        // if the user exists return null

        function sanitizeString(str: string) {
            str = str.replace(/[^a-z0-9áéíóúñü \.,_-]/gim, "");
            return str.trim();
        }
        input.email = sanitizeString(input.email)
        input.username = sanitizeString(input.username)
        input.password = sanitizeString(input.password)
        input.re_password = sanitizeString(input.re_password)
        const isEmpty = await caller.database.raw(`select * from users where email =
             '${input.email}'`).then((result) => {
            if (result === null) {
                return Error("database error")
            }
            if (result.rows.length == 0) {
                return true
            }
            else {
                return false
            }
        })
        if (isEmpty) {
            const ray = Uint8Array.from([42, 0, 3, 4, 5, 3, 7, 42]);
            const key = await pbkdf.pbkdf2(input.password, ray, 1000, 32, 'SHA-256');
            // convert the array to a hex string
            const hex = Array.prototype.map.call(key, x => ('00' + x.toString(16)).slice(-2)).join('');
            console.log("hex", hex);
            await caller.database.raw(`insert into users (name,email,
                 username,password_hash) values ( 
                '${input.email}','${input.email}',  '${input.username}' 
                ,'${hex}')`);
            const data = {
                userId: "",
                username: input.email,
                loggedIn: true,
                user: true,
            };
            setToken(data);
            return data;
        }
        else {
            return null
        }
    }),
    login: procedure.input(SessionsVerif).query(async ({ input, ctx }) => {
        //#TODO replace that with a database call to check if the user exists
        const data = await caller.database.raw(`select password_hash,id from users where email = '${input.email}'`)
        if (data === null) {
            return Error("database error")
        }
        if (data.rows.length == 0) {
            return null
        }
        const userschema = z.object({ password_hash: z.string(), id: z.number() })
        const user = userschema.safeParse(data.rows[0])
        if (!user.success) {
            return null
        }
        if (user !== null) {
            const hash = user.data.password_hash
            const client_hash = await caller.session.password(input.password)
            if (hash === client_hash) {
                const data = {
                    userId: String(user.data.id),
                    username: input.email,
                    loggedIn: true,
                    user: true,
                };
                setToken(data);
                return data;
            }
            else {
                return null
            }

        }
        else {
            return null
        }


    }),
    cookie: procedure.input(userSessionSchema).query(({ input }) => {
        setToken(input)
        return input
    })


});

