"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
const Newsletter = () => {
  const [email, setemail] = useState("");
  const handleclick = () => {
    if (email) {
      toast({
        title: email,
        description: "Thank you for subscribing to Newsletter",
      });
    } else {
      toast({
        description: "Please enter email address",
      });
    }
  };
  return (
    <>
      <div className=" hidden md:flex justify-center w-auto my-16">
        <div className="flex flex-col w-1/2 h-80 items-center justify-center gap-3 rounded-xl bg-cardimg bg-cover bg-no-repeat bg-bottom  ">
          <h1 className=" font-extrabold  text-slate-100 text-3xl text-center">
            Stay Updated with Newsletter
          </h1>
          <section className="w-auto overflow-hidden   text-gray-200 ">
            <h3 className="text-center font-medium">
              Get the latest news,exclusive offers,and delicious updates
              deliverd right to your inbox
            </h3>
            <h3 className="text-center">
              {" "}
              with our choclate and cake newsletter.
            </h3>
          </section>
          <input
            onChange={(e) => setemail(e.target.value)}
            required
            type="email"
            placeholder="Enter email"
            className="bg-transparent outline-dashed  outline-red-50 text-white   p-2 w-80"
          />
          <Button
            onClick={handleclick}
            className="active:bg-yellow-700 transition bg-yellow-950 text-white border-2 border-red-100 p-2 rounded-2xl m-1 hover:scale-105 hover:bg-yellow-800"
          >
            Subscribe
          </Button>
        </div>
      </div>
    </>
  );
};

export default Newsletter;
