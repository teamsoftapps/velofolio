/** @format */

// import React from "react";

// export const page = () => {
//   return <div>page</div>;
// };

import React from "react";
import Navbar from "../Components/Navbar";
import { GoSearch, GoSortAsc } from "react-icons/go";
import { FaSort } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { SlOptionsVertical } from "react-icons/sl";
import Pagination from "../Components/Pagination";
import Table from "../Components/Table";
import OverviewHeader from "../Components/OverviewHeader";
import TeamData from "../../utils/team.json";

const tableData = TeamData;
const tableHeaders = [
  { key: "Name", label: "Name" },
  { key: "Role", label: "Role" },
  { key: "Email", label: "Email" },
  { key: "Phone", label: "Phone" },
  { key: "Status", label: "Status" },
  { key: "Assigned Jobs", label: "Assigned Jobs" },
  { key: "Availability", label: "Availability" },
  { key: "Action", label: "Action" },
];

export default function Page() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen w-full flex flex-col items-start bg-[#FAFAFA]">
        {/* <Pagination /> */}
        <div className="container mx-auto  w-[100%] h-[80vh]">
          <OverviewHeader title={"Teams"} />

          <Table headers={tableHeaders} data={TeamData} />
        </div>
      </div>
    </>
  );
}
