import axios from "axios";
import React, { useEffect, useState } from "react";

const TableComponent = (title: any) => {
  const [warehouses, setwarehouses] = useState([
    {
      id: " ",
      name: " ",
      pincode: " ",
      updatedat: " ",
      createdat: " ",
    },
  ]);

  async function getData() {
    const data = await axios.get("http://localhost:3000/api/warehouses");

    setwarehouses(data.data);
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
                Warehouse Name (id)
              </th>
              <th scope="col" className="px-6 py-3">
                Pincode
              </th>
            </tr>
          </thead>
          <tbody>
            {warehouses.map((item) => {
              return (
                <tr
                  key={item.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white flex items-center justify-start gap-1"
                  >
                    {item.name}
                    <p className="font-thin text-gray-500">(id:{item.id})</p>
                  </th>
                  <td className="px-6 py-4">{item.pincode}</td>
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
