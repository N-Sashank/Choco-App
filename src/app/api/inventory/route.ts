import { db } from "@/app/db";
import { inventoryTable } from "@/app/db/schema";
import { inventorySchema } from "@/validator/inventorySchema";

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