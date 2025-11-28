"use client";

import { useState } from "react";
import { SlOptionsVertical } from "react-icons/sl";
import ActionModalInvoice from "../ActionModalInvoice";
import { usePathname } from "next/navigation";

interface InvoiceItem {
  id: string;
  name: string;
  description: string;
  price: string;
  quantity: number;
  discount: string;
  tax: string;
  totalAmount: string;
}

interface InvoiceTableProps {
  items: InvoiceItem[];
  onDelete: (id: string) => void;
}

const formatCurrency = (value: string): string => {
  const numberValue = parseFloat(value);
  return isNaN(numberValue) ? "$0.00" : `$${numberValue.toFixed(2)}`;
};

const InvoiceTable: React.FC<InvoiceTableProps> = ({ items, onDelete }) => {
  const [modalOpen, setModalOpen] = useState<Record<string, boolean>>({});
  const pathname = usePathname();

  const handleModalToggle = (id: string, event: React.MouseEvent) => {
    event.stopPropagation();
    setModalOpen((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleCloseModal = (id: string) => {
    setModalOpen((prev) => ({ ...prev, [id]: false }));
  };

  if (items.length === 0) {
    return <p className="text-center text-gray-500">No items added yet.</p>;
  }

  return (
    <div className="w-full">
      <div className="w-full overflow-x-auto">
        <div className="h-68 max-h-auto ">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr className="bg-[#F4F4F5]">
                <th className="px-6 py-4 text-left text-sm font-medium text-black whitespace-nowrap">
                  Item
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-black">
                  Description
                </th>
                <th className="px-6 py-4 text-right text-sm font-medium text-black whitespace-nowrap">
                  Unit Price
                </th>
                <th className="px-6 py-4 text-right text-sm font-medium text-black whitespace-nowrap">
                  Quantity
                </th>

                {pathname !== "/viewinvoice" && (
                  <>
                    <th className="px-6 py-4 text-right text-sm font-medium text-black whitespace-nowrap">
                      Discount
                    </th>
                    <th className="px-6 py-4 text-right text-sm font-medium text-black whitespace-nowrap">
                      Tax
                    </th>
                  </>
                )}

                <th className="px-6 py-4 text-right text-sm font-medium text-black whitespace-nowrap">
                  Amount
                </th>

                {pathname !== "/viewinvoice" && (
                  <th className="px-6 py-4 text-right text-sm font-medium w-12"></th>
                )}
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-200">
              {items.map((item) => (
                <tr key={item.id}>
                  <td className="px-6 py-4 whitespace-nowrap align-top">
                    <div className="font-medium text-gray-900">{item.name}</div>
                  </td>

                  <td className="px-6 py-4 align-top">
                    <div className="text-sm text-gray-600 w-sm sm:w-60 max-w-xl sm:max-w-xs break-words ">
                      {item.description}
                    </div>
                  </td>

                  <td className="px-6 py-4 text-right whitespace-nowrap align-top">
                    <div className="text-sm font-medium">
                      {formatCurrency(item.price)}
                    </div>
                  </td>

                  <td className="px-6 py-4 text-right whitespace-nowrap align-top">
                    <div className="text-sm">{item.quantity}</div>
                  </td>

                  {pathname !== "/viewinvoice" && (
                    <>
                      <td className="px-6 py-4 text-right whitespace-nowrap align-top">
                        <div className="text-sm">{item.discount}%</div>
                      </td>
                      <td className="px-6 py-4 text-right whitespace-nowrap align-top">
                        <div className="text-sm">{item.tax}%</div>
                      </td>
                    </>
                  )}

                  <td className="px-6 py-4 text-right whitespace-nowrap align-top">
                    <div className="text-sm font-medium">
                      {formatCurrency(item.totalAmount)}
                    </div>
                  </td>

                  {pathname !== "/viewinvoice" && (
                    <td className="px-6 py-4 text-right align-top relative">
                      <div className="relative">
                        <button
                          className="text-gray-700 hover:text-gray-400 transition-colors p-2 rounded-full hover:bg-gray-100"
                          onClick={(event) =>
                            handleModalToggle(item.id, event)
                          }
                        >
                          <SlOptionsVertical className="w-5 h-5" />
                        </button>

                        {modalOpen[item.id] && (
                          <div className="absolute top-0 right-0 mt-2 w-48 bg-white rounded-lg shadow-lg  z-50">
                            <ActionModalInvoice
                              deleteInvoice={() => {
                                onDelete(item.id);
                                handleCloseModal(item.id);
                              }}
                              duplicate={() => {
                                console.log("Duplicate logic goes here");
                                handleCloseModal(item.id);
                              }}
                              onClose={() => handleCloseModal(item.id)}
                            />
                          </div>
                        )}
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default InvoiceTable;
