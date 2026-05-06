"use client"
import React, { useState, useEffect } from 'react'

const ColorPickerRow = ({
  label,
  value,
  onChange
}: {
  label: string;
  value: string;
  onChange: (val: string) => void
}) => (
  <div className='lg:flex-nowrap flex-wrap w-full flex items-center justify-between'>
    <h3 className='text-lg'>{label}</h3>
    <div className="relative flex items-center w-40">
      <label className="absolute left-1.5 w-5 h-5 rounded-full overflow-hidden border border-gray-300 shadow-sm cursor-pointer">
        <div className="w-full h-full" style={{ backgroundColor: value }} />
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="hidden"
        />
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value.toUpperCase())}
        maxLength={7}
        className='w-full pl-9 px-2 py-1.5 bg-[#F4F4F5] border-[#D4D4D8] rounded-sm border-[1px] uppercase focus:outline-none focus:border-primary'
      />
    </div>
  </div>
);

const Brandidentity = () => {
  const [primaryColor, setPrimaryColor] = useState("#01B0E9");
  const [secondaryColor, setSecondaryColor] = useState("#9BD1A4");
  const [accentColor, setAccentColor] = useState("#F0666F");

  // Dynamically update the global primary color when changed
  useEffect(() => {
    document.documentElement.style.setProperty('--primary-color', primaryColor);
  }, [primaryColor]);

  const colorSettings = [
    { label: "Primary Color", value: primaryColor, onChange: setPrimaryColor },
    { label: "Secondary Color", value: secondaryColor, onChange: setSecondaryColor },
    { label: "Accent Color", value: accentColor, onChange: setAccentColor },
  ];

  return (
    <div className='w-full bg-white border-[#D4D4D8] border-[1px] p-8 lg:max-w-2xl rounded-3xl h-full'>
      <h1 className='text-xl font-medium'>Brand Identity</h1>
      <div className='py-6 space-y-3'>
        {colorSettings.map((setting) => (
          <ColorPickerRow key={setting.label} {...setting} />
        ))}
      </div>

      <div className='relative'>
        <div className="relative border-2 border-primary rounded-2xl overflow-hidden w-full h-[380px] my-2">
          {/* Scaled Desktop Preview */}
          <div className="absolute top-0 left-0 origin-top-left scale-[0.43] overflow-hidden">
            <iframe
              src="https://velofolio-one.vercel.app/jobs"
              title="Desktop Website Preview"
              width="1440"
              height="900"
              className="border-0"
            />
          </div>
        </div>
        <span className="bg-primary absolute -bottom-2 left-1/2 -translate-x-1/2 text-white px-3 py-1 rounded-sm z-10">
          LIVE PREVIEW
        </span>
      </div>
    </div>
  )
}

export default Brandidentity
