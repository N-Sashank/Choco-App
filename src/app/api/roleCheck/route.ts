import { db } from "@/db";
import {
  inventoryTable,
  productsTable,
  usersTable,
  warehousesTable,
} from "@/db/schema";
import { inventorySchema } from "@/validator/inventorySchema";
import { desc, eq } from "drizzle-orm";

export async function POST(request: Request) {
  //auth
  const data = await request.json();
  let isAdmin;
  try {
    const status = await db
      .select({ role: usersTable.role })
      .from(usersTable)
      .where(eq(usersTable.email, data.email));
    isAdmin = String(status[0].role);
  } catch (error) {
    console.log(error);
  }

  return Response.json({ isAdmin });
}
