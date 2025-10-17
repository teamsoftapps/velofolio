/** @format */

import { IoMdAdd } from 'react-icons/io';

interface AddButtonProps {
  title: string;
  setOpenForm: (isOpen: boolean) => void;
}

const AddButton = ({ title, setOpenForm }: AddButtonProps) => (
  <button
    onClick={() => setOpenForm(true)}
    className='bg-[#01B0E9] w-full h-10 p-4 pl-0 rounded-full flex items-center gap-2 text-white hover:bg-[#00A4DD] transition-colors duration-200 cursor-pointer'>
    <span className='bg-[#0397CB] px-2 py-2 rounded-full flex items-center justify-center hover:-rotate-180 transition-transform duration-200'>
      <IoMdAdd className='w-5 h-5' />
    </span>
    <span className='text-md font-medium'>{title}</span>
  </button>
);

export default AddButton;
