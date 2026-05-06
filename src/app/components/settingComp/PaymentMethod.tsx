"use client"
import React, { useState } from 'react'
import AddButton from '@/app/components/ui/AddButton'
import Image from 'next/image'
import MethodCard from './MethodCard'
import AddPaymentMethodModal from '@/app/components/forms/AddPaymentMethodModal'

interface PaymentMethodType {
  id: number;
  brand: string;
  image: string;
  last4: string;
  expiry: string;
  isDefault: boolean;
}

const methods: PaymentMethodType[] = [
  {
    id: 1,
    brand: "Visa",
    image: "/visa.png",
    last4: "7689",
    expiry: "11/25",
    isDefault: true,
  },
  {
    id: 2,
    brand: "Mastercard",
    image: "/master.png",
    last4: "3921",
    expiry: "08/27",
    isDefault: false,
  },
  {
    id: 3,
    brand: "American Express",
    image: "/master.png",
    last4: "5562",
    expiry: "03/26",
    isDefault: false,
  },
];

const PaymentMethod = () => {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethodType[]>(methods);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pendingDefaultId, setPendingDefaultId] = useState<number | null>(null);
  const [pendingDeleteId, setPendingDeleteId] = useState<number | null>(null);

  const toggleMethod = (id: number) => {
    setPaymentMethods((prev) => {
      const clickedMethod = prev.find((m) => m.id === id);
      if (!clickedMethod) return prev;
      const updatedClicked = { ...clickedMethod, isDefault: true };
      const others = prev
        .filter((m) => m.id !== id)
        .map((m) => ({ ...m, isDefault: false }));
      return [updatedClicked, ...others];
    });
  };

  const deleteMethod = (id: number) => {
    setPaymentMethods((prev) => prev.filter((m) => m.id !== id));
  };

  const pendingCard = paymentMethods.find((m) => m.id === pendingDefaultId);
  const pendingDeleteCard = paymentMethods.find((m) => m.id === pendingDeleteId);

  const handleConfirmDelete = () => {
    if (pendingDeleteId !== null) {
      deleteMethod(pendingDeleteId);
      setPendingDeleteId(null);
    }
  };

  const handleConfirmDefault = () => {
    if (pendingDefaultId !== null) {
      toggleMethod(pendingDefaultId);
      setPendingDefaultId(null);
    }
  };

  return (
    <div className='w-full lg:w-1/2 h-96 bg-white rounded-xl p-5 border-[1px] border-gray-300 overflow-hidden'>
      <div className='w-full items-center flex justify-between'>
        <h1 className='text-xl'>Payment Methods</h1>
        <div className='w-40'>
          <AddButton title="Add New" setOpenForm={() => setIsModalOpen(true)} />
        </div>
      </div>

      <div className='mt-3 flex flex-col gap-3 h-80 overflow-y-auto pb-10'>
        {paymentMethods.length > 0 ? (
          paymentMethods.map((method) => (
            <MethodCard
              key={method.id}
              method={method}
              toggleMethod={(id) => setPendingDefaultId(id)}
              deleteMethod={(id) => setPendingDeleteId(id)}
            />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center p-6 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Image src="/images/creditcard.png" alt="No cards" width={32} height={32} className="opacity-30" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800">No Payment Methods</h3>
            <p className="text-sm text-gray-500 mt-1 max-w-[200px]">
              Add a credit or debit card to manage your billing securely.
            </p>
          </div>
        )}
      </div>

      <AddPaymentMethodModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        existingMethods={paymentMethods}
        onAdd={(data) => {
          const newMethod: PaymentMethodType = {
            id: Date.now(),
            brand: data.cardNumber.startsWith('4') ? 'Visa' : 'Mastercard',
            image: data.cardNumber.startsWith('4') ? '/visa.png' : '/master.png',
            last4: data.cardNumber.slice(-4),
            expiry: data.expiryDate,
            isDefault: false,
          };
          setPaymentMethods((prev) => [...prev, newMethod]);
          setIsModalOpen(false);
        }}
      />

      {/* ── Set Default Confirmation Modal ───────────────────────── */}
      {pendingDefaultId !== null && pendingCard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setPendingDefaultId(null)}
          />

          {/* Modal */}
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 flex flex-col gap-4">
            {/* Brand icon */}
            <div className="flex items-center justify-center w-14 h-14 rounded-full bg-[#E0F6FD] mx-auto">
              <Image
                src={pendingCard.image}
                alt={pendingCard.brand}
                width={36}
                height={36}
                className="object-contain"
              />
            </div>

            {/* Title & description */}
            <div className="text-center">
              <h2 className="text-[18px] font-semibold text-gray-900">Set as Default?</h2>
              <p className="text-sm text-gray-500 mt-1 leading-relaxed">
                Are you sure you want to set your{' '}
                <span className="font-semibold text-gray-800">
                  {pendingCard.brand} ···· {pendingCard.last4}
                </span>{' '}
                as your default payment method?
              </p>
            </div>

            {/* Card preview */}
            <div className="flex items-center gap-3 bg-[#F4F4F5] rounded-xl px-4 py-3 border border-gray-200">
              <Image
                src={pendingCard.image}
                alt={pendingCard.brand}
                width={40}
                height={40}
                className="object-contain"
              />
              <div>
                <p className="text-sm font-semibold text-gray-800">
                  {pendingCard.brand} ending in {pendingCard.last4}
                </p>
                <p className="text-xs text-gray-500">Expires {pendingCard.expiry}</p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 mt-1">
              <button
                onClick={() => setPendingDefaultId(null)}
                className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDefault}
                className="flex-1 py-2.5 rounded-xl bg-[var(--primary-color)] text-white text-sm font-semibold hover:bg-[#0099cc] transition-colors cursor-pointer shadow-sm"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Delete Confirmation Modal ─────────────────────────────── */}
      {pendingDeleteId !== null && pendingDeleteCard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setPendingDeleteId(null)}
          />

          {/* Modal */}
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 flex flex-col gap-4">
            {/* Warning icon */}
            <div className="flex items-center justify-center w-14 h-14 rounded-full bg-red-50 mx-auto">
              <svg className="w-7 h-7 text-red-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </div>

            {/* Title & description */}
            <div className="text-center">
              <h2 className="text-[18px] font-semibold text-gray-900">Remove Card?</h2>
              <p className="text-sm text-gray-500 mt-1 leading-relaxed">
                Are you sure you want to remove your{' '}
                <span className="font-semibold text-gray-800">
                  {pendingDeleteCard.brand} ···· {pendingDeleteCard.last4}
                </span>?
                {' '}This action cannot be undone.
              </p>
            </div>

            {/* Card preview */}
            <div className="flex items-center gap-3 bg-red-50 rounded-xl px-4 py-3 border border-red-100">
              <Image
                src={pendingDeleteCard.image}
                alt={pendingDeleteCard.brand}
                width={40}
                height={40}
                className="object-contain"
              />
              <div>
                <p className="text-sm font-semibold text-gray-800">
                  {pendingDeleteCard.brand} ending in {pendingDeleteCard.last4}
                </p>
                <p className="text-xs text-gray-500">Expires {pendingDeleteCard.expiry}</p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 mt-1">
              <button
                onClick={() => setPendingDeleteId(null)}
                className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="flex-1 py-2.5 rounded-xl bg-red-500 text-white text-sm font-semibold hover:bg-red-600 transition-colors cursor-pointer shadow-sm"
              >
                Remove Card
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PaymentMethod
