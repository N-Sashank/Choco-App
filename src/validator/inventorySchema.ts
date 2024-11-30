import { z } from "zod";

export const inventorySchema = z.object({
  sku: z
    .string({ message: "sku should be a string" })
    .length(6, { message: "sku must contain 6 characters" }),
  product_id: z.string({ message: "product_id should be a number" }),
  warehouse_id: z.string({ message: "warehouse_id should be a number" }),
});
