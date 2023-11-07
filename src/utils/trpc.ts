import { QueryClient } from "@tanstack/solid-query";
import type { IAppRouter } from "~/server/trpc/router/_app";
import { createTRPCSolidStart } from "@solid-mediakit/trpc";
import { httpBatchLink } from "@trpc/client";
import type { UserSession } from "~/lib/session";

let token: string;
const getBaseUrl = () => {
  if (typeof window !== "undefined") return "";
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  // replace example.com with your actual production url
  if (process.env.NODE_ENV === "production") return "https://example.com";
  return `http://localhost:${process.env.PORT ?? 5454}`;
};

export function setToken(newToken: UserSession) {
  /**
   * You can also save the token to cookies, and initialize from
   * cookies above.
   */


  //document.cookie = `token=${newToken}; path=/;`;
  token = JSON.stringify(newToken);
}
export function getToken() { return token; }



export const trpc = createTRPCSolidStart<IAppRouter>({
  config() {
    return {
      links: [
        httpBatchLink({
          url: `${getBaseUrl()}/api/trpc`,
          headers() {
            return {
              // save to cookie

              Authorization: token,
            };
          }




        }),

      ],

    };
  },
});

export const queryClient = new QueryClient();
