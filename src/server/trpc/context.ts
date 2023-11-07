import { appRouter } from './router/_app';
import type { inferAsyncReturnType } from "@trpc/server";
import { Turso } from './database';
import type { createSolidAPIHandlerContext } from "solid-start-trpc";
import { getUser } from '~/lib/session';
import { set } from "zod";
import { useServerContext } from "solid-start";
export const createContextInner = async (
  opts: createSolidAPIHandlerContext) => {





  const { req, res } = opts;
  return {
    req, res, Turso
  };
};

export const createContext = async (opts: createSolidAPIHandlerContext) => {
  return await createContextInner(opts);
};

export type IContext = inferAsyncReturnType<typeof createContext>;

