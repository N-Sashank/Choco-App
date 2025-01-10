import React from "react";
import Image from "next/image";
import image1 from "./chocob1.jpg";

const Section1 = () => {
  return (
    <div className="w-full h-80 bg-stone-50 my-10 flex items-center gap-5">
      <div className="ml-96">
        <Image
          className=" text-transparent rounded-xl"
          src={image1}
          alt=""
          width={400}
          height={400}
          loading="lazy"
        />
      </div>
      <div className="w-96 ">
        <h1 className="font-extrabold text-3xl text-orange-950">
          Forget love, I'd rather fall in love with choclate
        </h1>
        <p className="mt-5 overflow-clip">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium
          eum aliquid esse perferendis delectus earum recusandae.
        </p>
      </div>
    </div>
  );
};

export default Section1;
