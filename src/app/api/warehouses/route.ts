import { db } from "@/app/db";
import { warehousesTable } from "@/app/db/schema";
import { warehouseSchema } from "@/validator/warehouseSchema";


export async function POST(request:Request) {
    //auth

    const data= await request.json();
    let validateData;
    try {
        validateData=await warehouseSchema.parse(data)
    } catch (error) {
        return Response.json({message:error},{status:400})
    }

    try {
        await db.insert(warehousesTable).values({...validateData})
        return Response.json({message:"warehouse added"})
    } catch (error) {
        return Response.json({message:"insert to db failed" ,error},{status:500})
    }

}


export async function GET(response:Response){
    try {
        const warehousesList=await db.select().from(warehousesTable)
        return Response.json(warehousesList);
    } catch (error) {
        return Response.json({message :"cannot get warehouses list",error},{status:500});
    }

}