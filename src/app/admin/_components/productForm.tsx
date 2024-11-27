import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { clientProductSchema } from "@/validator/clientProductSchema";
import { number, z } from "zod";
import {
  Form,
  FormControl,
  //   FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import axios from "axios";

export type FormValues = z.input<typeof clientProductSchema>;

const productForm = () => {
  const form = useForm<z.infer<typeof clientProductSchema>>({
    resolver: zodResolver(clientProductSchema),
    defaultValues: {
      name: " ",
      description: " ",
      price: 0,
    },
  });

  const fileref = form.register("image");

  const handleSubmit = (values: FormValues) => {
    try {
      axios.postForm("http://localhost:3000/api/products", {
        name: values.name,
        description: values.description,
        image: (values.image as FileList)[0],
        price: values.price,
      }).then(function (response) {
        console.log(response)
      });
    } catch (error) {
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
                <Input autoComplete="off" placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea autoComplete="off" placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  autoComplete="off"
                  placeholder=""
                  {...field}
                  onChange={(e) => {
                    const value = parseFloat(e.target.value);

                    field.onChange(value);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Image</FormLabel>
              <FormControl>
                <Input autoComplete="off" type="file" {...fileref} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default productForm;