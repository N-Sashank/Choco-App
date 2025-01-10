"use client";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import axios from "axios";
import useSWR from "swr";

const Products_section = () => {
  interface ProductsInterface {
    id: string;
    name: string;

    image: string;
    description: string;
    price: string;
  }
  let products: ProductsInterface[] = [];

  async function getData() {
    const data = await axios.get("http://localhost:3000/api/products");
    return data;
  }
  const { data, isLoading } = useSWR(
    "http://localhost:3000/api/products",
    getData
  );
  products = data?.data;

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center ">
          <div className="mx-auto bg-white  shadow-lg w-96 rounded-2xl">
            <div className="h-48 p-3 overflow-hidden bg-gray-200 animate-pulse"></div>
            <div className="p-3 h-">
              <div className="grid grid-cols-3 gap-4 mt-2">
                <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-8 col-span-2 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-8 bg-gray-200 rounded  animate-pulse"></div>
                <div className="..."></div>
                <div className="col-span-2 ..."></div>
              </div>
            </div>
          </div>
          <div className="mx-auto bg-white  shadow-lg w-96 rounded-2xl">
            <div className="h-48 p-3 overflow-hidden bg-gray-200 animate-pulse"></div>
            <div className="p-3 h-">
              <div className="grid grid-cols-3 gap-4 mt-2">
                <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-8 col-span-2 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-8 bg-gray-200 rounded  animate-pulse"></div>
                <div className="..."></div>
                <div className="col-span-2 ..."></div>
              </div>
            </div>
          </div>
        </div>
      ) : (
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
                    <h3 className="mt-3 font-bold  ">{product.name}</h3>
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
      )}
    </>
  );
};

export default Products_section;
