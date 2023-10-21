import { router } from "../utils";
import example from "./example";
import database from "./database";

export const appRouter = router({
  example,
  database,
});

export type IAppRouter = typeof appRouter;
