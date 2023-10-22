import { router } from "../utils";
import example from "./example";
import database from "./database";
import register from "./register";
export const appRouter = router({
  example,
  database,
  register
});

export type IAppRouter = typeof appRouter;
