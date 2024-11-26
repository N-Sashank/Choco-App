"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import TableComponent from "./component";

export default function productsPage() {
 

  return (
    <>
      <div className=" bg-slate-800-50 overflow-x-hidden overflow-y-scroll no-scrollbar   max-h-[640px] w-full text-gray-300 p-6">
        <div className=" my-4 w-full  flex flex-col p-6 border bg-amber-50 hover:bg-amber-100 border-gray-200 rounded-xl shadow  dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
          <div className=" flex items-center justify-center py-1 ">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-stone-950 dark:text-white">
              Products
            </h5>
          </div>
          <TableComponent />
        </div>
      </div>
    </>
  );
}
