'use client';

import React, { useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { FaCreditCard, FaUser, FaCalendarAlt, FaLock } from 'react-icons/fa';
import { toast } from 'react-toastify';

interface AddPaymentMethodModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (data: any) => void;
  existingMethods: any[];
}

const AddPaymentMethodModal: React.FC<AddPaymentMethodModalProps> = ({ isOpen, onClose, onAdd, existingMethods }) => {
  const [formData, setFormData] = useState({
    cardName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });

  const getCardBrand = (number: string) => {
    if (number.startsWith('4')) return 'Visa';
    if (/^5[1-5]/.test(number)) return 'Mastercard';
    if (/^3[47]/.test(number)) return 'American Express';
    return 'Unknown';
  };

  const brand = getCardBrand(formData.cardNumber);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic Expiry Validation
    const [month, year] = formData.expiryDate.split('/').map(Number);
    const now = new Date();
    const currentMonth = now.getMonth() + 1;
    const currentYear = Number(now.getFullYear().toString().slice(-2));

    if (!month || month < 1 || month > 12) {
      toast.warning('Please enter a valid month (01-12)');
      return;
    }

    if (year < currentYear || (year === currentYear && month < currentMonth)) {
      toast.warning('Card has expired');
      return;
    }

    const isDuplicate = existingMethods.some(m => m.last4 === formData.cardNumber.slice(-4));
    if (isDuplicate) {
      toast.error('This card is already added');
      return;
    }

    onAdd(formData);
    setFormData({
      cardName: '',
      cardNumber: '',
      expiryDate: '',
      cvv: '',
    });
    onClose();
  };

  const formatCardNumber = (value: string) => {
    return value.replace(/\W/gi, '').replace(/(.{4})/g, '$1 ').trim();
  };

  const formatExpiry = (value: string) => {
    let cleanValue = value.replace(/\D/g, '');

    // Restrict month to 01-12
    if (cleanValue.length >= 2) {
      const month = parseInt(cleanValue.substring(0, 2), 10);
      if (month > 12) {
        cleanValue = '12' + cleanValue.substring(2);
      } else if (month === 0) {
        cleanValue = '01' + cleanValue.substring(2);
      }
    }

    if (cleanValue.length <= 2) return cleanValue;
    return `${cleanValue.substring(0, 2)}/${cleanValue.substring(2, 4)}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div
        className="bg-white w-full max-w-md rounded-2xl mt-16 shadow-2xl overflow-hidden transform transition-all animate-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[var(--primary-color)] to-[#0084af] p-5 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 hover:bg-white/20 rounded-full transition-colors"
          >
            <IoClose className="w-6 h-6" />
          </button>
          <h2 className="text-2xl font-bold">Add Payment Method</h2>
          <p className="text-white/80 text-sm mt-0.5">Enter your card details securely</p>
        </div>

        {/* Card Preview (Visual enhancement) */}
        <div className="px-6 pt-5 -mb-9 relative z-10">
          <div className="bg-gradient-to-br from-gray-900 to-gray-700 rounded-xl p-6 text-white shadow-xl h-40 flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <div className="flex flex-col">
                <FaCreditCard className="w-9 h-9 text-white/50" />
                {brand !== 'Unknown' && (
                  <span className="text-[10px] font-bold tracking-widest mt-1 opacity-80">{brand.toUpperCase()}</span>
                )}
              </div>
              <div className="w-11 h-7 bg-yellow-400/80 rounded-md"></div>
            </div>
            <div>
              <p className="text-lg tracking-[0.2em] font-mono mb-1.5">
                {formData.cardNumber ? formatCardNumber(formData.cardNumber) : '•••• •••• •••• ••••'}
              </p>
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-[10px] uppercase text-white/50">Card Holder</p>
                  <p className="text-sm font-medium uppercase tracking-wider">
                    {formData.cardName || 'YOUR NAME'}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] uppercase text-white/50">Expires</p>
                  <p className="text-sm font-medium">
                    {formData.expiryDate || 'MM/YY'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 pt-14 bg-gray-50/50">
          <div className="space-y-4">
            {/* Cardholder Name */}
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider ml-1 mb-1 block">
                Cardholder Name
              </label>
              <div className="relative">
                <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  required
                  placeholder="Full Name"
                  maxLength={23}
                  className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent outline-none transition-all text-gray-800 font-medium"
                  value={formData.cardName}
                  onChange={(e) => setFormData({ ...formData, cardName: e.target.value })}
                />
              </div>
            </div>

            {/* Card Number */}
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider ml-1 mb-1 block">
                Card Number
              </label>
              <div className="relative">
                <FaCreditCard className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  required
                  placeholder="0000 0000 0000 0000"
                  maxLength={19}
                  className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent outline-none transition-all text-gray-800 font-medium"
                  value={formatCardNumber(formData.cardNumber)}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, '').substring(0, 16);
                    setFormData({ ...formData, cardNumber: val });
                  }}
                />
              </div>
            </div>

            {/* Expiry and CVV */}
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider ml-1 mb-1 block">
                  Expiry Date
                </label>
                <div className="relative">
                  <FaCalendarAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    required
                    placeholder="MM/YY"
                    maxLength={5}
                    className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent outline-none transition-all text-gray-800 font-medium"
                    value={formData.expiryDate}
                    onChange={(e) => setFormData({ ...formData, expiryDate: formatExpiry(e.target.value) })}
                  />
                </div>
              </div>
              <div className="flex-1">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider ml-1 mb-1 block">
                  CVV
                </label>
                <div className="relative">
                  <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="password"
                    required
                    placeholder="***"
                    maxLength={3}
                    className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent outline-none transition-all text-gray-800 font-medium"
                    value={formData.cvv}
                    onChange={(e) => setFormData({ ...formData, cvv: e.target.value.replace(/\D/g, '') })}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 px-4 rounded-lg border border-gray-200 text-gray-600 font-bold hover:bg-gray-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-[2] py-3 px-4 rounded-lg bg-[var(--primary-color)] text-white font-bold hover:bg-[#009bc9] shadow-lg shadow-blue-500/20 transition-all active:scale-[0.98]"
            >
              Add Card
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPaymentMethodModal;
