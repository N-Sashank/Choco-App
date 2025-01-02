import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { warehouseSchema } from "@/validator/warehouseSchema";
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
import { DialogTrigger } from "@radix-ui/react-dialog";

export type FormValues = z.input<typeof warehouseSchema>;

const WarehouseForm = () => {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof warehouseSchema>>({
    resolver: zodResolver(warehouseSchema),
    defaultValues: {
      name: "",
      pincode: "",
    },
  });

  const handleSubmit = (values: FormValues) => {
    try {
      axios
        .post("http://localhost:3000/api/warehouses", {
          name: values.name,
          pincode: values.pincode,
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
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white ">Name</FormLabel>
              <FormControl>
                <Input required autoComplete="off" placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="pincode"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white ">Pincode</FormLabel>
              <FormControl>
                <Input
                  required
                  type="number"
                  autoComplete="off"
                  placeholder=""
                  {...field}
                />
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

export default WarehouseForm;
