import { db } from "@/db";
import { inventoryTable, productsTable, warehousesTable } from "@/db/schema";
import { inventorySchema } from "@/validator/inventorySchema";
import { desc, eq } from "drizzle-orm";

export async function POST(request: Request) {
  //auth
  const data = await request.json();
  console.log(data);
  let validatedata;
  try {
    validatedata = await inventorySchema.parse(data);
  } catch (error) {
    console.log(error);
    return Response.json({ message: "invalid data", error }, { status: 400 });
  }

  try {
    const maindata = {
      sku: validatedata.sku,
      product_id: Number(validatedata.product_id),
      warehouse_id: Number(validatedata.warehouse_id),
    };
    await db.insert(inventoryTable).values(maindata);
    return Response.json({ message: "Inventory added" }, { status: 201 });
  } catch (error) {
    console.log(error);
    return Response.json({ message: "db call failed", error }, { status: 500 });
  }
}

export async function GET() {
  try {
    const inventoryList = await db
      .select({
        id: inventoryTable.id,
        sku: inventoryTable.sku,
        product_id: productsTable.id,
        product: productsTable.name,
        warehouse: warehousesTable.name,
      })
      .from(inventoryTable)
      .leftJoin(productsTable, eq(productsTable.id, inventoryTable.product_id))
      .leftJoin(
        warehousesTable,
        eq(warehousesTable.id, inventoryTable.warehouse_id)
      )
      .orderBy(desc(inventoryTable.id));

    return Response.json(inventoryList, { status: 201 });
  } catch (error) {
    console.log(error);
    return Response.json(
      { message: "cannot fetch inventory  list" },
      { status: 500 }
    );
  }
}
