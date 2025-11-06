
/** @format */
import { IoMdAdd } from 'react-icons/io';
import { useState } from 'react';

interface AddButtonProps {
  title: string;
  setOpenForm: (isOpen: boolean) => void;
  color?: string;
  hoverColor?: string;
}

const AddButton = ({
  title,
  setOpenForm,
  color = "#01B0E9",
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
      className="w-full h-10 p-4 pl-0 rounded-full flex items-center gap-2 text-white transition-colors duration-200 cursor-pointer"
    >
      <span
        style={{ backgroundColor: ho}}
     onMouseEnter={() => setBg(color)}
    
      
      className=" px-2 py-2 rounded-full flex items-center justify-center hover:-rotate-180 transition-transform duration-200">
        <IoMdAdd className="w-5 h-5" />
      </span>
      <span className="lg:text-sm md:text-xs text-sm font-medium w-full">{title}</span>
    </button>
  );
};

export default AddButton;
