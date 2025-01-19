"use client";
import axios from "axios";
import TableComponent from "./component";
import Delivery_personDialog from "../_components/dialogD";
import useSWR from "swr";
export default function delivery_personsPage() {
  interface warehousesInterface {
    id: string;
    name: string;
    pincode: string;
    updatedat: string;
    createdat: string;
  }
  let warehouses: warehousesInterface[] = [];

  function getData() {
    const data = axios.get("http://localhost:3000/api/warehouses");
    return data;
  }
  const { data, isLoading } = useSWR(
    "http://localhost:3000/api/warehouses",
    getData
  );
  warehouses = data?.data;

  return (
    <>
      {isLoading ? (
        <>
          {" "}
          <div>
            <div
              role="status"
              className="w-full  p-4 space-y-4 border border-gray-200 divide-y divide-gray-200 rounded shadow animate-pulse dark:divide-gray-700 md:p-6 dark:border-gray-700"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                  <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                </div>
                <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
              </div>
              <div className="flex items-center justify-between pt-4">
                <div>
                  <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                  <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                </div>
                <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
              </div>
              <div className="flex items-center justify-between pt-4">
                <div>
                  <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                  <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                </div>
                <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
              </div>
              <div className="flex items-center justify-between pt-4">
                <div>
                  <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                  <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                </div>
                <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
              </div>
              <div className="flex items-center justify-between pt-4">
                <div>
                  <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                  <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                </div>
                <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
              </div>
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        </>
      ) : (
        <div className=" bg-slate-800-50 overflow-x-hidden overflow-y-scroll   no-scrollbar max-h-[640px] w-full text-gray-300 p-6">
          <Delivery_personDialog />

          {warehouses.map((item) => {
            return (
              <div
                key={item.id}
                className=" my-4 w-full  flex flex-col p-6  border border-gray-200 rounded-xl shadow bg-amber-50 hover:bg-amber-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
              >
                <div className=" flex items-center justify-center py-1 ">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-stone-950 dark:text-white flex items-center justify-start gap-1">
                    {item.name}
                    <p className="font-thin text-sm text-gray-500">
                      (id:{item.id})
                    </p>
                  </h5>
                </div>
                <TableComponent title={item.name} />
              </div>
            );
          })}
          <div className="flex justify-end items-center  ">
            <div className=""></div>
          </div>
        </div>
      )}
    </>
  );
}
