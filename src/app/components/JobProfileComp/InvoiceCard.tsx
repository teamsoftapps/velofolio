import React, { useState, useRef, useEffect } from "react";
import { SlOptions } from "react-icons/sl";
import { BsSend, BsLink45Deg } from "react-icons/bs";
import { FiEdit2, FiTrash2, FiCopy } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { setInvoices, setQuotes } from "@/store/slices/invoiceSlice";
import { toast } from "react-toastify";

interface InvoiceCardProps {
  type?: "Invoice" | "Quote";
  reference: string; 
  nextPaymentDue?: string; 
  status?: string; 
  totalAmount: string; 
  balanceDue: string; 
  clientId?: string | number;
  invoiceId?: string;
  packages?: any[];
  createdAt?: string;
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
  packages = [],
  createdAt,
}) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { invoices, quotes } = useSelector((state: any) => state.persisted.invoiceandQuote);
  const [showOptions, setShowOptions] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowOptions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const formatCurrency = (val: any) => {
    const num = typeof val === 'number' ? val : parseFloat(val);
    return isNaN(num) ? "N/A" : `$${num.toFixed(2)}`;
  };

  const handleEdit = () => {
    router.push(`/add${type}?id=${clientId}&${type}Id=${invoiceId}&edit=true`);
    setShowOptions(false);
  };

  const handleCopyLink = () => {
    const link = `${window.location.origin}/view${type}?${type}Id=${invoiceId}&clientId=${clientId}`;
    navigator.clipboard.writeText(link);
    toast.success("Link copied to clipboard!");
    setShowOptions(false);
  };

  const handleDelete = () => {
    if (type === "Invoice") {
      dispatch(setInvoices(invoices.filter((inv: any) => inv.id !== invoiceId)));
    } else {
      dispatch(setQuotes(quotes.filter((q: any) => q.id !== invoiceId)));
    }
    toast.info(`${type} deleted.`);
    setShowOptions(false);
  };

  const handleDuplicate = () => {
    const newId = Math.random().toString(36).substring(2, 9).toUpperCase();
    const newItem = {
      id: newId,
      reference: `DUPE-${reference}`,
      totalAmount,
      balanceDue,
      packages,
      status: type === "Quote" ? "DRAFT" : status,
      createdAt: new Date().toISOString(),
      clientId
    };

    if (type === "Invoice") {
      dispatch(setInvoices([...invoices, newItem]));
    } else {
      dispatch(setQuotes([...quotes, newItem]));
    }
    toast.success(`${type} duplicated as #${newId}`);
    setShowOptions(false);
  };

  return (
    <div className="sm:h-32 bg-[#F4F4F5] w-full text-black p-4 sm:p-5 rounded-2xl inter border border-transparent hover:border-gray-200 transition-all shadow-sm">
      <div className="flex sm:flex-row flex-col sm:items-center justify-between gap-2">
        {/* Left */}
        <div className="space-y-1 text-sm inter">
          <h2 className="font-bold text-base">
            {type} #{invoiceId}
          </h2>
          <h2 className="text-gray-500 font-medium">
            {type === "Invoice"
              ? nextPaymentDue || "Next Payment Due N/A"
              : status || "Status: Pending"}
          </h2>
        </div>

        {/* Right */}
        <div className="space-y-1 text-right">
          <h2 className="font-medium text-gray-500 text-xs uppercase tracking-wider">Total: {formatCurrency(totalAmount)}</h2>
          <h2 className="font-bold text-[var(--primary-color)] text-lg">Balance: {formatCurrency(balanceDue || totalAmount)}</h2>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() =>
              router.push(`/view${type}?${type}Id=${invoiceId}&clientId=${clientId}`)
            }
            className="cursor-pointer rounded-full p-1.5 border-[var(--primary-color)] border-2 bg-white hover:bg-[var(--primary-color)] hover:text-white transition-all flex items-center gap-2 px-5 text-sm font-semibold text-[var(--primary-color)]"
          >
            <BsSend className="w-3.5 h-3.5" />
            <span>View</span>
          </button>

          <button className="cursor-pointer rounded-full p-1.5 border-[var(--primary-color)] border-2 bg-white hover:bg-[var(--primary-color)] hover:text-white transition-all flex items-center gap-2 px-5 text-sm font-semibold text-[var(--primary-color)]">
            <BsSend className="w-3.5 h-3.5" />
            <span>Send</span>
          </button>
        </div>

        <div className="relative" ref={dropdownRef}>
          <button 
            onClick={() => setShowOptions(!showOptions)}
            className={`cursor-pointer rounded-full p-2 border-2 transition-all ${showOptions ? 'bg-[var(--primary-color)] border-[var(--primary-color)] text-white' : 'border-[var(--primary-color)] text-[var(--primary-color)] hover:bg-gray-50'}`}
          >
            <SlOptions className="w-4 h-4" />
          </button>

          {showOptions && (
            <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-2xl border border-gray-200 z-[9999] overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="py-1">
                <button onClick={handleEdit} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-100 transition-colors">
                  <FiEdit2 className="w-4 h-4 text-gray-400" />
                  <span>Edit</span>
                </button>
                <button onClick={handleCopyLink} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-100 transition-colors">
                  <BsLink45Deg className="w-4 h-4 text-gray-400" />
                  <span>Copy Link</span>
                </button>
                <button onClick={handleDuplicate} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-100 transition-colors">
                  <FiCopy className="w-4 h-4 text-gray-400" />
                  <span>Duplicate</span>
                </button>
                <div className="border-t border-gray-100 my-1"></div>
                <button onClick={handleDelete} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors">
                  <FiTrash2 className="w-4 h-4" />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};



export default InvoiceCard;
