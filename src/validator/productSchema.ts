import {z } from 'zod'

export const productSchema= z.object({
   
    name:z.string({message:"name should be a string"}),
    image:z.instanceof(File,{message:"image should be a image"}),
    description:z.string({message:"description should be a string"}),
    price:z.number({message:'price should be a valid number'}),
     
})