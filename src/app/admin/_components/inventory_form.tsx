import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { inventorySchema } from "@/validator/inventorySchema";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";

export type FormValues = z.input<typeof inventorySchema>;

const InventoryForm = () => {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof inventorySchema>>({
    resolver: zodResolver(inventorySchema),
    defaultValues: {
      sku: "",
      product_id: "",
      warehouse_id: "",
    },
  });

  const handleSubmit = (values: FormValues) => {
    try {
      axios
        .post("http://localhost:3000/api/inventory", {
          sku: values.sku,
          product_id: values.product_id,
          warehouse_id: values.warehouse_id,
        })
        .then(function (response) {
          const date = Date();
          toast({
            title: response.data.message,
            description: String(date),
          });
          console.log(response);
        });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Something went wrong try again",
      });
      console.error();
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className=" text-black space-y-8"
      >
        <FormField
          control={form.control}
          name="sku"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white ">sku</FormLabel>
              <FormControl>
                <Input required autoComplete="off" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="product_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex text-white gap-1 items-center justify-start">
                Product_id
              </FormLabel>
              <FormControl>
                <Input type="number" required autoComplete="off" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="warehouse_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex text-white gap-1 items-center justify-start">
                Warehouse_id
              </FormLabel>
              <FormControl>
                <Input type="number" required autoComplete="off" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className="rounded" type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default InventoryForm;
