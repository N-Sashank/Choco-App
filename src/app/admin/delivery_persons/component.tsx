import axios from "axios";
import React, { useEffect, useState } from "react";

const TableComponent = ({ title }: { title: string }) => {
  const [delivery_personsList, setdelivery_personsList] = useState([
    {
      id: " ",
      name: " ",
      phone: " ",
      warehouse: "warehouse",
    },
  ]);

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    const list = await axios.get("http://localhost:3000/api/delivery_persons");
    setdelivery_personsList(list.data);
  }
  return (
    <div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-xl">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Phone number
              </th>
            </tr>
          </thead>
          <tbody>
            {delivery_personsList.map((item) => {
              if (item.warehouse == title) {
                return (
                  <tr
                    key={item.phone}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {item.name}
                    </th>
                    <td className="px-6 py-4">{item.phone}</td>
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
