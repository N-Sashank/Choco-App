import { authOptions } from "@/auth/authOptions";
import { db } from "@/db";
import {
  delivery_personsTable,
  inventoryTable,
  OrdersTable,
  productsTable,
  usersTable,
  warehousesTable,
} from "@/db/schema";
import { orderSchema } from "@/validator/orderSchema";
import { getServerSession } from "next-auth";
import { eq, isNull, and, desc, inArray } from "drizzle-orm";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  console.log("session", session);

  if (!session) {
    return Response.json({ message: "Not allowed" }, { status: 401 });
  }

  const data = await request.json();
  let validatedata;
  try {
    validatedata = await orderSchema.parse(data);
  } catch (error) {
    // console.log(error);
    return Response.json({ message: "invalid data", error }, { status: 400 });
  }

  const warehouseResult = await db
    .select({ id: warehousesTable.id })
    .from(warehousesTable)
    .where(eq(warehousesTable.pincode, validatedata.pincode));

  if (!warehouseResult.length) {
    return Response.json({ message: "Warehouse not found " }, { status: 400 });
  }

  const foundProducts = await db
    .select()
    .from(productsTable)
    .where(eq(productsTable.id, validatedata.productId))
    .limit(1);
  if (!foundProducts.length) {
    return Response.json({ message: "Product not found" }, { status: 400 });
  }

  let ErrorString: string = "";
  let finalOrder: any;
  let orderstatus = false;
  try {
    finalOrder = await db.transaction(async (tx) => {
      const Order = await tx
        .insert(OrdersTable)
        .values({
          ...validatedata,
          // @ts-ignore
          userId: Number(session.token.id),
          price: foundProducts[0].price * validatedata.quantity,
          status: "received",
        })
        .returning({ id: OrdersTable.id, price: OrdersTable.price });

      const availableStock = await tx
        .select()
        .from(inventoryTable)
        .where(
          and(
            eq(inventoryTable.warehouse_id, warehouseResult[0].id),
            eq(inventoryTable.product_id, foundProducts[0].id),
            isNull(inventoryTable.order_id)
          )
        )
        .limit(validatedata.quantity)
        .for("update", { skipLocked: true });

      if (availableStock.length < validatedata.quantity) {
        ErrorString = `Stock is low only ${availableStock.length} products are available`;
        tx.rollback();
        return;
      }

      const availableAgents = await tx
        .select()
        .from(delivery_personsTable)
        .where(
          and(
            eq(delivery_personsTable.warehouse_id, warehouseResult[0].id),
            isNull(delivery_personsTable.order_id)
          )
        )
        .limit(1)
        .for("update", { skipLocked: true });

      if (!availableAgents.length) {
        ErrorString = "No delivery Agent available ";
        tx.rollback();
        return;
      }

      //update
      try {
        await tx
          .update(inventoryTable)
          .set({ order_id: Order[0].id })
          .where(
            inArray(
              inventoryTable.id,
              availableStock.map((stock) => stock.id)
            )
          );

        await tx
          .update(delivery_personsTable)
          .set({ order_id: Order[0].id })
          .where(eq(delivery_personsTable.id, availableAgents[0].id));

        await tx
          .update(OrdersTable)
          .set({ status: "reserved" })
          .where(eq(OrdersTable.id, Order[0].id));
        orderstatus = true;
        return Order[0];
      } catch (error) {
        ErrorString = "update error";
      }
    });
  } catch (error) {
    console.log(error);
    return Response.json(
      {
        message: ErrorString,
        "transaction error ": error,
      },
      { status: 500 }
    );
  }
  if (orderstatus) {
    return Response.json({ message: "Order Created" });
  }
}

export async function GET() {
  const allOrders = await db
    .select({
      id: OrdersTable.id,
      product: productsTable.name,
      productId: productsTable.id,
      userId: usersTable.id,
      user: usersTable.fname,
      type: OrdersTable.type,
      price: OrdersTable.price,
      image: productsTable.image,
      status: OrdersTable.status,
      address: OrdersTable.address,
      quantity: OrdersTable.quantity,
      createAt: OrdersTable.createdAt,
    })
    .from(OrdersTable)
    .leftJoin(productsTable, eq(OrdersTable.productId, productsTable.id))
    .leftJoin(usersTable, eq(OrdersTable.userId, usersTable.id))

    .orderBy(desc(OrdersTable.id));
  return Response.json(allOrders);
}
