/** @format */

import React from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import AddButton from './AddButton';

const CalendarTableComponent: React.FC = () => {
  return (
    <div className='container mx-auto p-4  text-black rounded-lg'>
      <div className='flex flex-col gap-3 justify-between items-center mb-4 w-full sm:flex-row'>
        <div className='flex  items-center'>
          <FaChevronLeft className='w-5 h-5 mr-2' />

          <h2 className='text-xl  font-semibold'>October 2025 </h2>
          <FaChevronRight className='w-5 h-5 ml-2' />
        </div>
        <div className='w-full sm:w-44  flex items-center justify-between border-2 rounded-full p-[4px]'>
          <button className='bg-blue-500 text-white px-4 py-[2px] rounded-full'>
            Month
          </button>
          <button className=' text-gray-700 px-4 py-[2px]  rounded-full'>
            Week
          </button>
        </div>
        <div className='w-full sm:w-40'>
          <AddButton
            title='Add Time Off'
            setOpenForm={() => {}}
          />
        </div>
      </div>
      <div className="w-full overflow-x-auto md:overflow-x-visible scroller">
      <table className='w-full border-separate border-spacing-y-4 '>
        <thead className='bg-gray-200 rounded-3xl border-gray-300 border-1'>
          <tr>
            <th className='p-2'>Su</th>
            <th className='p-2'>Mo</th>
            <th className='p-2'>Tu</th>
            <th className='p-2'>We</th>
            <th className='p-2'>Th</th>
            <th className='p-2'>Fr</th>
            <th className='p-2'>Sa</th>
          </tr>
        </thead>
        <tbody>
          <tr className='mb-4'>
            {/* <td className="p-2"><div className="flex items-center justify-center gap-1 flex-row-reverse"><div className="w-6 h-6 bg-gray-300 rounded-full"></div><p>1</p></div></td> */}
            <td className='p-2'>
              <div className='flex items-center justify-center gap-1 flex-row-reverse text-gray-400'>
                <p>30</p>
              </div>
            </td>
            <td className='p-2'>
              <div className='flex items-center justify-center gap-1 flex-row-reverse  text-gray-400'>
                <p>31</p>
              </div>
            </td>
            <td className='p-2'>
              <div className='flex flex-row-reverse items-center justify-center gap-1'>
                <div className='w-6 h-6 bg-green-500 rounded-full'></div>
                <p>1</p>
              </div>
            </td>
            <td className='p-2'>
              <div className='flex flex-row-reverse items-center justify-center gap-1'>
                <div className='w-6 h-6 bg-yellow-500 rounded-full'></div>
                <p>2</p>
              </div>
            </td>
            <td className='p-2'>
              <div className='flex flex-row-reverse items-center justify-center gap-1'>
                <div className='w-6 h-6 bg-red-500 rounded-full'></div>
                <p>3</p>
              </div>
            </td>
            <td className='p-2'>
              <div className='flex flex-row-reverse items-center justify-center gap-1'>
                <div className='w-6 h-6 bg-gray-300 rounded-full'></div>
                <p>4</p>
              </div>
            </td>
            <td className='p-2'>
              <div className='flex flex-row-reverse items-center justify-center gap-1'>
                <div className='w-6 h-6 bg-green-500 rounded-full'></div>
                <p>5</p>
              </div>
            </td>
          </tr>
          <tr>
            <td className='p-2'>
              <div className='flex items-center justify-center gap-1 flex-row-reverse'>
                <div className='w-6 h-6 bg-red-500 rounded-full'></div>
                <p>6</p>
              </div>
            </td>
            <td className='p-2'>
              <div className='flex items-center justify-center gap-1 flex-row-reverse'>
                <div className='w-6 h-6 bg-red-500 rounded-full'></div>
                <p>7</p>
              </div>
            </td>
            <td className='p-2'>
              <div className='flex items-center justify-center gap-1 flex-row-reverse'>
                <div className='w-6 h-6 bg-yellow-500 rounded-full'></div>
                <p>8</p>
              </div>
            </td>
            <td className='p-2'>
              <div className='flex items-center justify-center gap-1 flex-row-reverse'>
                <div className='w-6 h-6 bg-green-500 rounded-full'></div>
                <p>9</p>
              </div>
            </td>
            <td className='p-2'>
              <div className='flex items-center justify-center gap-1 flex-row-reverse'>
                <div className='w-6 h-6 bg-green-500 rounded-full'></div>
                <p>10</p>
              </div>
            </td>
            <td className='p-2'>
              <div className='flex items-center justify-center gap-1 flex-row-reverse'>
                <div className='w-6 h-6 bg-red-500 rounded-full'></div>
                <p>11</p>
              </div>
            </td>
            <td className='p-2'>
              <div className='flex items-center justify-center gap-1 flex-row-reverse'>
                <div className='w-6 h-6 bg-gray-300 rounded-full'></div>
                <p>12</p>
              </div>
            </td>
          </tr>
          <tr>
            <td className='p-2'>
              <div className='flex items-center justify-center gap-1 flex-row-reverse'>
                <div className='w-6 h-6 bg-red-500 rounded-full'></div>
                <p>13</p>
              </div>
            </td>
            <td className='p-2'>
              <div className='flex items-center justify-center gap-1 flex-row-reverse'>
                <div className='w-6 h-6 bg-red-500 rounded-full'></div>
                <p>14</p>
              </div>
            </td>
            <td className='p-2'>
              <div className='flex items-center justify-center gap-1 flex-row-reverse'>
                <div className='w-6 h-6 bg-yellow-500 rounded-full'></div>
                <p>15</p>
              </div>
            </td>
            <td className='p-2'>
              <div className='flex items-center justify-center gap-1 flex-row-reverse'>
                <div className='w-6 h-6 bg-green-500 rounded-full'></div>
                <p>16</p>
              </div>
            </td>
            <td className='p-2'>
              <div className='flex items-center justify-center gap-1 flex-row-reverse'>
                <div className='w-6 h-6 bg-green-500 rounded-full'></div>
                <p>17</p>
              </div>
            </td>
            <td className='p-2'>
              <div className='flex items-center justify-center gap-1 flex-row-reverse'>
                <div className='w-6 h-6 bg-red-500 rounded-full'></div>
                <p>18</p>
              </div>
            </td>
            <td className='p-2'>
              <div className='flex items-center justify-center gap-1 flex-row-reverse'>
                <div className='w-6 h-6 bg-gray-300 rounded-full'></div>
                <p>19</p>
              </div>
            </td>
          </tr>
          <tr>
            <td className='p-2'>
              <div className='flex items-center justify-center gap-1 flex-row-reverse'>
                <div className='w-6 h-6 bg-red-500 rounded-full'></div>
                <p>20</p>
              </div>
            </td>
            <td className='p-2'>
              <div className='flex items-center justify-center gap-1 flex-row-reverse'>
                <div className='w-6 h-6 bg-red-500 rounded-full'></div>
                <p>21</p>
              </div>
            </td>
            <td className='p-2'>
              <div className='flex items-center justify-center gap-1 flex-row-reverse'>
                <div className='w-6 h-6 bg-red-500 rounded-full'></div>
                <p>22</p>
              </div>
            </td>
            <td className='p-2'>
              <div className='flex items-center justify-center gap-1 flex-row-reverse'>
                <div className='w-6 h-6 bg-red-500 rounded-full'></div>
                <p>23</p>
              </div>
            </td>
            <td className='p-2'>
              <div className='flex items-center justify-center gap-1 flex-row-reverse'>
                <div className='w-6 h-6 bg-red-500 rounded-full'></div>
                <p>24</p>
              </div>
            </td>
            <td className='p-2'>
              <div className='flex items-center justify-center gap-1 flex-row-reverse'>
                <div className='w-6 h-6 bg-red-500 rounded-full'></div>
                <p>25</p>
              </div>
            </td>
            <td className='p-2'>
              <div className='flex items-center justify-center gap-1 flex-row-reverse'>
                <div className='w-6 h-6 bg-red-500 rounded-full'></div>
                <p>26</p>
              </div>
            </td>
          </tr>
          <tr>
            <td className='p-2'>
              <div className='flex items-center justify-center gap-1 flex-row-reverse'>
                <div className='w-6 h-6 bg-green-500 rounded-full'></div>
                <p>27</p>
              </div>
            </td>
            <td className='p-2'>
              <div className='flex items-center justify-center gap-1 flex-row-reverse'>
                <div className='w-6 h-6 bg-green-500 rounded-full'></div>
                <p>28</p>
              </div>
            </td>
            <td className='p-2'>
              <div className='flex items-center justify-center gap-1 flex-row-reverse'>
                <div className='w-6 h-6 bg-green-500 rounded-full'></div>
                <p>29</p>
              </div>
            </td>
            <td className='p-2'>
              <div className='flex items-center justify-center gap-1 flex-row-reverse'>
                <div className='w-6 h-6 bg-green-500 rounded-full'></div>
                <p>30</p>
              </div>
            </td>
            <td className='p-2'>
              <div className='flex items-center justify-center gap-1 flex-row-reverse text-gray-400'>
                <p>1</p>
              </div>
            </td>
            <td className='p-2'>
              <div className='flex items-center justify-center gap-1 flex-row-reverse  text-gray-400'>
                <p>2</p>
              </div>
            </td>
            <td className='p-2'>
              <div className='flex items-center justify-center gap-1 flex-row-reverse  text-gray-400'>
                <p>3</p>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
</div>
      <div className='w-full flex-wrap text-center sm:flex-nowrap sm:w-auto flex justify-between mx-auto bg-[#E5F7FD] my-4 p-3'>
        <div className='flex items-center'>
          <div className='w-4 h-4 bg-gray-300 mr-2 rounded-full'></div>{' '}
          Available
        </div>
        <div className='flex items-center'>
          <div className='w-4 h-4 bg-yellow-500 mr-2 rounded-full'></div>{' '}
          Partial
        </div>
        <div className='flex items-center'>
          <div className='w-4 h-4 bg-black mr-2 rounded-full'></div> Booked
        </div>
        <div className='flex items-center'>
          <div className='w-4 h-4 bg-blue-500 mr-2 rounded-full'></div> Time Off
        </div>
      </div>
    </div>
  );
};

export default CalendarTableComponent;
