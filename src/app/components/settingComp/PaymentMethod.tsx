"use client"
import React, { useState } from 'react'
import AddButton from '@/app/components/ui/AddButton'
import Image from 'next/image'
import { BsFillTrashFill } from 'react-icons/bs'
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
  ]

  const PaymentMethod = () => {
    const [paymentMethods, setPaymentMethods] = useState<PaymentMethodType[]>(methods)
    const [isModalOpen, setIsModalOpen] = useState(false);
const toggleMethod = (id: number) => {
  setPaymentMethods((prev) => {
    
    const clickedMethod = prev.find((m) => m.id === id);
    if (!clickedMethod) return prev;

    
    const updatedClicked = { ...clickedMethod, isDefault: true };

    
    const others = prev
      .filter((m) => m.id !== id)
      .map((m) => ({ ...m, isDefault: false }));

    // Return: clicked method first, then others
    return [updatedClicked, ...others];
  });
};

const deleteMethod = (id: number) => {
  setPaymentMethods((prev) => prev.filter((m) => m.id !== id));
};
    return (
    <div className='w-full lg:w-1/2  h-96 bg-white rounded-xl p-5 border-1 border-gray-300 overflow-hidden '>
<div className='w-full items-center flex justify-between'>
<h1 className='text-xl'>Payment Methods</h1> 
<div className='w-40'>
<AddButton title="Add New" setOpenForm={() => setIsModalOpen(true)} />
  </div>
</div>
<div className='mt-3 flex flex-col gap-3 h-80 overflow-y-auto pb-10'>
    {paymentMethods.length > 0 ? (
      paymentMethods.map((method) => (
        <MethodCard key={method.id} method={method} toggleMethod={toggleMethod} deleteMethod={deleteMethod}/>
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

</div>
  )
}

export default PaymentMethod