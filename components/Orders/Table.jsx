import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { getOrders } from "../../libs/getOrders";
import { APIKEY } from "../../constants/api";

export const Table = () => {
  const [orders, setOrders] = useState([]);

  async function handleFetch() {
    const response = await getOrders();
    console.log(response);
    setOrders(response);
  }

  useEffect(() => {
    axios
      .get(`${APIKEY}/api/v1/order/list/`)
      .then((res) => {
        console.log(res);
        setOrders(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    // handleFetch()
  }, []);

  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Date of Recept
            </th>
            <th scope="col" className="px-6 py-3">
              Date of Issue
            </th>
            <th scope="col" className="px-6 py-3">
              Amount
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
            <th scope="col" className="px-6 py-3">
              Price
            </th>
          </tr>
        </thead>
        <tbody>
          {/* <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              Microsoft Surface Pro
            </th>
            <td className="px-6 py-4">
              White
            </td>
            <td className="px-6 py-4">
              Laptop PC
            </td>
            <td className="px-6 py-4">
              $1999
            </td>
          </tr> */}
          {orders.map((o, i) => (
            <tr className="bg-white dark:bg-gray-800" key={i}>
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {" "}
                <Link
                  href={`/orders/${o.id}`}
                  scope="row"
                  className="inline-block px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {o.name}
                </Link>
              </th>
              <td className="px-6 py-4">{o.dateOfRecept}</td>
              <td className="px-6 py-4">{o.dateOfIssue}</td>
              <td className="px-6 py-4">{o.amount}</td>
              <td className="px-6 py-4">{o.status}</td>
              <td className="px-6 py-4">{o.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
