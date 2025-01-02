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
import { useToast } from "@/hooks/use-toast";
import { DialogTrigger } from "@radix-ui/react-dialog";

export type FormValues = z.input<typeof clientProductSchema>;

const productForm = () => {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof clientProductSchema>>({
    resolver: zodResolver(clientProductSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
    },
  });

  const fileref = form.register("image");

  const handleSubmit = (values: FormValues) => {
    try {
      axios
        .postForm("http://localhost:3000/api/products", {
          name: values.name.trim(),
          description: values.description.trim(),
          image: (values.image as FileList)[0],
          price: values.price,
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
    <Form {...form} >
      <form onSubmit={form.handleSubmit(handleSubmit)} className=" text-black space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Name</FormLabel>
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
              <FormLabel className="text-white">Description</FormLabel>
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
              <FormLabel className="text-white">Price</FormLabel>
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
              <FormLabel className="text-white">Product Image</FormLabel>
              <FormControl >
                <Input  required autoComplete="off" type="file" {...fileref} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
          <Button className="rounded" type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default productForm;
