import { db } from "@/app/db";
import { delivery_personsTable } from "@/app/db/schema";
import { deliverypersonSchema } from "@/validator/deliverypersonSchema";

export async function POST(request:Request) {
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