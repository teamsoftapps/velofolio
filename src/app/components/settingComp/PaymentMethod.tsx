"use client"
import React, { useState } from 'react'
import AddButton from '../AddButton'
import Image from 'next/image'
import { BsFillTrashFill } from 'react-icons/bs'
import MethodCard from './MethodCard'
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
    const [paymentMethods, setPaymentMethods] =useState<PaymentMethodType[]>(methods)
    const toggleMethod = (id: number) => {
  setPaymentMethods((prevMethods) =>
    prevMethods.map((method) => ({
      ...method,
      isDefault: method.id === id, // Only the clicked one is default
    }))
  );
};
    return (
    <div className='w-full lg:w-1/2  h-96 bg-white rounded-xl p-5 border-1 border-gray-300 overflow-hidden '>
<div className='w-full items-center flex justify-between'>
<h1 className='text-xl'>Payment Methods</h1> 
<div className='w-40'>
<AddButton title="Add New" setOpenForm={() => {}} />
  </div>
</div>
<div className='mt-3 flex flex-col gap-3 h-80 overflow-y-auto pb-10'>
   {paymentMethods.map((method) => (
        <MethodCard key={method.id} method={method} toggleMethod={toggleMethod}/>
      ))}


</div>

</div>
  )
}

export default PaymentMethod