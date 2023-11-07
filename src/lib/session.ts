import { createCookieSessionStorage } from "solid-start";
import { z } from "zod";
import { redirect } from "solid-start";
const storage = createCookieSessionStorage({
    cookie: {
        name: "session",
        secure: process.env.NODE_ENV === "production",
        secrets: ["this is a secret"],
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 30, // 30 days
        httpOnly: true
    }
});

// create user session and redirect to a given path
//
//zod schema for user session
export const userSessionSchema = z.object({
    userId: z.string(),
    username: z.string(),
    loggedIn: z.boolean(),
    user: z.boolean()
});

// user session type
export type UserSession = z.infer<typeof userSessionSchema>;
export async function getUser(request: Request) {
    const auth = request?.headers.get("Authorization") ?? "";
    if (auth !== "") {
        const user = JSON.parse(auth);
        const output = userSessionSchema.safeParse(user);
        if (output.success) {
            return output.data;
        }
        else {
            return null;
        }
    }

    const cookie = request?.headers.get("Cookie") ?? "";
    const session = storage.getSession(cookie);
    console.log("getUser", cookie, session);
    const sessionData = await storage.getSession(cookie);
    if (!sessionData) {
        return null;
    }


    return sessionData.data
}




export async function createUserSession(user: UserSession, redirectTo: string) {
    const session = await storage.getSession();
    console.log("createUserSession", user.userId, redirectTo);



    session.set("userId", user.userId);
    session.set("username", user.username);
    session.set("loggedIn", true);
    session.set("user", true);
    return redirect(redirectTo, {
        headers: {
            "Set-Cookie": await storage.commitSession(session)
        }
    });
}



