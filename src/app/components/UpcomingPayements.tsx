/** @format */
import { useMemo } from 'react';
import PayementData from '@/utils/Payements.json';
import { DateValue } from '@internationalized/date';
import { filterByTimeRange } from '@/utils/TableUtils';

interface UpcomingPayementsProps {
  timeRange?: string;
  value?: DateValue;
}

const UpcomingPayements = ({ timeRange = "All Data", value }: UpcomingPayementsProps) => {
  const tableData = useMemo(() => {
    const customDate = value ? new Date(value.year, value.month - 1, value.day) : undefined;
    const filtered = filterByTimeRange(PayementData, timeRange, customDate);
    
    return filtered.map(p => ({
      date: p.dueDate || "N/A",
      client: p.client,
      amount: p.amount,
      status: p.paymentStatus,
      paid: p.paid,
    })).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [timeRange, value]);

  return (
    <div className='bg-white p-8 border border-gray-300 rounded-lg shadow-md h-[450px] w-full  lg:min-w-1/2 overflow-y-auto'>
      <div className=' w-full flex flex-row justify-between items-center mb-4'>
        <h2 className=' text-lg font-medium text-[20px] sm:text-[22px] lg:text-[24px] text-black'>
          Overdue & Upcoming Payments
        </h2>
      </div>

      {tableData.length === 0 ? (
        <div className='bg-[#F4F4F5] w-full h-[160px] mx-auto mt-12 text-center p-4 flex flex-col justify-center items-center text-black'>
          No Invoices and Payments Record Found
        </div>
      ) : (
        <div className="flex flex-col space-y-3">
          {tableData.map((item, index) => (
            <div key={index} className="flex flex-col sm:flex-row justify-between items-center py-3 border-b border-gray-300">
               <div className="flex flex-col space-y-1">
                  <span className="text-black font-medium">{item.client}</span>
                  <span className="text-xs text-gray-500">{item.date}</span>
               </div>
               <div className="flex items-center space-x-4">
                  <span className={`text-sm px-2 py-0.5 rounded ${item.status === 'Paid' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {item.status}
                  </span>
                  <span className="text-black font-semibold">{item.amount}</span>
               </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default UpcomingPayements;
