import { Check, CheckIcon } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";
import { BiMenu } from "react-icons/bi";
import { FiMoreVertical } from "react-icons/fi";
import { PiPlus } from "react-icons/pi";
import { IoMdAdd } from 'react-icons/io';
const initialTasks = [
  { id: 1, title: "Lead Created", date: "25 Nov 2025", checked: true, type: "step" },
  {
    id: 2,
    title: "Job Accepted",
    date: "26 Nov 2025",
    checked: false,
    tag: ["This triggers automatically if job is accepted. You can also trigger it manually."],
    type: "step"
  },
  { id: 3, title: "Sarah Wedding", date: "27 Nov 2025", checked: false, tag: ["Wedding"], type: "event" },
  { id: 6, title: "Job Completed", date: "25 Nov 2025", checked: true, tag: [""], type: "step" },
];

export default function TaskList() {
  const [tasks, setTasks] = useState(initialTasks);

  const cardRefs = useRef<(HTMLDivElement | null | undefined)[]>([]);
  const rowRefs = useRef<(HTMLDivElement | null | undefined)[]>([]);
  const [lineHeights, setLineHeights] = useState<number[]>([]);
  const [rowHeights, setRowHeights] = useState<number[]>([]);

  const toggle = (id: number) => {
    setTasks(prev =>
      prev.map(t => (t.id === id ? { ...t, checked: !t.checked } : t))
    );
  };

  useEffect(() => {
    const heights = cardRefs.current.map((card, i) => {
      if (!card || i === cardRefs.current.length - 1) return 0;
      const nextCard = cardRefs.current[i + 1];
      if (!nextCard) return 0;
      const currentCircleCenter = card.offsetTop + card.offsetHeight / 2;
      const nextCircleCenter = nextCard.offsetTop + nextCard.offsetHeight / 2;
      return nextCircleCenter - currentCircleCenter;
    });
    setLineHeights(heights);

    const rowHs = rowRefs.current.map(row => row?.offsetHeight || 0);
    setRowHeights(rowHs);
  }, [tasks]);

  return (
    <div className="w-full h-full py-3 flex flex-col gap-7 inter">
      {tasks.map((task, index) => {
        const borderColor = task.checked ? "border-[#13CC95]" : "border-[var(--primary-color)]";

        // Disable checkbox if previous task is not checked (excluding first)
        const isDisabled = index !== 0 && !tasks[index - 1].checked;

        return (
          <div
            key={task.id}
            className="relative ml-16"
            ref={el => { cardRefs.current[index] = el }}
          >
            {/* Vertical Line */}
            {index !== tasks.length - 1 && (
              <span
                className={`absolute w-2 rounded-l-lg top-1/2 -left-3 border-l-2 ${isDisabled ? "border-gray-300" :borderColor } `}
                style={{ height: lineHeights[index] ? `${lineHeights[index]}px` : "100%" }}
              ></span>
            )}

            {/* Card */}
            <div className={`relative w-[92%] bg-white border-2 ${isDisabled ? "border-gray-300" :borderColor } rounded-lg ${task.type === "step" ? "px-2 py-0.5" : ""}`}>
              {/* Circle */}
              <span
                className={`circle w-4 h-4 border-2 ${isDisabled ? "border-gray-300" :borderColor } bg-white rounded-full absolute -left-3 top-1/2 -translate-y-1/2 z-10`}
              ></span>
{index !=tasks.length-1 && <div className="absolute cursor-pointer -bottom-4 left-0 w-full opacity-0 hover:opacity-100 transition-all ease-in-out z-40   border-1 border-gray-300 border-dashed">
  <div className="absolute -top-4 left-1/2 w-9 h-9 aspect-square bg-[var(--primary-color)] rounded-full ">
  <IoMdAdd className="w-6 h-6 text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 opacity-100"/>

  </div>
   </div>}
              {/* Row (title + checkbox + right side) */}
              <div className="flex justify-between items-center w-full" ref={el => { rowRefs.current[index] = el }}>
                <div className="p-2 w-full">
              <label className="flex items-center gap-2 cursor-pointer w-full">
  <input
    type="checkbox"
    checked={task.checked}
    onChange={() => toggle(task.id)}
    disabled={isDisabled}
    className="sr-only " // hides default checkbox
  />
  <span
    className={`w-5 h-5 rounded border-1 inter flex items-center justify-center 
      ${task.checked ? "bg-[#13CC95] border-[#13CC95]" : "bg-white  border-black"}
      ${isDisabled ? "bg-gray-200 border-black" : ""}
    `}
  >
    {task.checked && <CheckIcon className="w-3 h-3 text-white" />}
  </span>
 <div className="flex items-center justify-between w-3/3 text-md font-medium inter"> <span>{task.title}</span>
 { task.checked && <span className="bg-[#A5A5A5] text-white text-sm px-3 py-0.5 rounded-3xl whitespace-nowrap">{task.date}</span>}

</div>
</label>


                  {/* Event info */}
                  {task.type === "event" && (
                    <span className="text-gray-400 text-xs whitespace-nowrap">
                      Location: New York, USA
                    </span>
                  )}

                  {/* Tags */}
                  <div className="flex items-center gap-3 flex-wrap mt-2">
                    {task.tag?.map((t, i) =>
                      t.trim() && (
                        <span
                          key={i}
                          className={`${task.type === "event" ? "bg-[var(--primary-color)] text-white" : "bg-[#818181] text-white"} text-xs px-3 py-1 rounded-3xl inline-block w-fit`}
                        >
                          {t}
                        </span>
                      )
                    )}
                  </div>
                </div>

                {/* Right side: date or menu */}
                {task.type != "step"&& (
                   <div className="flex items-stretch gap-2">
                    <div className="flex items-center justify-center px-2">
                      <FiMoreVertical className="text-gray-500 w-5 h-5 cursor-pointer" />
                    </div>
                    <div
                      className={`w-20 border-l-2 ${isDisabled ? "border-gray-300" :borderColor } flex items-center justify-center`}
                      style={{ height: rowHeights[index] || "auto" }}
                    >
                      <BiMenu className="text-gray-500 w-5 h-5 cursor-pointer" />
                    </div>
                  </div>
                  
                )
              }
             
              </div>
            </div>
           
          </div>
        );
      })}
    </div>
  );
}
