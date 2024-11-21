import { index, integer, PgTable, pgTable, serial, text, timestamp ,varchar} from 'drizzle-orm/pg-core';
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





export const productsTable = pgTable('products',{
    id:serial('id').primaryKey(),
    name:varchar('name',{length:100}).notNull(),
    image:text('imageurl'),
    description:text('description'),
    price: integer('price').notNull(),
    updatedat:timestamp('upadated_at').notNull().default(sql`CURRENT_TIMESTAMP`),
    createdat:timestamp('created_at').notNull().default(sql`CURRENT_TIMESTAMP`)


});


export const warehousesTable = pgTable('warehouses',{
    id:serial('id').primaryKey(),
    name:varchar('name',{length:100}).notNull(),
    pincode:varchar('pincode',{length:6}).notNull(),
    updatedat:timestamp('upadated_at').notNull().default(sql`CURRENT_TIMESTAMP`),
    createdat:timestamp('created_at').notNull().default(sql`CURRENT_TIMESTAMP`)


},
(table)=>{
    return{
        pincodeIdx: index('pincodeIdx').on(table.pincode)
    }
});


export const OrdersTable=pgTable('orders',{
    id:serial('id').primaryKey()

})
export const delivery_personsTable=pgTable('delivery_persons',{
    id:serial('id').primaryKey(),
    name:varchar('name',{length:100}).notNull(),
    phone:varchar('phone',{length:13}).notNull(),
    warehouse_id:integer("warehouse_id").references(()=>warehousesTable.id,{onUpdate:'cascade'}),
    order_id:integer('order_id').references(()=>OrdersTable.id,{onUpdate:'set null'}),
    updatedat:timestamp('upadated_at').notNull().default(sql`CURRENT_TIMESTAMP`),
    createdat:timestamp('created_at').notNull().default(sql`CURRENT_TIMESTAMP`)
})



