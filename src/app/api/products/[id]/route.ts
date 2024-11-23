import { db } from "@/db"
import { productsTable } from "@/db/schema"
import { eq } from "drizzle-orm";

export async function GET(request:Request,{params}:{params:{id:string}}){
    const id =params.id
    try{
     const product=await db.select().from(productsTable).where(eq(productsTable.id,Number(id))).limit(1);

        if(!product.length){
            return Response.json({message:" product not found"},{status:201})
        }
        else{
            return  Response.json(product[0],{status:201})
        }

    }
    catch (error){
        return Response.json({message:"db call failed"},{status:500})
    }
        
};

