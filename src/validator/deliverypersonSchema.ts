import {z } from 'zod'

export const deliverypersonSchema= z.object({
   
    name:z.string({message:"name should be a string"}),
    phone:z.string({message:"number should be valid string"}).length(13,'number should contain 13 digits including country code'),
    warehouse_id:z.number({message:"warehouse_id should be a number"}),
     
}) 