import { createClient } from "@libsql/client";
export const Turso = createClient({
    url: import.meta.env.VITE_DB_URL,
    authToken: import.meta.env?.VITE_TURSO_TOKEN
});

