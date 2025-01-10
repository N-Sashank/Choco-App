"use client";
import { Button } from "@/components/ui/button";
import axios from "axios";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import useSWR from "swr";

const Header = () => {
  let isAdmin: string = "";

  const getData = async () => {
    const result = await axios.get("http://localhost:3000/api/user_role_check");

    return result;
  };
  const { data, error, isLoading } = useSWR(
    "http://localhost:3000/api/user_role_check",
    getData
  );
  isAdmin = data?.data.token.role;

  const { data: session } = useSession();
  const pathname = usePathname();
  return (
    <>
      <div className="">
        <div className=" w-full h-7 bg-yellow-950 flex justify-center items-center">
          <p className="text-sm font-extralight text-white ">
            Free cupcake for every order
          </p>
        </div>
        <div className="flex items-center justify-between gap-3">
          {isAdmin === "admin" ? (
            <Button className="rounded-full hover:bg-yellow-600 active:bg-yellow-700 hover:outline outline-yellow-800 transition hover:scale-100 mx-auto text-center m-2">
              <Link href={"http://localhost:3000/admin"} className="text-black">
                Admin Dashboard
              </Link>
            </Button>
          ) : (
            <div></div>
          )}

          <ul className="flex justify-center gap-6 p-4 mr-20 bg-white">
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
          {session ? (
            <div className=" transition hover:scale-100">
              <Link href={`/api/auth/signout?callbackUrl=${pathname}`}>
                <Button className=" rounded-full border-2 transition hover:outline hover:bg-yellow-600 mr-4 w-50 ">
                  SignOut
                </Button>
              </Link>
            </div>
          ) : (
            <div className=" transition hover:scale-100">
              <Link href={`/api/auth/signin?callbackUrl=${pathname}`}>
                <Button className=" rounded-full border-2 transition hover:outline  hover:bg-yellow-600 mr-4 w-50 ">
                  SignIn
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
