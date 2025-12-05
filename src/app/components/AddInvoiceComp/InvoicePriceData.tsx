import React from 'react'
import { usePathname } from 'next/navigation';

const InvoicePriceData = ({ invoices, totalDue }: any) => {
  const pathname = usePathname();

  // Total original price
  const totalPrice = invoices?.reduce(
    (sum: number, item: any) => sum + Number(item.totalAmount),
    0
  );

  // Total discount amount
  const totalDiscountAmount = invoices?.reduce(
    (sum: number, item: any) =>
      sum + (Number(item.totalAmount) * (Number(item.discount) / 100)),
    0
  );

  // Overall discount in %
  const overallDiscountPercent = totalPrice
    ? (totalDiscountAmount / totalPrice) * 100
    : 0;

  return (
    <div className="text-right space-y-2 w-full md:w-auto">
      <div className="flex justify-between gap-3">
        <span className="text-black text-lg font-medium">Subtotal</span>
        <span className="text-lg font-medium text-gray-900">
          $ {totalPrice?.toFixed(2)}
        </span>
      </div>

      {pathname != '/invoice' && (
        <div className="flex justify-between gap-3">
          <span className="text-lg font-medium text-cyan-600 cursor-pointer hover:underline">
            Discount
          </span>
          <span className="text-lg font-medium text-gray-900">
            {overallDiscountPercent.toFixed(2)}%
          </span>
        </div>
      )}

      <div className="flex justify-between gap-3 border-t sm:border-t-0 border-gray-200 pt-2 sm:pt-0 w-full sm:w-auto">
        <span className="text-lg font-medium text-gray-900">Total Due</span>
        <span className="text-lg font-medium text-gray-900">${totalPrice}</span>
      </div>
    </div>
  );
};

export default InvoicePriceData;
