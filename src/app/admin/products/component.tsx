"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";

const TableComponent = () => {
  // interface ProductsInterface{
  //   id:string,
  //   name:string,
  //   updatedat: string,
  //     createdat: string,
  //     image: string,
  //     description?: string,
  //     price: string,
  // }

  // const productsList:Pro=[]

  const [products, setproducts] = useState([
    {
      id: " ",
      name: " ",
      updatedat: " ",
      createdat: " ",
      image: "",
      description: null,
      price: " ",
    },
  ]);

  async function getData() {
    const data = await axios.get("http://localhost:3000/api/products");

    setproducts(data.data);
  }
  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-xl">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Id
              </th>
              <th scope="col" className="px-6 py-3">
                Product Name
              </th>
              <th scope="col" className="px-6 py-3">
                Description
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((item) => {
              return (
                <tr
                  key={item.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {item.id}{" "}
                  </th>

                  <td className="px-6 py-4">{item.name}</td>
                  <td className="px-6 py-4">{item.description}</td>
                  <td className="px-6 py-4">{item.price}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableComponent;
