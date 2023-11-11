import { createClient } from "@libsql/client";
import { connect, Client } from '@planetscale/database'
import z from 'zod'
const config = {
    host: process.env.DATABASE_HOST,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD
}

export const Clientdb = new Client(config).connection()