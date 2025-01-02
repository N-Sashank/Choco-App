"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import axios from "axios";

const Products_section = () => {
  const [products, setproducts] = useState([
    {
      id: " ",
      name: " ",
      updatedat: " ",
      createdat: " ",
      image: "/",
      description: null,
      price: " ",
    },
  ]);

  async function getData() {
    const data = await axios.get("http://localhost:3000/api/products");

    setproducts(data.data);
  }
  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="  outline-double outline-yellow-600 w-4/6 mx-auto p-5">
        <h1 className=" text-xl  text-center mt-5 font-bold text-yellow-900">
          Products
        </h1>
        <Separator className=" w-5/6 mx-auto h-0.5 " />

        <div className="grid grid-cols-4 gap-7 drop-shadow-lg overflow-hidden   p-10">
          {products.map((product) => {
            return (
              <div
                key={product.id}
                className="w-auto h-auto   transition outline-dashed hover:scale-105 hover:bg-yellow-100 outline-yellow-500  rounded p-4"
              >
                <div className="">
                  <Image
                    className=" w-auto h-auto text-transparent rounded-xl drop-shadow-2xl"
                    src={`/assets/${product.image}`}
                    alt={product.name}
                    height={150}
                    width={150}
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div className="relative ">
                  <h3 className="mt-3 font-bold  ">
                    {product.name}
                  </h3>
                  <p className="font-sm font-semibold  text-yellow-500 ml-1">
                  ₹{product.price}
                  </p>
                  <Link href={`/products/${product.id}`}>
                    <Button className="transition rounded-xl w-full my-1 hover:bg-yellow-700 active:bg-yellow-600 font-semibold">
                      Buy Now
                    </Button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Products_section;
