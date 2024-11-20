import { integer, pgTable, serial, text, timestamp ,varchar} from 'drizzle-orm/pg-core';
import {sql} from 'drizzle-orm'


export const userTable= pgTable('users',{
    id:serial('user_id').primaryKey(),
    fname:varchar('fname',{length:100}).notNull(),
    lname:varchar('lname',{length:100}).notNull(),
    email:varchar('email',{length:100}).unique().notNull(),
    provider:varchar('provider',{length:20}).notNull(),
    external_id:varchar('external_id',{length:100}).notNull(),
    image:text('imageurl'),
    role:varchar('role',{length:12}).notNull().default("customer"),
    updatedat:timestamp('upadatedat').notNull().default(sql`CURRENT_TIMESTAMP`),
    createdat:timestamp('createdat').notNull().default(sql`CURRENT_TIMESTAMP`)
});


