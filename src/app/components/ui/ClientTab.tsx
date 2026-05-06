import { useState } from "react";

interface TabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}
export default function Tabs({ activeTab, setActiveTab }: TabsProps) {


  return (
    <div className="w-[80%] sm:w-52 flex items-center justify-between border-2 rounded-full p-0.5 px-2 relative inter">
      {/* Background transition element */}
      <div
        className={`absolute top-0.5 bottom-0.5 text-center rounded-full bg-[var(--primary-color)] transition-all duration-300`}
        style={{
          left: activeTab === "Client" ? "1%" : "49%",
          width: "50%",
        }}
      ></div>

      {/* Buttons */}
      <button
      type="button"
        onClick={() => setActiveTab("Client")}
        className={`relative z-10 px-4 py-[2px] rounded-full transition-colors duration-300 ${
          activeTab === "Client" ? "text-white" : "text-gray-700"
        }`}
      >
        Client
      </button>

      <button
            type="button"
        onClick={() => setActiveTab("Company")}
        className={`relative z-10 px-4 py-[2px] rounded-full text-center transition-colors duration-300 ${
          activeTab === "Company" ? "text-white" : "text-gray-700"
        }`}
      >
        Company
      </button>
    </div>
  );
}
