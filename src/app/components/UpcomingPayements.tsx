import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import PayementData from '@/utils/Payements.json';
import { DateValue } from '@internationalized/date';
import { filterByTimeRange } from '@/utils/TableUtils';
import JobDetail from '@/utils/JobDetail.json';

interface UpcomingPayementsProps {
  timeRange?: string;
  value?: DateValue;
}

const UpcomingPayements = ({ timeRange = "All Data", value }: UpcomingPayementsProps) => {
  const { invoices = [] } = useSelector((state: any) => state.persisted?.invoiceandQuote || {});

  const tableData = useMemo(() => {
    const milestonePayments: any[] = [];
    invoices.forEach((inv: any) => {
      // Find backup info from JobDetail if missing
      const backupInfo = JobDetail.find((j: any) => j.id === inv.clientId);
      const clientDisplayName = inv.clientName || backupInfo?.client?.name || inv.packages?.[0]?.name || `Client ID: ${inv.clientId}`;

      (inv.payments || []).forEach((p: any) => {
        milestonePayments.push({
          dueDate: p.dueDate === "Upon Signing" ? (inv.createdAt ? inv.createdAt.split('T')[0] : new Date().toISOString().split('T')[0]) : (p.dueDate || "N/A"),
          client: clientDisplayName,
          avatar: backupInfo?.client?.image || "",
          amount: p.amount || 0,
          paymentStatus: 'pending',
          paid: 0,
          createdAt: inv.createdAt
        });
      });
    });

    const mergedData = [ ...PayementData, ...milestonePayments ];

    const customDate = value ? new Date(value.year, value.month - 1, value.day) : undefined;
    const filtered = filterByTimeRange(mergedData, timeRange, customDate);

    return filtered.map(p => ({
      date: p.dueDate || "N/A",
      client: p.client,
      avatar: p.avatar,
      amount: p.amount,
      status: p.paymentStatus,
      paid: p.paid,
    })).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [timeRange, value, invoices]);

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
            <div key={index} className="flex flex-row justify-between items-center py-4 border-b border-gray-100 last:border-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
                  {item.avatar ? (
                    <img
                      src={item.avatar}
                      alt={item.client}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center font-bold text-gray-500 text-sm">
                      {item.client[0]}
                    </div>
                  )}
                </div>
                <div className="flex flex-col items-start">
                  <span className="text-black font-semibold text-sm sm:text-base">{item.client}</span>
                  <span className="text-[10px] sm:text-xs text-gray-400">{item.date}</span>
                </div>
              </div>
              <div className="flex items-center gap-3 sm:gap-6">
                <span className={`text-[10px] sm:text-xs px-2 py-1 rounded-md font-medium ${item.status?.toLowerCase() === 'paid' ? 'bg-green-50 text-green-600' :
                    item.status?.toLowerCase() === 'overdue' ? 'bg-red-50 text-red-600' :
                      'bg-orange-50 text-orange-600'
                  }`}>
                  {item.status}
                </span>
                <span className="text-black font-bold text-sm sm:text-lg">
                  {typeof item.amount === 'string' && !item.amount.startsWith('$') ? `$${Number(item.amount).toLocaleString()}` : 
                   typeof item.amount === 'number' ? `$${item.amount.toLocaleString()}` : 
                   item.amount}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default UpcomingPayements;
