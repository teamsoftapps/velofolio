import { FC } from 'react';

interface SplitInvoicePaymentProps {
  payments: Array<{
    id: number;
    dueDate: string;
    status: string;
    percentage: string;
    amount: string;
  }>;
  totalDue: string;
}

const SplitInvoicePayment: FC<SplitInvoicePaymentProps> = ({ payments, totalDue }) => {
  return (
    <div className="w-full bg-white rounded-lg p-3 min-h-40">
      {/* Add overflow-x-auto to enable horizontal scrolling when content overflows */}
      <div className="overflow-x-auto scroller">
        <table className="w-full rounded-lg border-separate border-spacing-y-4">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-6 py-4 text-left text-md font-medium text-black border border-r-0 border-gray-400 rounded-l-lg">
                Payments
              </th>
              <th className="px-6 py-4 text-left text-md font-medium text-black border-t border-b border-gray-400">
                Due
              </th>
              <th className="px-6 py-4 text-left text-md font-medium text-black border-t border-b border-gray-400">
                Status
              </th>
              <th className="px-1 py-4 text-right text-md font-medium text-black border-t border-b border-gray-400"></th>
              <th className="px-6 py-4 text-right text-md font-medium text-black border-l-0 border border-gray-400 rounded-r-lg">
                Amount
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {payments.map((payment) => (
              <tr key={payment.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-900 border-b border-gray-300">{payment.id}</td>
                <td className="px-6 py-4 text-sm text-gray-900 border-b border-gray-300">{payment.dueDate}</td>
                <td className="px-6 py-4 border-b border-gray-300">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-300 text-gray-800">
                    {payment.status}
                  </span>
                </td>
                <td className="px-1 py-4 text-sm text-right border-b border-gray-300">{payment.percentage}</td>
                <td className="px-6 py-4 text-sm text-right border-b border-gray-300">${payment.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Total Due Row */}
      <div className="mt-2 border border-gray-300 rounded-b-lg bg-white">
        <div className="px-6 py-4 border-t border-gray-300">
          <div className="flex justify-between items-center">
            <span className="text-md font-medium text-black">Total Due:</span>
            <span className="text-lg font-semibold text-gray-900">${totalDue}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SplitInvoicePayment;
