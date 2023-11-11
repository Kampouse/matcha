import { appRouter } from './router/_app';
import type { inferAsyncReturnType } from "@trpc/server";
import { Clientdb as db } from './database';
import type { createSolidAPIHandlerContext } from "solid-start-trpc";
import { set } from "zod";
import { json, useServerContext } from "solid-start";
import { userSessionSchema } from '~/lib/session';
import { as } from 'vitest/dist/reporters-5f784f42';
import { getCookies } from 'undici';
import { getToken } from '~/utils/trpc';


export async function getUserTPC(request: Request) {
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
  return null;
}


export const createContextInner = async (
  opts: createSolidAPIHandlerContext) => {
  const { req, res } = opts;
  const user = async () => {
    return await getUserTPC(req);

  }
  const getUserServerSide = () => {

    const serverSide = getToken();
    if (serverSide === "" || serverSide === undefined) {
      return null;
    }
    console.log("getUserServerSide ->", serverSide);
    const data = JSON.parse(serverSide);
    const output = userSessionSchema.safeParse(data);
    return output.success ? output.data : null;
  }


  return {
    req, res, db, getUserServerSide
  };
};

export const createContext = async (opts: createSolidAPIHandlerContext) => {
  return await createContextInner(opts);
};

export type IContext = inferAsyncReturnType<typeof createContext>;

