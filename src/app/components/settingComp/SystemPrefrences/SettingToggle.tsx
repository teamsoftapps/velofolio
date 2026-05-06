import { BiRightArrowAlt } from "react-icons/bi";

const SettingToggle = ({ label, value, onChange }:any) => {
  return (
    <div className='bg-[#F4F4F5] border-gray-300 flex items-center justify-between w-full border rounded-md px-4 py-3 gap-4'>
      <h3 className='flex items-center gap-3 flex-1'>
        <span className="leading-snug">{label}</span>
        <BiRightArrowAlt className='w-5 h-5 shrink-0 hidden sm:block' />
      </h3>

      <div className="flex shrink-0">
        <button
          onClick={onChange}
          className={`shrink-0 relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
            value ? "bg-[var(--primary-color)]" : "bg-gray-300"
          }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              value ? "translate-x-6" : "translate-x-1"
            }`}
          />
        </button>
      </div>
    </div>
  );
};
export default SettingToggle
