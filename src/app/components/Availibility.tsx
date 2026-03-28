import React, { useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import AddButton from './AddButton';
import AddTimeOffModal from './AddTimeOffModal';

// In your parent component (Availability tab):
const statusMap: Record<string, string> = {
  'bg-gray-300': 'Available',
  'bg-yellow-500': 'Partial',
  'bg-black': 'Booked',
  'bg-blue-500': 'Time Off'
};
const mockStatusList = Object.keys(statusMap);

const CalendarTableComponent: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 9, 1)); // Oct 2025 default
  const [view, setView] = useState<'Month' | 'Week'>('Month');
  const [isTimeOffModalOpen, setIsTimeOffModalOpen] = useState(false);
  const daysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const startDay = (year: number, month: number) => new Date(year, month, 1).getDay();

  const handlePrev = () => {
    if (view === 'Month') {
      setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    } else {
      let temp = new Date(currentDate);
      temp.setDate(temp.getDate() - 7);
      setCurrentDate(temp);
    }
  };

  const handleNext = () => {
    if (view === 'Month') {
      setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    } else {
      let temp = new Date(currentDate);
      temp.setDate(temp.getDate() + 7);
      setCurrentDate(temp);
    }
  };

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const displayTitle = `${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`;

  const renderCells = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const numDays = daysInMonth(year, month);
    const startOfMo = startDay(year, month);

    let daysArray: { day: number, offset: boolean, mockStatus: string, fullDate?: Date }[] = [];

    // Fill prev month days
    const prevMoDays = daysInMonth(year, month - 1);
    for (let i = startOfMo - 1; i >= 0; i--) {
      daysArray.push({ day: prevMoDays - i, offset: true, mockStatus: '' });
    }

    // Fill current month days
    for (let i = 1; i <= numDays; i++) {
      const randIndex = ((i * 3) % mockStatusList.length);
      daysArray.push({ day: i, offset: false, mockStatus: mockStatusList[randIndex], fullDate: new Date(year, month, i) });
    }

    // Fill next month days
    const totalCells = Math.ceil(daysArray.length / 7) * 7;
    let nextDay = 1;
    while (daysArray.length < totalCells) {
      daysArray.push({ day: nextDay++, offset: true, mockStatus: '' });
    }

    // Chunk to weeks
    let weeks = [];
    for (let i = 0; i < daysArray.length; i += 7) {
      weeks.push(daysArray.slice(i, i + 7));
    }

    if (view === 'Week') {
      const d = currentDate.getDate();
      let weekIndex = 0;
      for (let r = 0; r < weeks.length; r++) {
        for (let c = 0; c < 7; c++) {
          if (!weeks[r][c].offset && weeks[r][c].day === d) {
            weekIndex = r;
            break;
          }
        }
      }
      weeks = [weeks[weekIndex]];
    }

    return weeks.map((w, idx) => (
      <tr key={idx} className='mb-4'>
        {w.map((dItem, i) => (
          <td key={i} className='p-2'>
            <div className={`flex items-center justify-center gap-1 flex-row-reverse ${dItem.offset ? 'text-gray-400' : ''}`}>
              {!dItem.offset && dItem.mockStatus && <div title={statusMap[dItem.mockStatus]} className={`w-6 h-6 ${dItem.mockStatus} rounded-full hover:ring-2 hover:ring-offset-1 hover:ring-gray-400 cursor-pointer transition-all`}></div>}
              <p>{dItem.day}</p>
            </div>
          </td>
        ))}
      </tr>
    ));
  };

  return (
    <div className='container mx-auto p-4  text-black rounded-lg'>
      <div className='flex flex-col gap-3 justify-between items-center mb-4 w-full sm:flex-row'>
        <div className='flex  items-center'>
          <button onClick={handlePrev} className='cursor-pointer p-1 hover:bg-gray-100 rounded-full'><FaChevronLeft className='w-5 h-5 mr-2' /></button>
          <h2 className='text-xl  font-semibold w-40 text-center'>{displayTitle}</h2>
          <button onClick={handleNext} className='cursor-pointer p-1 hover:bg-gray-100 rounded-full'><FaChevronRight className='w-5 h-5 ml-2' /></button>
        </div>
        <div className='w-full sm:w-44  flex items-center justify-between border-2 rounded-full p-[4px]'>
          <button
            onClick={() => setView('Month')}
            className={`${view === 'Month' ? 'bg-blue-500 text-white' : 'text-gray-700'} px-4 py-[2px] rounded-full w-1/2 transition-colors`}
          >
            Month
          </button>
          <button
            onClick={() => setView('Week')}
            className={`${view === 'Week' ? 'bg-blue-500 text-white' : 'text-gray-700'} px-4 py-[2px] rounded-full w-1/2 transition-colors`}
          >
            Week
          </button>
        </div>
        <div className='w-full sm:w-40'>
          <AddButton

            title='Add Time Off'
            setOpenForm={() => { setIsTimeOffModalOpen(true) }}
          />
        </div>
      </div>
      <AddTimeOffModal
        isOpen={isTimeOffModalOpen}
        onClose={() => setIsTimeOffModalOpen(false)}
        onAddTimeOff={(data) => {
          console.log('Time off requested:', data);
        }}
        memberName="Sarah Johnson"
        memberImage="/teampic1.png"
      />
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
            {renderCells()}
          </tbody>
        </table>
      </div>
      <div className='w-full flex-wrap text-center sm:flex-nowrap sm:w-auto flex justify-between mx-auto bg-[#E5F7FD] my-4 p-3 rounded-lg'>
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
