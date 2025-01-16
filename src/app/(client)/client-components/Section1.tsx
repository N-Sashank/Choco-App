import React from "react";
import Image from "next/image";
import image1 from "./chocob1.jpg";

const Section1 = () => {
  return (
    <div className=" w-full h-80 bg-stone-50 my-10 flex items-center gap-5">
      <div className="md:m-2 xl:ml-96">
        <Image
          className=" hidden md:block text-transparent rounded-xl "
          src={image1}
          alt=""
          width={400}
          height={400}
          loading="lazy"
        />
        <Image
          className="md:hidden m-1 text-transparent rounded-xl "
          src={image1}
          alt=""
          width={300}
          height={300}
          loading="lazy"
        />
      </div>
      <div className="w-96 ">
        <h1 className="font-extrabold md:text-3xl text-orange-950">
          Forget love, I'd rather fall in love with choclate
        </h1>
        <p className="mt-5 text-xs md:text-sm overflow-clip">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium
          eum aliquid esse perferendis delectus earum recusandae.
        </p>
      </div>
    </div>
  );
};

export default Section1;
