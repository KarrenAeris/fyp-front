import { currency } from "../utils/currency";
const data = [
  {
    id: 1,
    name: "3Ds-2727",
    dateOfRecept: "07.02.2023",
    dateOfIssue: "-",
    amount: "#55",
    status: "Processing",
    price: currency(420),
  },
  {
    id: 2,
    name: "3Ds-2729",
    dateOfRecept: "08.02.2023",
    dateOfIssue: "-",
    amount: "#57",
    status: "Declined",
    price: currency(333),
  },
  {
    id: 3,
    name: "3Ds-2737",
    dateOfRecept: "08.02.2023",
    dateOfIssue: "-",
    amount: "#66",
    status: "Waiting",
    price: currency(514),
  },
  {
    id: 4,
    name: "3Ds-2755",
    dateOfRecept: "09.02.2023",
    dateOfIssue: "-",
    amount: "#69",
    status: "Printing",
    price: currency(202),
  },
  {
    id: 5,
    name: "3Ds-2128",
    dateOfRecept: "19.02.2023",
    dateOfIssue: "22.02.2023",
    amount: "#72",
    status: "Completed",
    price: currency(109),
  },
  {
    id: 6,
    name: "3Ds-4739",
    dateOfRecept: "25.02.2023",
    dateOfIssue: "-",
    amount: "#76",
    status: "In queue",
    price: currency(143),
  },
];

export default data