"use client";
import { Button } from "@/components/ui/button";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Header = () => {
  const [isAdmin, setisAdmin] = useState("");

  const adminHandler = async () => {
    const result = await axios.get("http://localhost:3000/api/user_role_check");
    // console.log(result)
    setisAdmin(result?.data?.token?.role);
    return;
  };
  useEffect(() => {
    adminHandler();
  }, []);

  return (
    <>
      <div className="">
        <div className=" w-full h-7 bg-yellow-950 flex justify-center items-center">
          <p className="text-sm font-extralight text-white ">
            Free cupcake for every order
          </p>
        </div>
        <div className="">
          {isAdmin === "admin" ? (
            <Button className="rounded-full hover:bg-yellow-600 active:bg-yellow-800  absolute mx-auto text-center m-2">
              <Link href={"http://localhost:3000/admin"} className="text-black">
                Admin Dashboard
              </Link>
            </Button>
          ) : (
            <div></div>
          )}

          <ul className="flex justify-center gap-6 p-4 bg-white">
            <li className="text-yellow-700 hover:text-yellow-900 hover:underline  transition ">
              <Link href={"http://localhost:3000/"}>Home</Link>
            </li>
            <li className="text-yellow-700 hover:text-yellow-900 hover:underline  transition  ">
              <Link href={"#products-section"}>Best Selling </Link>
            </li>
            <li className="text-yellow-700 hover:text-yellow-900 hover:underline transition  ">
              <Link href={"#products-section"}>Offers</Link>
            </li>
            <li className="text-yellow-700 hover:text-yellow-900 hover:underline  transition ">
              <Link href={"#products-section"}>Orders </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Header;
