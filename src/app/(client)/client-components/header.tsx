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
  isAdmin = data?.data?.token?.role;

  const { data: session } = useSession();
  const pathname = usePathname();
  return (
    <>
      <div className=" w-full">
        <div className=" w-full h-7 bg-yellow-800 md:bg-yellow-950 flex justify-center items-center">
          <p className="text-sm font-extralight text-white ">
            Free cupcake for every order
          </p>
        </div>
        <div className=" hidden md:flex items-center justify-between gap-3">
          {isAdmin === "admin" ? (
            <Button className="rounded-full  hover:bg-yellow-600 active:bg-yellow-700 hover:outline outline-yellow-800 transition hover:scale-100 mx-auto text-center  m-2">
              <Link
                prefetch
                href={"http://localhost:3000/admin"}
                className="size-auto w-32 h-10 flex items-center justify-center text-black "
              >
                Admin Dashboard
              </Link>
            </Button>
          ) : (
            <div className="w-36"></div>
          )}

          <ul className="flex justify-center gap-6 p-4 mr-20 bg-white">
            <li className="text-yellow-700 hover:text-yellow-900 hover:underline  transition ">
              <Link href={"http://localhost:3000/"}>Home</Link>
            </li>
            <li className="text-yellow-700 hover:text-yellow-900 hover:underline  transition  ">
              <Link href={"http://localhost:3000/#products-section"}>
                Best Selling{" "}
              </Link>
            </li>
            <li className="text-yellow-700 hover:text-yellow-900 hover:underline transition  ">
              <Link href={"http://localhost:3000/#products-section"}>
                Offers
              </Link>
            </li>
            <li className="text-yellow-700 hover:text-yellow-900 hover:underline  transition ">
              <Link href={"http://localhost:3000/#products-section"}>
                Orders{" "}
              </Link>
            </li>
          </ul>
          {session ? (
            <div className=" transition hover:scale-100">
              <Button className=" rounded-full border-2 transition hover:outline hover:bg-yellow-600 mr-4 ">
                <Link
                  className=" h-10 flex justify-center items-center w-20 "
                  href={`/api/auth/signout?callbackUrl=${pathname}`}
                >
                  SignOut
                </Link>
              </Button>
            </div>
          ) : (
            <div className=" transition hover:scale-100">
              <Button className=" rounded-full border-2 transition hover:outline  hover:bg-yellow-600 mr-4  ">
                <Link
                  className=" h-10 flex justify-center items-center w-20 "
                  href={`/api/auth/signin?callbackUrl=${pathname}`}
                >
                  SignIn
                </Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
