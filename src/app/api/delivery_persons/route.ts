import { db } from "@/app/db";
import { delivery_personsTable, warehousesTable } from "@/app/db/schema";
import { deliverypersonSchema } from "@/validator/deliverypersonSchema";
import { desc, eq } from "drizzle-orm";

export async function POST(request:Request) {
    //auth
    const data=await request.json()

    let validatedata; 
    try {
        validatedata=await deliverypersonSchema.parse(data)
      
    } catch (error) {
        return Response.json({message:"invalid data",error},{status:400});
    }

    try {
        await db.insert(delivery_personsTable).values(validatedata)
        return Response.json({message:"delivery_person added"},{status:201});

    } catch (error) {
        return Response.json({message:"data not inserted to db",error},{status:500});
    }

}

export async function GET(){
    try {
        const list=await db.select({
            id:delivery_personsTable.id,
            name:delivery_personsTable.name,
            phone:delivery_personsTable.phone,
            warehouse:warehousesTable.name,
        }).from(delivery_personsTable).leftJoin(warehousesTable,eq(warehousesTable.id,delivery_personsTable.warehouse_id)).orderBy(desc(delivery_personsTable.id));
        return Response.json(list,{status:201})
    } catch (error) {
        return Response.json({message:"db call failed"},{status:500})
    }
}