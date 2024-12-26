import React from "react";
import background from "./chocolate.jpg";
import Image from "next/image";

const Hero = () => {
  return (
    <div className="">
      <div className="absolute text-white m-52  ">
        <h1 className="text-5xl font-bold">Make more moments</h1>
        <h1 className="mt-2 text-5xl font-bold">of goodness</h1>
        <h3 className=" font-sans mt-3 w-2/5">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur
          ipsam velit ipsa dolore magnam! Facilis esse quas quisquam iste
          voluptas necessitatibus ea pariatur exercitationem placeat,
          repudiandae provident. Asperiores, recusandae quis?
        </h3>
        <button className=" p-2 m-3 ml-1  hover:bg-yellow-800 active:bg-yellow-700 outline-dashed bg-transparent rounded-xl hover:scale-105 ">
          Shop now
        </button>
      </div>

      <Image
        className="  text-transparent"
        src={background}
        style={{ objectFit: "cover" }}
        alt="Picture of the author"
      />
    </div>
  );
};

export default Hero;
