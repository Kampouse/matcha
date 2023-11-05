import { createCookieSessionStorage } from "solid-start";
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

export async function getUser(request: Request) {
    const cookie = request.headers.get("Cookie") ?? "";
    const session = storage.getSession(cookie);
    return session
}

// create user session and redirect to a given path
//
export type UserSession = {
    userId: string,
    username: string,
    loggedIn: boolean,
    user: boolean
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



