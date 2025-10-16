const AddButton = ({ onClick }: { onClick: () => void }) => (
  <button
    onClick={onClick}
    className="flex items-center px-4  bg-[#01B0E9] text-white rounded-full hover:bg-[#0199d0] transition-colors"
  >
    <span className="flex items-center justify-center w-12 h-12  bg-[#00A4DD] rounded-full text-3xl font-extralight mr-2">
      +
    </span>
    Add New
  </button>
);

export default AddButton;
