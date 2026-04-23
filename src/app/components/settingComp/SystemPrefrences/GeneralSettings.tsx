import React from 'react'

const GeneralSettings = () => {
    return (
        <div className='lg:w-3xl w-full border border-[#E0E0E2] bg-white p-6 rounded-2xl'>
            <h1 className='text-xl mb-7'>General Settings</h1>
            <div className='w-full space-y-7  p-4'>
                <div className='flex items-center justify-between w-full'>
                    <h3 className='text-lg'>Language </h3>
                    <select name="" id="" className='bg-[#F4F4F5] border-gray-300 min-w-[200px] border-1 rounded-md px-4 py-2'>
                        <option value="english">English US</option>
                        <option value="english">Chinese</option>
                        <option value="english">English UK</option>
                    </select>
                </div>


                <div className='flex items-center justify-between w-full'>
                    <h3 className='text-lg'>Date Format </h3>
                    <select name="" id="" className='bg-[#F4F4F5] border-gray-300 min-w-[200px] border-1 rounded-md px-4 py-2'>
                        <option value="english">YYYY/MM/DD</option>
                        <option value="english">DD/MM/YYYY</option>

                    </select>
                </div>


                <div className='flex items-center justify-between w-full'>
                    <h3 className='text-lg'>Time Format </h3>
                    <select name="" id="" className='bg-[#F4F4F5] border-gray-300 min-w-[200px] border-1 rounded-md px-4 py-2'>
                        <option value="english">12 Hours</option>
                        <option value="english">24 Hours</option>
                    </select>
                </div>


                <div className='flex items-center justify-between w-full'>
                    <h3 className='text-lg'>Currency </h3>
                    <select name="" id="" className='bg-[#F4F4F5] border-gray-300 min-w-[200px] border-1 rounded-md px-4 py-2'>
                        <option value="english">USD $</option>
                        <option value="english">Euro €</option>
                        <option value="english">Pound £</option>
                    </select>
                </div>


                <div className='flex items-center justify-between w-full'>
                    <h3 className='text-lg'>First Day of the Week </h3>
                    <select name="" id="" className='bg-[#F4F4F5] border-gray-300 min-w-[200px] border-1 rounded-md px-4 py-2'>
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
