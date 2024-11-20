import { integer, PgTable, pgTable, serial, text, timestamp ,varchar} from 'drizzle-orm/pg-core';
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
    updatedat:timestamp('upadated_at').notNull().default(sql`CURRENT_TIMESTAMP`),
    createdat:timestamp('created_at').notNull().default(sql`CURRENT_TIMESTAMP`)
});





export const products = pgTable('products',{
    id:serial('id').primaryKey(),
    name:varchar('name',{length:100}).notNull(),
    image:text('imageurl'),
    description:text('description'),
    price: integer('price').notNull(),
    updatedat:timestamp('upadated_at').notNull().default(sql`CURRENT_TIMESTAMP`),
    createdat:timestamp('created_at').notNull().default(sql`CURRENT_TIMESTAMP`)


});



