    /** @format */
    import { useMemo } from 'react';
    import { FiChevronDown } from 'react-icons/fi';
    import { SlOptionsVertical } from 'react-icons/sl';
    import { FaFlag } from 'react-icons/fa';
    import AddButton from './AddButton';
    import LeadData from '@/utils/Lead.json';
    import { DateValue } from '@internationalized/date';
    import { filterByTimeRange } from '@/utils/TableUtils';
    import { useRouter } from 'next/navigation';

    interface RecentLeadsProps {
      setOpenForm: (open: boolean) => void;
      timeRange?: string;
      value?: DateValue;
    }

    const RecentLeads = ({ setOpenForm, timeRange = "All Data", value }: RecentLeadsProps) => {
      const leadsData = useMemo(() => {
        const customDate = value ? new Date(value.year, value.month - 1, value.day) : undefined;
        const filtered = filterByTimeRange(LeadData, timeRange, customDate);

        return filtered.map((l, index) => ({
          dateCreated: l.dateCreated || l.eventDate || "N/A",
          leadName: l.leadName,
          status: (l.status || ['NEW LEAD', 'ACTIVE', 'INACTIVE'][index % 3]).toUpperCase(),
          priority: (l.priority || ['LOW', 'MEDIUM', 'HIGH'][index % 3]).toUpperCase(),
        })).sort((a, b) => new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime()).slice(0, 6);
      }, [timeRange, value]);

      const router = useRouter();

      return (
        <div className="bg-white p-6 sm:p-8 border border-gray-200 rounded-lg w-full flex flex-col h-[650px]">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
            <h2 className="text-xl font-semibold text-gray-900 flex-1">
              Recent Leads
            </h2>
            <div className="w-auto min-w-fit">
              <AddButton setOpenForm={setOpenForm} title="Add New" />
            </div>
          </div>

          {/* Horizontally scrollable table area */}
          <div className="flex-1 overflow-x-auto no-scrollbar">
            <div className="min-w-[520px]">
              {/* Table Header */}
              <div className="flex items-center bg-gray-50 px-4 py-3 border-0 rounded-lg mb-2 text-gray-600 font-medium text-[13px]">
                <div className="flex-[1.2] flex items-center gap-1 cursor-pointer whitespace-nowrap">
                  Lead Created <FiChevronDown className="flex-shrink-0" />
                </div>
                <div className="flex-[1.8] px-2">Lead Name</div>
                <div className="flex-1 text-center">Main Status</div>
                <div className="flex-1 text-center">Priority</div>
                <div className="w-10"></div>
              </div>

              {/* Table Body */}
              <div>
                {leadsData.map((row, index) => (
                  <div
                    key={index}
                    className="flex items-center px-4 py-4 border-b border-gray-100 last:border-0 hover:bg-gray-50 text-[14px] text-gray-900 transition-colors"
                  >
                    <div className="flex-[1.2] font-medium whitespace-nowrap">{row.dateCreated}</div>
                    <div className="flex-[1.8] font-medium px-2 truncate">{row.leadName}</div>

                    {/* Status */}
                    <div className="flex-1 flex justify-center">
                      <span
                        className={`inline-flex items-center justify-center px-3 py-1 rounded-full text-[11px] font-medium tracking-wide uppercase gap-1.5 whitespace-nowrap ${row.status === 'INACTIVE' ? 'bg-[#F1F5F9] text-[#334155]' : 'bg-[#FFFbeb] text-[#D97706]'
                          }`}
                      >
                        {row.status !== 'INACTIVE' && <span className="w-1.5 h-1.5 rounded-full bg-[#D97706]"></span>}
                        {row.status}
                      </span>
                    </div>

                    {/* Priority */}
                    <div className="flex-1 flex justify-center">
                      <span
                        className={`inline-flex items-center justify-center px-3 py-1 rounded-full text-[11px] font-medium tracking-wide text-white gap-1.5 whitespace-nowrap ${row.priority === "LOW"
                          ? "bg-[#22C55E]"
                          : row.priority === "MEDIUM"
                            ? "bg-[#FBBF24]"
                            : "bg-[#EF4444]"
                          }`}
                      >
                        <FaFlag className="text-white text-[10px]" /> {row.priority}
                      </span>
                    </div>

                    {/* Actions */}
                    <div className="w-10 flex justify-end">
                      <SlOptionsVertical className="text-gray-900 text-lg cursor-pointer hover:text-[#00B5E2] transition-colors" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer Button */}
          <div className="mt-4 pt-2" >
            <button onClick={() => router.push('/leads')} className="w-full py-2.5 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-900 hover:bg-gray-50 transition-colors cursor-pointer">
              View Leads
            </button>
          </div>
        </div>
      );
    };

    export default RecentLeads;
