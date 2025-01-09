import axios from "axios";
import React, { useEffect, useState } from "react";

const TableComponent = () => {
  const [orders, setorders] = useState([
    {
      id: 0,
      product: "",
      productId: 0,
      userId: 3,
      user: "",
      type: "",
      price: 0,
      image: "",
      status: "",
      address: "",
      quantity: 0,
      createAt: "",
    },
  ]);

  async function getData() {
    const data = await axios.get("http://localhost:3000/api/orders");

    setorders(data.data);
  }
  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-xl">
        <table className="overflow-scroll w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Id
              </th>
              <th scope="col" className="px-6 py-3">
                Product Name(id)
              </th>
              <th scope="col" className="px-6 py-3">
                User(id)
              </th>
              <th scope="col" className="px-6 py-3">
                Type
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                ImageURL
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Address
              </th>
              <th scope="col" className="px-6 py-3">
                Quantity
              </th>
              <th scope="col" className="px-6 py-3">
                Created At
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((item) => {
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

                  <td className="px-6 py-4">
                    {item.product}({item.productId})
                  </td>
                  <td className="px-6 py-4">
                    {item.user}({item.userId})
                  </td>
                  <td className="px-6 py-4">{item.type}</td>
                  <td className="px-6 py-4">{item.price}</td>
                  <td className="px-6 py-4">{item.image}</td>
                  <td className="px-6 py-4">{item.status}</td>
                  <td className="px-6 py-4">{item.address}</td>
                  <td className="px-6 py-4">{item.quantity}</td>
                  <td className="px-6 py-4">{item.createAt}</td>
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
