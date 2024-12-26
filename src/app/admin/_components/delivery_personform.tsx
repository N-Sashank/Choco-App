import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { deliverypersonSchema } from "@/validator/deliverypersonSchema";
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

export type FormValues = z.input<typeof deliverypersonSchema>;

const DeliveryPersonForm = () => {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof deliverypersonSchema>>({
    resolver: zodResolver(deliverypersonSchema),
    defaultValues: {
      name: "",
      phone: "+91",
      warehouse_id: "",
    },
  });

  const handleSubmit = (values: FormValues) => {
    // console.log(typeof(Number(values.warehouse_id)),values.warehouse_id)

    try {
      axios
        .post("http://localhost:3000/api/delivery_persons", {
          name: values.name.trim(),
          phone: values.phone.trim(),
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
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input required autoComplete="off" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex gap-1 items-center justify-start">
                Phone
              </FormLabel>
              <FormControl>
                <Input required autoComplete="off" {...field} />
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
              <FormLabel className="flex gap-1 items-center justify-start">
                Warehouse_id
              </FormLabel>
              <FormControl>
                <Input required type="number" autoComplete="off" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

          <Button  className="rounded " type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default DeliveryPersonForm;
