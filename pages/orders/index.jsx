import React from "react";
import { Table } from "../../components/Orders/Table";
import { Statistics } from "../../components/Statistics/Statistics";

const orders = () => {
  return (
    <div className="min-h mt-16">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-10 mt-[100px]">Orders</h1>
        <Statistics />
        <Table />
      </div>
    </div>
  );
};

export default orders;
