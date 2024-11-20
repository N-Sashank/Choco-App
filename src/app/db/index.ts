import postgres from 'postgres'
import {config} from 'dotenv'
import {drizzle} from 'drizzle-orm/postgres-js'


config({path:".env"});

export const client=postgres(process.env.DATABASE_URL!);
export const db=drizzle({client});