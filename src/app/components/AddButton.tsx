const AddButton = ({ onClick }) => (
  <button
    onClick={onClick}
    className="flex items-center px-2 sm:px-3 lg:px-4 py-1.5 bg-[#01B0E9] text-white rounded-full hover:bg-[#0199d0] transition-colors"
  >
    <span className="flex items-center justify-center w-6 sm:w-8 lg:w-10 h-6 sm:h-8 lg:h-10 text-lg sm:text-xl lg:text-2xl font-extralight mr-1">
      +
    </span>
    <span className="text-xs sm:text-sm lg:text-base">Add New</span>
  </button>
);

export default AddButton;
