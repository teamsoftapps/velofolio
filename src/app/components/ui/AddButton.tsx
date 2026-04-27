
/** @format */
import { IoMdAdd } from 'react-icons/io';

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
}: AddButtonProps) => {

  return (
    <button
      onClick={() => setOpenForm && setOpenForm(true)}
      className="flex items-center gap-3 h-11 pl-1.5 pr-6 bg-[#01B0E9] rounded-full text-sm font-bold text-white hover:brightness-105 transition-all cursor-pointer whitespace-nowrap w-fit ml-auto"
    >
      <div className="w-8 h-8 rounded-full bg-black/10 flex items-center justify-center text-xl">
        <IoMdAdd className="w-5 h-5 flex-shrink-0" />
      </div>
      <span className="mb-0.5">{title}</span>
    </button>
  );
};

export default AddButton;
