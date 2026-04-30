import React from 'react'

const GeneralSettings = () => {
    return (
        <div className='w-full border border-[#E0E0E2] bg-white p-6 rounded-2xl'>
            <h1 className='text-xl mb-7'>General Settings</h1>
            <div className='w-full space-y-7  p-4'>
                <div className='flex flex-col sm:flex-row sm:items-center justify-between w-full gap-2 sm:gap-0'>
                    <h3 className='text-lg mb-2 sm:mb-0'>Language </h3>
                    <select name="" id="" className='bg-[#F4F4F5] border-gray-300 w-full sm:min-w-[200px] sm:w-auto border-1 rounded-md px-4 py-2'>
                        <option value="english">English US</option>
                        <option value="english">Chinese</option>
                        <option value="english">English UK</option>
                    </select>
                </div>


                <div className='flex flex-col sm:flex-row sm:items-center justify-between w-full gap-2 sm:gap-0'>
                    <h3 className='text-lg mb-2 sm:mb-0'>Date Format </h3>
                    <select name="" id="" className='bg-[#F4F4F5] border-gray-300 w-full sm:min-w-[200px] sm:w-auto border-1 rounded-md px-4 py-2'>
                        <option value="english">YYYY/MM/DD</option>
                        <option value="english">DD/MM/YYYY</option>

                    </select>
                </div>


                <div className='flex flex-col sm:flex-row sm:items-center justify-between w-full gap-2 sm:gap-0'>
                    <h3 className='text-lg mb-2 sm:mb-0'>Time Format </h3>
                    <select name="" id="" className='bg-[#F4F4F5] border-gray-300 w-full sm:min-w-[200px] sm:w-auto border-1 rounded-md px-4 py-2'>
                        <option value="english">12 Hours</option>
                        <option value="english">24 Hours</option>
                    </select>
                </div>


                <div className='flex flex-col sm:flex-row sm:items-center justify-between w-full gap-2 sm:gap-0'>
                    <h3 className='text-lg mb-2 sm:mb-0'>Currency </h3>
                    <select name="" id="" className='bg-[#F4F4F5] border-gray-300 w-full sm:min-w-[200px] sm:w-auto border-1 rounded-md px-4 py-2'>
                        <option value="english">USD $</option>
                        <option value="english">Euro €</option>
                        <option value="english">Pound £</option>
                    </select>
                </div>


                <div className='flex flex-col sm:flex-row sm:items-center justify-between w-full gap-2 sm:gap-0'>
                    <h3 className='text-lg mb-2 sm:mb-0'>First Day of the Week </h3>
                    <select name="" id="" className='bg-[#F4F4F5] border-gray-300 w-full sm:min-w-[200px] sm:w-auto border-1 rounded-md px-4 py-2'>
                        <option value="english">Monday</option>
                        <option value="english">Sunday</option>
                        <option value="english">Teusday</option>
                    </select>
                </div>
            </div>

        </div>
    )
}

export default GeneralSettings
