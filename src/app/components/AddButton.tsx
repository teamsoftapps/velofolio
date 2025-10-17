/** @format */

import { IoMdAdd } from "react-icons/io";
const AddButton = ({ title }: any) => (
  <button className="bg-[#01B0E9] w-full h-10 p-4 pl-0 rounded-full flex items-center gap-2 text-white hover:bg-[#00A4DD] transition-colors duration-200">
    <span className="bg-[#00A4DD] px-2 py-2 rounded-full flex items-center justify-center">
      <IoMdAdd className="w-5 h-5" />
    </span>
    <span className="text-sm font-medium">{title}</span>
  </button>
);

export default AddButton;
