import axios from "axios";
import React, { useEffect, useState } from "react";

const TableComponent = (title: any) => {
  const [inventory, setinventory] = useState([
    {
      id: " ",
      sku: " ",
      product_id: " ",
      product: " ",
      warehouse: "warehouse ",
    },
  ]);

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    const inventory = await axios.get("http://localhost:3000/api/inventory");
    setinventory(inventory.data);
  }
  return (
    <div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-xl">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Product name (P_id)
              </th>
              <th scope="col" className="px-6 py-3">
                sku
              </th>
            </tr>
          </thead>
          <tbody>
            {inventory.map((item) => {
              if (item.warehouse == title.title) {
                return (
                  <tr
                    key={item.sku}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <th
                      scope="row"
                      className=" flex gap-2 items-center  justify-normal px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {item.product}
                      <p className="font-extralight text-sm text-gray-400 text-muted-foreground">
                        (id:{item.product_id})
                      </p>
                    </th>
                    <td className="px-6 py-4">{item.sku}</td>
                  </tr>
                );
              } else {
                return;
              }
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableComponent;
