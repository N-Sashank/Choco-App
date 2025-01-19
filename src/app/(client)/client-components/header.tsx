import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { getServerSession } from "next-auth";
import { db } from "@/db";
import { eq } from "drizzle-orm";

import { usersTable } from "@/db/schema";
const Header = async () => {
  const session = await getServerSession();
  const email = session?.user?.email;

  let isAdmin: String = "";

  try {
    const status = await db
      .select({ role: usersTable.role })
      .from(usersTable)
      .where(eq(usersTable.email, email as string));
    isAdmin = status[0].role;
  } catch (error) {
    console.log(error);
  }

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
          {(await session) ? (
            <div className=" transition hover:scale-100">
              <Button className=" rounded-full border-2 transition hover:outline hover:bg-yellow-600 mr-4 ">
                <Link
                  className=" h-10 flex justify-center items-center w-20 "
                  href={`/api/auth/signout?callbackUrl=${"/"}`}
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
                  href={`/api/auth/signin?callbackUrl=${"/"}`}
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
