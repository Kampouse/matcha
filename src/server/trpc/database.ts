import { createClient } from "@libsql/client";
import { connect, Client } from '@planetscale/database'
import z from 'zod'
const config = {
    host: process.env.DATABASE_HOST,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD
}
const configSchema = z.object({
    host: z.string(),
    username: z.string(),
    password: z.string(),
})
const parsedConfig = configSchema.parse(config)
export const Clientdb = new Client(parsedConfig).connection()