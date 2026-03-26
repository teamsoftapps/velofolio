
import React, { useState } from 'react'
import AddButton from '../AddButton'
import { InfoIcon } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import InvoiceTable from './InvoiceTable'
import InvoicePriceData from './InvoicePriceData'
import SplitInvoicePayment from './SplitInvoicePayment'
import PremiumPortraitPackage from '../PremiumPortraitPackage'
import { useDispatch, useSelector } from 'react-redux'
import { setInvoices, setQuotes } from '@/store/slices/invoiceSlice'
import { toast } from 'react-toastify';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
} from '@dnd-kit/sortable';

const ProductsPackage = ({ id, setOpenForm, type = "Invoice", packages = [], setPackages, generatedId, invoiceDate, onEditItem }: any) => {
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const clientId = Number(searchParams.get("clientId") || searchParams.get("id"));

  const invoiceId = String(searchParams.get("InvoiceId"));
  const invoices = useSelector((state: any) => state.persisted.invoiceandQuote.invoices);
  const quotes = useSelector((state: any) => state.persisted.invoiceandQuote.quotes);
  const router = useRouter();
  const packagesData = [
    {
      id: 1,
      title: "Premium Portrait Package",
      price: 1999,
      description:
        "A deluxe package created for families wanting timeless wall art and keepsake prints.",
      features: [
        "1.5-hour outdoor or studio session",
        "All best photos (40+ fully edited)",
        '2x Medium 16" x 24" canvases',
        '10x 5" x 7" premium matte prints',
        "Custom USB with all images",
      ],
      recommended: false,
      amount: 1999,
      taxLabel: "No Tax",
    },

    {
      id: 2,
      title: "Family Golden Package",
      price: 1299,
      description:
        "Perfect for small families wanting beautifully curated images for albums and frames.",
      features: [
        "1-hour outdoor or studio session",
        "25 fully edited photos",
        '1x Large 24" x 36" canvas',
        '5x 8" x 10" premium prints',
        "Online gallery for downloads",
      ],
      recommended: false,
      amount: 1299,
      taxLabel: "No Tax",
    },

    {
      id: 3,
      title: "Essential Portrait Package",
      price: 799,
      description:
        "A simple and affordable package for individuals or couples wanting memorable photos.",
      features: [
        "45-minute outdoor session",
        "15 edited photos",
        '1x Medium 18" x 24" print',
        "Online gallery for viewing",
        "Fast 3-day delivery",
      ],
      recommended: false,
      amount: 799,
      taxLabel: "No Tax",
    },
  ];
  const [availablePackages, setAvailablePackages] = useState<any[]>(packagesData);


  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = packages.findIndex((p: any) => p.id === active.id);
      const newIndex = packages.findIndex((p: any) => p.id === over.id);

      setPackages(arrayMove(packages, oldIndex, newIndex));
    }
  };

  const handleToggleRecommended = (id: any) => {
    const updated = packages.map((pkg: any) => ({
      ...pkg,
      recommended: pkg.id === id ? !pkg.recommended : false
    }));
    setPackages(updated);
  };

  const handleToggleSuggestedRecommended = (id: any) => {
    const updated = availablePackages.map((pkg: any) => ({
      ...pkg,
      recommended: pkg.id === id ? !pkg.recommended : false
    }));
    setAvailablePackages(updated);
  };

  const examplePayments = [
    {
      id: 1,
      dueDate: "Dec 1, 2025",
      status: "UNPAID",
      percentage: "100% of order",
      amount: "$4999.00",
    },
  ];
  const deleteItem = (itemId: any) => {
    const updated = packages.filter((pkg: any) => pkg.id !== itemId);
    setPackages(updated);
  };

  const handleRecommended = (itemId: any) => {
    setPackages(packages.map((pkg: any) => ({
      ...pkg,
      recommended: pkg.id === itemId ? !pkg.recommended : false
    })));
  };

  const duplicateItem = (itemId: any) => {
    const itemToDuplicate = packages.find((pkg: any) => pkg.id === itemId);
    if (itemToDuplicate) {
      const newItem = {
        ...itemToDuplicate,
        id: Math.random().toString(36).substring(2, 9)
      };
      setPackages([...packages, newItem]);
    }
  };
  // const totalDue=invoices.reduce((total:any,invoice:any) => total + invoice.amount, 0)  
  const totalDue = "4999.00"
  const [splitType, setSplitType] = useState("none");

  const calculatePayments = (total: number) => {
    if (splitType === "50-50") {
      const half = (total / 2).toFixed(2);
      return [
        { id: 1, dueDate: "Upon Signing", status: "UNPAID", percentage: "50%", amount: half },
        { id: 2, dueDate: "On Event Date", status: "UNPAID", percentage: "50%", amount: half },
      ];
    } else if (splitType === "30-70") {
      return [
        { id: 1, dueDate: "Deposit (30%)", status: "UNPAID", percentage: "30%", amount: (total * 0.3).toFixed(2) },
        { id: 2, dueDate: "Remainder (70%)", status: "UNPAID", percentage: "70%", amount: (total * 0.7).toFixed(2) },
      ];
    }
    return [
      { id: 1, dueDate: "Upon Signing", status: "UNPAID", percentage: "100%", amount: total.toFixed(2) },
    ];
  };

  const totalAmountNum = packages.reduce((sum: any, pkg: any) => sum + parseFloat(pkg.totalAmount || 0), 0);
  const currentPayments = calculatePayments(totalAmountNum);
  const handleSaveItem = () => {
    if (!packages || packages.length === 0) return toast.warning("Add at least one package");

    const savedDate = invoiceDate
      ? new Date(invoiceDate).toISOString()
      : new Date().toISOString();

    const item = {
      id: generatedId || Math.random().toString(36).substring(2, 9).toUpperCase(),
      clientId: id,
      packages: packages,
      totalAmount: totalAmountNum,
      splitType: splitType,
      payments: currentPayments,
      createdAt: savedDate,
    };

    if (type === "Invoice") {
      const exists = invoices.some((inv: any) => inv.id === item.id);
      if (exists) {
        dispatch(setInvoices(invoices.map((inv: any) => inv.id === item.id ? item : inv)));
        toast.success("Invoice updated");
      } else {
        dispatch(setInvoices([...invoices, item]));
        toast.success("Invoice created");
      }
      router.push(`/viewInvoice?InvoiceId=${item.id}&clientId=${id}`);
    } else {
      const exists = quotes.some((q: any) => q.id === item.id);
      if (exists) {
        dispatch(setQuotes(quotes.map((q: any) => q.id === item.id ? item : q)));
        toast.success("Quote updated");
      } else {
        dispatch(setQuotes([...quotes, item]));
        toast.success("Quote created");
      }
      router.push(`/viewQuote?QuoteId=${item.id}&clientId=${id}`);
    }
  };
  return (
    <div className='flex flex-col gap-4 text-black pt-4 my-3 px-4 sm:px-6 lg:px-0'>

      {/* Header */}
      <div>
        <h1 className='text-2xl mb-2'>Products & Packages</h1>
        <h3 className='text-gray-500 text-sm'>Add products and packages to this {type}.</h3>
      </div>

      {/* Empty State */}

      {packages?.length === 0 ? (
        <div className='w-full rounded-lg bg-[#EDEDED] border-2 border-[#978F8F] h-80 flex flex-col items-center justify-center text-center px-4'>
          <div className='flex items-center justify-center flex-col gap-2'>
            <h1 className='text-xl font-semibold'>Start Adding Items to your {type}</h1>
            <p className='w-full sm:w-2/3 text-center text-sm'>
              You currently don’t have any product or package added to your {type}. Click the button below to start adding them.
            </p>
            <div className='w-full sm:w-60 mt-4'>
              <AddButton title='Add Products & Packages' setOpenForm={setOpenForm} />
            </div>
          </div>
        </div>
      ) : (
        <div className='w-full'>
          {type === "Quote" ? (
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={packages.map((p: any) => p.id)}
                strategy={rectSortingStrategy}
              >
                <div className='flex flex-wrap gap-6 p-4'>
                  {packages.map((pkg: any, index: number) => (
                    <PremiumPortraitPackage
                      id={pkg.id}
                      key={pkg.id || index}
                      title={pkg.name}
                      price={parseFloat(pkg.price)}
                      amount={parseFloat(pkg.totalAmount)}
                      description={pkg.description}
                      features={[]} // Added items from modal might not have structured features
                      taxLabel={pkg.tax > 0 ? `${pkg.tax}% Tax` : "No Tax"}
                      recommended={pkg.recommended}
                      handleRecommended={() => handleToggleRecommended(pkg.id)}
                      onDelete={() => deleteItem(pkg.id)}
                      onDuplicate={() => duplicateItem(pkg.id)}
                      onEdit={() => onEditItem?.(pkg.id)}
                    />
                  ))}
                </div>
              </SortableContext>
            </DndContext>
          ) : (
            <div className={`w-full rounded-lg bg-white border-2 border-[#978F8F] text-center lg:p-4 lg:px-12 overflow-y-scroll scroller`}>
              <InvoiceTable items={packages} onDelete={deleteItem} onDuplicate={duplicateItem} onEdit={onEditItem} />
            </div>
          )}

          {/* Show available packages suggestion only for Quotes when table is small or to add more */}
          {type === "Quote" && (
            <div className='mt-8'>
              <h4 className='text-left mb-4 font-semibold'>Suggested Packages</h4>
              <div className='flex items-center justify-between sm:justify-start gap-2 w-full scroller p-2 pt-5'>
                {availablePackages.map((pkg, index) => (
                  <PremiumPortraitPackage
                    id={pkg.id}
                    key={index}
                    title={pkg.title}
                    price={pkg.price}
                    description={pkg.description}
                    recommended={pkg.recommended}
                    features={pkg.features}
                    handleRecommended={() => handleToggleSuggestedRecommended(pkg.id)}
                  />
                ))}
              </div>
            </div>
          )}

          <div className='flex flex-col gap-3 sm:flex-row justify-between'>
            <div className='w-full sm:w-60 mt-4'>
              <AddButton title='Add Products & Packages' setOpenForm={setOpenForm} />
            </div>
            <InvoicePriceData invoices={packages} />
          </div>
        </div>
      )}

      {/* Payment Schedule Card */}
      <div className="w-full rounded-lg sm:p-6 space-y-6">
        {/* Header + Totals */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-start gap-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Payment Schedule</h3>
            <p className="text-sm text-gray-500 mt-1">Assign a payment schedule to this {type}.</p>
          </div>

          {packages?.length === 0 && <InvoicePriceData invoices={invoices} totalDue={totalAmountNum.toString()} />}
        </div>

        {/* Dropdown + Total */}
        <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
          <div className="w-full sm:w-2/5">
            <select
              value={splitType}
              onChange={(e) => setSplitType(e.target.value)}
              className="w-full px-5 py-3 border border-gray-300 rounded-lg text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
            >
              <option value="none">No split payments</option>
              <option value="50-50">50% Deposit / 50% Final Payment</option>
              <option value="30-70">30% Deposit / 70% Final Payment</option>
            </select>
          </div>

          {totalAmountNum === 0 && (
            <div className="flex justify-between gap-3 border-t sm:border-t-0 border-gray-200 pt-2 sm:pt-0 w-full sm:w-auto">
              <span className="text-lg font-semibold text-gray-900">Total Due</span>
              <span className="text-lg font-semibold text-gray-900">$0.00</span>
            </div>
          )}
        </div>

        {/* Info Alert */}
        {totalAmountNum === 0 ? (
          <div className="bg-cyan-50 rounded-4xl border border-cyan-200 text-cyan-800 w-full px-4 py-3 flex items-start gap-3">
            <InfoIcon className="w-5 h-5 text-cyan-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm">
              A payment schedule cannot be calculated because the total amount due is $0.00.
            </p>
          </div>
        ) : (
          <SplitInvoicePayment payments={currentPayments} totalDue={totalAmountNum.toFixed(2)} />
        )}

        <hr className='text-gray-300' />
        {type === "Quote" && <>
          <div className='p-3 '>


            <div className="flex items-center gap-3">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border border-gray-400 cursor-pointer bg-gray-200 checked:bg-[#01B0E9] checked:border-[#01B0E9]
                 appearance-none relative
                  before:absolute before:inset-0 before:flex before:items-center before:justify-center 
                 before:opacity-0 before:text-white before:text-sm before:content-['✔'] checked:before:opacity-100"
                />
                <span className="ml-2">Automatically generate an invoice once the quote is accepted.</span>
              </label>
            </div>


            <div className='flex items-center gap-3'>
              <input
                type="checkbox"
                className="w-4 h-4 rounded border border-gray-400 cursor-pointer bg-gray-200 checked:bg-[#01B0E9] checked:border-[#01B0E9]
                 appearance-none relative
                  before:absolute before:inset-0 before:flex before:items-center before:justify-center 
                 before:opacity-0 before:text-white before:text-sm before:content-['✔'] checked:before:opacity-100"
              />
              <p> Show in Client Portal</p>
            </div>

          </div>

          <hr className='text-gray-300' />
        </>}
        {/* Buttons */}
        <div className='flex flex-col sm:flex-row sm:items-center sm:gap-4 lg:w-2/3'>
          <button className='w-full sm:w-40 bg-[#01B0E9] text-white py-3 rounded-full mb-2 sm:mb-0' onClick={handleSaveItem}>Save {type}</button>
          <button
            onClick={() => router.push(`/jobProfile?id=${id}`)}
            className='w-full sm:w-32 border border-gray-400 text-black py-3 rounded-full'
          >
            Cancel
          </button>
        </div>

      </div>
    </div>
  )
}

export default ProductsPackage
