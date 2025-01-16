"use client";
import React from "react";
import background from "./chocolate.jpg";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

const Hero = () => {
  const { data: session } = useSession();

  return (
    <div className="">
      <div className="absolute  text-white md:ml-24 md:my-16 h-auto lg:mt-44 lg:mb-2  md:w-2/5   ">
        <div className="md:hidden m-3">
          {session ? (
            <div className=" transition hover:scale-100">
              <Link href={`/api/auth/signout?callbackUrl=${"/"}`}>
                <Button className=" rounded-full border-2 transition hover:outline hover:bg-yellow-600 mr-4 w-50 ">
                  SignOut
                </Button>
              </Link>
            </div>
          ) : (
            <div className=" transition hover:scale-100 ">
              <Link href={`/api/auth/signin?callbackUrl=${"/"}`}>
                <Button className=" rounded-full border-2 transition hover:outline  hover:bg-yellow-600 mr-4 w-50 ">
                  SignIn
                </Button>
              </Link>
            </div>
          )}
        </div>
        <h1 className="hidden md:block md:text-5xl font-bold">
          Make more moments
        </h1>
        <h1 className="hidden md:block mt-2 md:text-5xl font-bold">
          of goodness
        </h1>
        <h1 className="md:hidden font-bold m-9 text-2xl text-center ">
          Welcome to Choco App (Mobile)
        </h1>
        <div>
          <h3 className="hidden md:block font-sans mt-3 w-auto">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur
            ipsam velit ipsa dolore magnam! Facilis esse quas quisquam iste
            voluptaslaceat, repudiandae provident. Asperiores, recusandae quis?
          </h3>
          {/* <h4 className="">Welcome to Choco App</h4> */}
        </div>
        <Link
          className=" flex items-center justify-center md:block"
          href="#products-section"
        >
          <button className=" transition p-2 md:m-3 ml-1 hidden md:block hover:bg-yellow-800 active:bg-yellow-700 outline-dashed bg-transparent rounded-xl hover:scale-105 ">
            Shop now
          </button>
        </Link>
      </div>

      <Image
        className=""
        src={background}
        style={{ objectFit: "contain" }}
        alt="Hero image"
        priority
      />
    </div>
  );
};

export default Hero;
