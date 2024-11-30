

import { z } from "zod";
const isServer=typeof window === "undefined"
export const clientProductSchema = z.object({
  name: z.string({ message: "name should be a string" }).min(4),
  image: z.instanceof(isServer?File:FileList, { message: "image should be a file" }),
  description: z.string({ message: "description should be a string" }).min(4),
  price: z.number({ message: "price should be a valid number" }).positive().min(2),
});
  