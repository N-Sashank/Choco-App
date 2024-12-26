import { z } from "zod";

export const orderSchema = z.object({
  productId:z.number({message:"productId should be a number"}),
  pincode:z.string({message:"pincode should be a string"}).length(6,"pincode should contain 6 digits"),
  quantity:z.number({message:"quantity should be a number "}).positive('quantity should be a valid number'),
  address:z.string({message:"address should be a string "}).min(5,'address should contain minimun 5 characters')
});
 