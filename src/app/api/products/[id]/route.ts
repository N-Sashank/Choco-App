import { db } from "@/db";
import { productsTable } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const id: string = (await params).id;
  try {
    const product = await db
      .select()
      .from(productsTable)
      .where(eq(productsTable.id, Number(id)))
      .limit(1);

    if (!product.length) {
      return Response.json({ message: " product not found" }, { status: 201 });
    } else {
      return Response.json(product[0], { status: 201 });
    }
  } catch (e) {
    return Response.json({ message: "db call failed", e }, { status: 500 });
  }
}
