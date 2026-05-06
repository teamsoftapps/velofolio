import { IoMdAdd } from 'react-icons/io';
import { useState } from 'react';
import { BiSolidReport } from 'react-icons/bi';
interface AddButtonProps {
  title: string;
  setOpenForm: (isOpen: boolean) => void;
  color?: string;
  hoverColor?: string;
}

const AddButton = ({
  title,
  setOpenForm,
  color = "var(--primary-color)",
  hoverColor = "#00A4DD",
}: AddButtonProps) => {
  const [bg, setBg] = useState(color);
  const [ho, setHo] = useState(hoverColor);

  return (
    <button
      onClick={() => setOpenForm(true)}
      style={{ backgroundColor: bg }}
      onMouseEnter={() => setBg(hoverColor)}
      onMouseLeave={() => setBg(color)}
      className="w-full h-10 sm:px-6 p-4 pl-0 rounded-full flex justify-center items-center gap-2 text-white transition-colors duration-200 cursor-pointer"
    >
        <BiSolidReport className="w-5 h-5 text-white" />
      {/* <span
     
    
      
      className=" ml-3 px-1 py-2 ">
      </span> */}
      <span className="lg:text-sm md:text-xs text-sm font-medium">{title}</span>
    </button>
  );
};

export default AddButton;
