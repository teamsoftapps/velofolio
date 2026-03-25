import React from "react";
import { SlOptions } from "react-icons/sl";
import { BsSend } from "react-icons/bs";
import { useRouter } from "next/navigation";

interface InvoiceCardProps {
  type?: "Invoice" | "Quote";
  
  reference: string; // e.g., "3c779b"
  nextPaymentDue?: string; // for invoices
  status?: string; // for quotes
  totalAmount: string; // e.g., "$4999.00"
  balanceDue: string; // e.g., "$4999.00"
  clientId?: string;
  invoiceId?: string;
}



 const InvoiceCard: React.FC<InvoiceCardProps> = ({
  type = "Invoice",
  invoiceId,
  clientId,
  reference,
  nextPaymentDue,
  status,
  totalAmount,
  balanceDue,
}) => {
  const router = useRouter();

  const formatCurrency = (val: any) => {
    const num = typeof val === 'number' ? val : parseFloat(val);
    return isNaN(num) ? "N/A" : `$${num.toFixed(2)}`;
  };

  return (
    <div className="sm:h-32 bg-[#F4F4F5] w-full text-black p-2 sm:p-3 rounded-2xl inter">
      <div className="flex sm:flex-row flex-col sm:items-center justify-between">
        {/* Left */}
        <div className="space-y-2 text-sm inter">
          <h2 className="font-semibold">
            {type} #{invoiceId}
          </h2>
          <h2 className="text-gray-500">
            {type === "Invoice"
              ? nextPaymentDue || "Next Payment Due N/A"
              : status || "Status: Pending"}
          </h2>
        </div>

        {/* Right */}
        <div className="space-y-2 text-right">
          <h2 className="font-medium text-gray-700">Total: {formatCurrency(totalAmount)}</h2>
          <h2 className="font-bold text-[#01B0E9]">Balance: {formatCurrency(balanceDue || totalAmount)}</h2>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between mt-3">
        <div className="flex items-center gap-4">
          <button
            onClick={() =>
              router.push(`/view${type}?${type}Id=${invoiceId}&clientId=${clientId}`)
            }
            className="cursor-pointer rounded-4xl p-1 border-[#01B0E9] border-1 flex items-center gap-2 px-3"
          >
            <BsSend className="w-4 h-4" />
            <span>View</span>
          </button>

          <button className="cursor-pointer rounded-4xl p-1 border-[#01B0E9] border-1 flex items-center gap-2 px-3">
            <BsSend className="w-4 h-4" />
            <span>Send</span>
          </button>
        </div>

        <button className="cursor-pointer rounded-full p-2 border-[#01B0E9] border-1">
          <SlOptions className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};



export default InvoiceCard;
