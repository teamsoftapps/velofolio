import React from "react";
import { Calendar } from "@heroui/calendar";
import { DateValue } from "@internationalized/date";

export default function CalenderModal({ value, setValue }: any) {

  return <Calendar aria-label="Date (Controlled)" value={value} onChange={setValue}

    showShadow
    color="success"
    classNames={{

      cellButton: `
      rounded-full
      data-[selected=true]:bg-[var(--primary-color)]
      data-[selected=true]:text-white
      
      data-[today=true]:border-2
      data-[today=true]:border-[var(--primary-color)]
   
      data-[today=true]:font-bold
      
      hover:bg-gray-200
      data-[disabled=true]:text-gray-300
      data-[disabled=true]:hover:bg-white
    `,
    }}

  />;
}
