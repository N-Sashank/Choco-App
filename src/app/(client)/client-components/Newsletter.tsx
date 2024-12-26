import React from "react";
import Image from "next/image";
import image1 from "./cardimg.jpg";
import { Button } from "@/components/ui/button";
const Newsletter= () => {
  return (
    <>
      <div className="flex justify-center items-center m-16">
        <div className="flex flex-col w-1/2 h-80 items-center justify-center gap-3 rounded-xl bg-cardimg bg-cover bg-no-repeat bg-bottom  ">
          <h1 className=" font-extrabold  text-slate-100 text-3xl items-center">
            Stay Updated with Newsletter
          </h1>
          <section className="w-5/6   text-gray-200 ">
            <h3 className="ml-2 font-medium">
              Get the latest news,exclusive offers,and delicious updates
              deliverd right to your
            </h3>
            <h3 className="ml-32">
              {" "}
              inbox with our choclate and cake newsletter.
            </h3>
          </section>
          <input
            type="email"
            placeholder="Enter email"
            className="bg-transparent outline-dashed  outline-red-50 text-white   p-2 w-80"
          />
          <Button className="active:bg-yellow-700 bg-yellow-950 text-white border-2 border-red-100 p-2 rounded-2xl m-1 hover:font-semibold hover:bg-yellow-800">
            Subscribe
          </Button>
        </div>
      </div>
    </>
  );
};

export default Newsletter;
