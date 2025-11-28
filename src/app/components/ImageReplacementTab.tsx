import React, { useState } from 'react'

const ImageReplacementTab = ({imagePlacement, setImagePlacement}:any) => {

return (
  <div className="flex flex-col justify-center mt-4 lg:mt-0">
    <label className="text-sm font-medium text-gray-700 mb-2">Image Placement</label>
    <div className="flex flex-col sm:flex-row justify-between bg-[#978F8F] border-1 border-gray-400 rounded-sm">
      <button
            type='button'

        className={`
          flex-1 text-sm  p-2 cursor-pointer  text-center transition-all duration-200
          ${
            imagePlacement === 'above'
              ? 'bg-[#EDEDED] text-black shadow-sm'
              : 'bg-white hover:bg-gray-100'
          }
        `}
        onClick={() => setImagePlacement('above')}
      >
        Above Description
      </button>
      <button
      type='button'
        className={`
          flex-1 text-sm p-2 cursor-pointer text-center transition-all duration-200
          ${
            imagePlacement === 'below'
              ? 'bg-[#EDEDED] text-black shadow-sm'
              : 'bg-white hover:bg-gray-100'
          }
        `}
        onClick={() => setImagePlacement('below')}
      >
        Below Description
      </button>
    </div>
    <p className="text-xs text-gray-500 mt-1">Acceptable file formats are PNG, JPG and JPEG. Max file size is 2mb.</p>
  </div>
);
}

export default ImageReplacementTab