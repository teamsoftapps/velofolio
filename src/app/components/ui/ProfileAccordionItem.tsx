import React from "react";
import AddButton from "./AddButton";

interface ProfileAccordionItemProps {
  title: string;
  icon: React.ElementType;
  buttonLabel: string;
  onAddClick: () => void;
}

const ProfileAccordionItem = ({ title, icon: Icon, buttonLabel, onAddClick }: ProfileAccordionItemProps) => {
  return (
    <div className="bg-white rounded-[16px] border border-gray-100 p-6 flex items-center justify-between border border-gray-200  hover:shadow-md transition-all duration-300 cursor-pointer group mb-1.5 w-full min-h-[90px] gap-4">
      <div className="flex items-center gap-5 flex-1 min-w-0">
        <div className="w-12 h-12 rounded-full  flex items-center justify-center  transition-colors  flex-shrink-0">
          <Icon className="w-7 h-7 text-gray-900 opacity-80" />
        </div>
        <span className="text-[20px] font-medium text-gray-900 tracking-tight leading-tight truncate-two-lines">
          {title}
        </span>
      </div>
      <div className="shrink-0">
        <AddButton title={buttonLabel} setOpenForm={() => onAddClick()} />
      </div>
    </div>
  );
};

export default ProfileAccordionItem;
