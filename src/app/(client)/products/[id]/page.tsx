"use client";
import { useParams } from "next/navigation";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";
import { orderSchema } from "@/validator/orderSchema";
import Header from "../../client-components/header";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const Single_productPage = () => {
  const params = useParams();
  const id = params.id;

  async function getData() {
    const data = await axios.get(`http://localhost:3000/api/products/${id}`);

    setproduct(data.data);
  }
  useEffect(() => {
    getData();
  }, []);

  const [product, setproduct] = useState({
    id: 1,
    name: "",
    image: "",
    description: "",
    price: 0,
  });

  const form = useForm<z.infer<typeof orderSchema>>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      pincode: "",
      quantity: 2,
      productId: Number(id),
      address: "",
    },
  });
  type Formvalues = z.infer<typeof orderSchema>;
  const onSubmit = (values: Formvalues) => {
    console.log("submit");
    console.log(values);
  };

  return (
    <>
      <Header />

      <div className="flex mx-auto  rounded-xl gap-8 justify-center items-center w-5/6 h-auto p-10 bg-stone-100">
        <div>
          <Image
            className="rounded-xl text-transparent drop-shadow-2xl"
            src={`/assets/${product.image}`}
            style={{ objectFit: "cover" }}
            alt=""
            height={400}
            width={400}
          />
        </div>
        <div>
          <h3 className="text-yellow-700">BRAND NAME</h3>
          <h1 className="font-bold text-yellow-900 text-2xl">{product.name}</h1>
          <p className="ml-1 text-yellow-700  text-sm ">4.5 rating</p>
          <h4 className="w-96 text-secondary-foreground text-black my-3">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugiat,
            labore molestias officiis laborum est a! Consectetur veniam vero
            obcaecati enim iure ipsa nostrum tempora doloremque cupiditate,
            adipisci, repellendus, facilis iusto.
          </h4>
          <div className="">
            <Form {...form}>
              <form className="" onSubmit={form.handleSubmit(onSubmit)}>
                <div className="flex gap-4">
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => {
                      return (
                        <FormItem className="w-3/6 mb-1">
                          <FormLabel>Address</FormLabel>
                          <FormControl>
                            <Textarea
                              className="border-brown-200 bg-white placeholder:text-gray-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brown-400 focus-visible:ring-offset-0"
                              placeholder="e.g. Open street, 55"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      );
                    }}
                  />

                  <FormField
                    control={form.control}
                    name="pincode"
                    render={({ field }) => {
                      return (
                        <FormItem className="w-3/6">
                          <FormLabel>Pincode</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              className="h-9 border-brown-200 bg-white placeholder:text-gray-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brown-400 focus-visible:ring-offset-0"
                              placeholder="e.g. 567987"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      );
                    }}
                  />
                  <FormField
                    control={form.control}
                    name="quantity"
                    render={({ field }) => {
                      return (
                        <FormItem className="w-3/6">
                          <FormLabel>Qty</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              className="h-9 border-brown-200 bg-white placeholder:text-gray-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brown-400 focus-visible:ring-offset-0"
                              placeholder="e.g. 1"
                              {...field}
                              onChange={(e) => {
                                const value = parseFloat(e.target.value);
                                field.onChange(value);
                              }}
                            />
                          </FormControl>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      );
                    }}
                  />
                </div>
                <Separator className=" h-0.5"></Separator>
                <div className="flex items-center justify-between">
                  <h1 className="font-semibold  m-3 text-xl">
                    ${product.price}
                  </h1>
                  <Button
                    className="rounded-xl font-semibold my-1 hover:bg-yellow-600 active:bg-yellow-500  "
                    type="submit"
                  >
                    Buy Now
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Single_productPage;
