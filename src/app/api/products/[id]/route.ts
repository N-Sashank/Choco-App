import { db } from "@/app/db"
import { products } from "@/app/db/schema"
import { eq } from "drizzle-orm";

export async function GET(request:Request,{params}:{params:{id:string}}){
    const id =params.id
    try{
     const product=await db.select().from(products).where(eq(products.id,Number(id))).limit(1);

        if(!product.length){
            return Response.json({message:" product 1 not found"},{status:500})
        }
        else{
            return  Response.json(product[0])
        }

    }
    catch (error){
        return Response.json({message:"product not found"})
    }
        
};

