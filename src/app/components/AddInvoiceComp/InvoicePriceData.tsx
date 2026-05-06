import React from 'react'
import { usePathname } from 'next/navigation';

const InvoicePriceData = ({ invoices, totalDue }: any) => {
  const pathname = usePathname();

  // 1. Calculate Base Subtotal (Price * Quantity)
  const baseSubtotal = invoices?.reduce(
    (sum: number, item: any) => sum + (Number(item.price || 0) * Number(item.quantity || 1)),
    0
  );

  // 2. Calculate Total Discount Amount
  const totalDiscountAmount = invoices?.reduce(
    (sum: number, item: any) => {
      const itemSubtotal = Number(item.price || 0) * Number(item.quantity || 1);
      return sum + (itemSubtotal * (Number(item.discount || 0) / 100));
    },
    0
  );

  // 3. Calculate Total Tax Amount (calculated after discount)
  const totalTaxAmount = invoices?.reduce(
    (sum: number, item: any) => {
      const itemSubtotal = Number(item.price || 0) * Number(item.quantity || 1);
      const afterDiscount = itemSubtotal - (itemSubtotal * (Number(item.discount || 0) / 100));
      return sum + (afterDiscount * (Number(item.tax || 0) / 100));
    },
    0
  );

  // 4. Final Grand Total
  const grandTotal = baseSubtotal - totalDiscountAmount + totalTaxAmount;

  return (
    <div className="text-right space-y-2 w-full md:w-auto inter">
      {/* Subtotal */}
      <div className="flex justify-between gap-8">
        <span className="text-gray-600 text-lg font-medium">Subtotal</span>
        <span className="text-lg font-medium text-gray-900">
          $ {baseSubtotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </span>
      </div>

      {/* Discount (if any) */}
      {totalDiscountAmount > 0 && (
        <div className="flex justify-between gap-8">
          <span className="text-lg font-medium text-red-500">
            Discount
          </span>
          <span className="text-lg font-medium text-red-500">
            -$ {totalDiscountAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
        </div>
      )}

      {/* Tax (if any) */}
      {totalTaxAmount > 0 && (
        <div className="flex justify-between gap-8">
          <span className="text-lg font-medium text-gray-600">
            Tax ({invoices?.[0]?.tax || 0}%)
          </span>
          <span className="text-lg font-medium text-gray-900">
            $ {totalTaxAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
        </div>
      )}

      {/* Total Due */}
      <div className="flex justify-between gap-8 border-t border-gray-200 pt-3 mt-2">
        <span className="text-xl font-bold text-gray-900">Total Due</span>
        <span className="text-xl font-bold text-[var(--primary-color)]">
          $ {grandTotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </span>
      </div>
    </div>
  );
};

export default InvoicePriceData;
