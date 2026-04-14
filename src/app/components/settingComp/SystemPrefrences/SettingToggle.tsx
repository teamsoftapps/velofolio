import { BiRightArrowAlt } from "react-icons/bi";

const SettingToggle = ({ label, value, onChange }:any) => {
  return (
    <div className='bg-[#F4F4F5] border-gray-300 flex items-center justify-between min-w-[200px] border rounded-md px-4 py-2'>
      <h3 className='flex items-center gap-3'>
        {label}
        <BiRightArrowAlt className='w-5 h-5' />
      </h3>

      <button
        onClick={onChange}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
          value ? "bg-[#01B0E9]" : "bg-gray-300"
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            value ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </button>
    </div>
  );
};
export default SettingToggle