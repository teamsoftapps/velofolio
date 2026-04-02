import React, { useState } from 'react'
import { FiChevronDown } from 'react-icons/fi'

const DropOption = ({ options, value, onChange, className }: any) => {
  const [internalValue, setInternalValue] = useState(options && options.length > 0 ? options[0] : '');
  const isControlled = value !== undefined && onChange !== undefined;

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (!isControlled) {
      setInternalValue(e.target.value);
    }
    if (onChange) {
      onChange(e);
    }
  };

  return (
    <div className={`relative w-full sm:w-48 ${className || ''}`}>
      <select
        className={`w-full appearance-none rounded-md border text-black border-gray-300 ${className}   bg-gray-200 py-2 pl-3 pr-10 text-sm focus:border-[#01B0E9] focus:outline-none focus:ring-2 focus:ring-[#01B0E9]/20 sm:text-sm`}
        value={isControlled ? value : internalValue}
        onChange={handleChange}
      >
        {options?.map((item: any, i: number) => (
          <option key={i} value={item}>{item}</option>
        ))}
      </select>
      <FiChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" />
    </div>
  )
}

export default DropOption