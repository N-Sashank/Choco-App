import { db } from "@/db";
import { inventoryTable, productsTable, warehousesTable } from "@/db/schema";
import { inventorySchema } from "@/validator/inventorySchema";
import { desc, eq } from "drizzle-orm";

export async function POST(request:Request){
    //auth
    const data=await request.json()
    let validatedata;
    try {
        validatedata=await inventorySchema.parse(data)

    } catch (error) {
        return Response.json({message:'invalid data'},{status:400})

    }

    try {
        await db.insert(inventoryTable).values(validatedata)
        return Response.json({message:"inventory added"},{status:201})
    } catch (error) {
        return Response.json({message:"db call failed",error},{status:500})

    }




}

export async function GET(){
    try {
        const inventoryList= await db.select(
            {
                id:inventoryTable.id,
                sku:inventoryTable.sku,
                product:productsTable.name,
                warehouse:warehousesTable.name

            }
        ).from(inventoryTable)
        .leftJoin(productsTable,(eq(productsTable.id,inventoryTable.product_id)))
        .leftJoin(warehousesTable,eq(warehousesTable.id,inventoryTable.warehouse_id))
        .orderBy(desc(inventoryTable.id))
        
        return Response.json(inventoryList,{status:201})
    } catch (error) {
        return Response.json({message:"cannot fetch inventory  list"},{status:500})
        
    }
}
