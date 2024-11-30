import { z } from "zod";

export const warehouseSchema = z.object({
  name: z.string({ message: "name should be a string" }).length(12),
  pincode: z.string({ message: "pincode should be 6 digits" }).length(6),
});
