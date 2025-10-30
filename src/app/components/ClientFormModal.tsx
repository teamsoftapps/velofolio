
/** @format */
'use client';
import React, { useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import Image from 'next/image';

interface ClientFormProps {
  onSubmit: (data: any) => void;
  setOpenForm: (isOpen: boolean) => void;
  initialData?: Partial<FormData>;
}

interface FormData {
  profilePhoto?: File | null;
  name: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  leadSource: string;
  assignedTeam: string;
  eventDate: string;
  city: string;
  timezone: string;
  notes: string;
  country: string;
  status: string;
  address: string;
}

const ClientForm: React.FC<ClientFormProps> = ({
  onSubmit,
  setOpenForm,
  initialData = {},
}) => {
  const [formData, setFormData] = useState<FormData>({
    profilePhoto: null,
    name: initialData.name || '',
    firstName: initialData.firstName || '',
    lastName: initialData.lastName || '',
    email: initialData.email || '',
    phone: initialData.phone || '',
    leadSource: initialData.leadSource || '',
    assignedTeam: initialData.assignedTeam || '',
    eventDate: initialData.eventDate || '',
    city: initialData.city || '',
    timezone: initialData.timezone || '',
    notes: initialData.notes || '',
    country: initialData.country || '',
    status: initialData.status || '',
    address: initialData.address || '',
  });

  const [activeTab, setActiveTab] = useState<'Client' | 'Company'>('Client');

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData((prev) => ({
        ...prev,
        profilePhoto: e.target.files?.[0] || null,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (activeTab === 'Company') {
      handleCompanySubmit();
      return;
    }

    const finalData = {
      type: 'Client',
      name: `${formData.firstName} ${formData.lastName}`,
      event: 'Client Onboarding',
      status: 'Booked',
      eventDate: formData.eventDate,
      assignedTeam: formData.assignedTeam,
      country: formData.country,
      city: formData.city,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      leadSource: formData.leadSource,
      timezone: formData.timezone,
      notes: formData.notes,
    };

    console.log('Client Form Submitted:', finalData);
    onSubmit(finalData);
  };

  const handleCompanySubmit = () => {
    const companyData = {
      type: 'Company',
      companyName: formData.firstName,
      companyEmail: formData.email,
      companyPhone: formData.phone,
      companyAddress: formData.address,
      leadSource: formData.leadSource,
      assignedTeam: formData.assignedTeam,
      eventDate: formData.eventDate,
      country: formData.country,
      city: formData.city,
      timezone: formData.timezone,
      notes: formData.notes,
      status: formData.status,
      event: 'Company Onboarding',
    };

    console.log('Company Form Submitted:', companyData);
    onSubmit(companyData);
  };

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black/40 z-50 px-4'>
      <div className='relative bg-white p-6 sm:p-8 rounded-lg shadow-lg w-full max-w-3xl overflow-y-auto max-h-[90vh] scroller'>
        {/* Close Button */}
        <IoMdClose
          className='absolute top-4 right-4 text-2xl sm:text-3xl cursor-pointer text-gray-700'
          onClick={() => setOpenForm(false)}
        />

        <form onSubmit={handleSubmit} className='flex flex-col gap-6 w-full'>
          {/* Profile Section */}
          <div className='flex items-center gap-4'>
            <div className='w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden'>
              <Image
                width={100}
                height={100}
                alt='profile'
                className='object-cover rounded-full w-full h-full'
                src={
                  formData.profilePhoto
                    ? URL.createObjectURL(formData.profilePhoto)
                    : '/profile.svg'
                }
              />
            </div>

            <div className='text-black text-center sm:text-left'>
              <h2 className='text-xl font-semibold'>
                {activeTab === 'Company' ? 'Add New Company' : 'Add New Client'}
              </h2>
              <label
                htmlFor='profilePhoto'
                className='text-[#34C0EE] text-sm underline cursor-pointer'
              >
                Upload Profile Photo
              </label>
              <input
                type='file'
                accept='image/*'
                onChange={handleFileChange}
                className='hidden'
                id='profilePhoto'
              />
            </div>
          </div>

          {/* Tabs */}
          <div className='w-[60%] sm:w-64 flex items-center justify-between border-2 rounded-full p-0.5 relative'>
            <div
              className={`absolute top-0.5 bottom-0.5 rounded-full bg-[#01B0E9] transition-all duration-300`}
              style={{
                left: activeTab === 'Client' ? '0.5%' : '50.5%',
                width: '50%',
              }}
            ></div>

            <button
              type='button'
              onClick={() => setActiveTab('Client')}
              className={`relative z-10 px-4 py-[2px] rounded-full transition-colors duration-300 ${
                activeTab === 'Client' ? 'text-white' : 'text-gray-700'
              }`}
            >
              Client
            </button>

            <button
              type='button'
              onClick={() => setActiveTab('Company')}
              className={`relative z-10 px-4 py-[2px] rounded-full transition-colors duration-300 ${
                activeTab === 'Company' ? 'text-white' : 'text-gray-700'
              }`}
            >
              Company
            </button>
          </div>

          {/* Name Fields */}
          <div className='flex flex-col sm:flex-row gap-4'>
            <div className='flex-1'>
              <label className='block text-md font-semibold text-gray-700'>
                {activeTab === 'Company' ? 'Company Name' : 'First Name'}
              </label>
              <input
                type='text'
                name='firstName'
                value={formData.firstName}
                onChange={handleChange}
                placeholder={
                  activeTab === 'Company'
                    ? 'Enter company name'
                    : 'Enter first name'
                }
                className='mt-1 p-2 w-full border rounded-md border-gray-400 text-gray-800'
              />
            </div>

            {activeTab === 'Client' && (
              <div className='flex-1'>
                <label className='block text-md font-semibold text-gray-700'>
                  Last Name
                </label>
                <input
                  type='text'
                  name='lastName'
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder='Enter last name'
                  className='mt-1 p-2 w-full border rounded-md border-gray-400 text-gray-800'
                />
              </div>
            )}
          </div>

          {/* Email */}
          <div>
            <label className='block text-md font-semibold text-gray-700'>
              {activeTab === 'Company' ? 'Company Email' : 'Email'}
            </label>
            <input
              type='email'
              name='email'
              value={formData.email}
              onChange={handleChange}
              placeholder={
                activeTab === 'Company'
                  ? 'Enter company email'
                  : 'Enter client email'
              }
              className='mt-1 p-2 w-full border rounded-md border-gray-400 text-gray-800'
            />
          </div>

          {/* Phone */}
          <div>
            <label className='block text-md font-semibold text-gray-700'>
              {activeTab === 'Company' ? 'Company Phone' : 'Phone'}
            </label>
            <input
              type='tel'
              name='phone'
              value={formData.phone}
              onChange={handleChange}
               placeholder={
                activeTab === 'Company'
                  ? 'Enter company Phone'
                  : 'Enter client Phone'
              }
              className='mt-1 p-2 w-full border rounded-md border-gray-400 text-gray-800'
            />
          </div>

          {/* Lead Source + Assigned Team */}
          <div className='flex flex-col sm:flex-row gap-4'>
            <div className='flex-1'>
              <label className='block text-md font-semibold text-gray-700'>
                Lead Source
              </label>
              <select
                name='leadSource'
                value={formData.leadSource}
                onChange={handleChange}
                className='mt-1 p-2 w-full border rounded-md border-gray-400 text-gray-800'
              >
                <option value=''>Select lead source</option>
                <option value='Website'>Website</option>
                <option value='Referral'>Referral</option>
                <option value='Social Media'>Social Media</option>
                <option value='Other'>Other</option>
              </select>
            </div>

            <div className='flex-1'>
              <label className='block text-md font-semibold text-gray-700'>
                Assigned Team
              </label>
              <select
                name='assignedTeam'
                value={formData.assignedTeam}
                onChange={handleChange}
                className='mt-1 p-2 w-full border rounded-md border-gray-400 text-gray-800'
              >
                <option value=''>Select assigned team</option>
                <option value='Team A'>Team A</option>
                <option value='Team B'>Team B</option>
                <option value='Team C'>Team C</option>
              </select>
            </div>
          </div>

          {/* Event Date + Status */}
          <div className='flex flex-col sm:flex-row gap-4'>
            <div className='flex-1'>
              <label className='block text-md font-semibold text-gray-700'>
                Event Date
              </label>
              <input
                type='date'
                name='eventDate'
                value={formData.eventDate}
                onChange={handleChange}
                className='mt-1 p-2 w-full border rounded-md border-gray-400 text-gray-800'
              />
            </div>

            <div className='flex-1'>
              <label className='block text-md font-semibold text-gray-700'>
                Status
              </label>
              <input
                type='text'
                name='status'
                value={formData.status}
                onChange={handleChange}
                placeholder='Enter status'
                className='mt-1 p-2 w-full border rounded-md border-gray-400 text-gray-800'
              />
            </div>
          </div>

          {/* Address */}
          <div>
            <label className='block text-md font-semibold text-gray-700'>
              {activeTab === 'Company' ? 'Company Address' : 'Address'}
            </label>
            <input
              type='text'
              name='address'
              value={formData.address}
              onChange={handleChange}
              placeholder='Enter address'
              className='mt-1 p-2 w-full border rounded-md border-gray-400 text-gray-800'
            />
          </div>

          {/* Country + City */}
          <div className='flex flex-col sm:flex-row gap-4'>
            <div className='flex-1'>
              <label className='block text-md font-semibold text-gray-700'>
                Country
              </label>
              <input
                type='text'
                name='country'
                value={formData.country}
                onChange={handleChange}
                placeholder='Enter country'
                className='mt-1 p-2 w-full border rounded-md border-gray-400 text-gray-800'
              />
            </div>

            <div className='flex-1'>
              <label className='block text-md font-semibold text-gray-700'>
                City
              </label>
              <input
                type='text'
                name='city'
                value={formData.city}
                onChange={handleChange}
                placeholder='Enter city'
                className='mt-1 p-2 w-full border rounded-md border-gray-400 text-gray-800'
              />
            </div>
          </div>

          {/* Timezone */}
          <div>
            <label className='block text-md font-semibold text-gray-700'>
              Timezone
            </label>
            <input
              type='text'
              name='timezone'
              value={formData.timezone}
              onChange={handleChange}
              placeholder='Enter timezone e.g. GMT+5'
              className='mt-1 p-2 w-full border rounded-md border-gray-400 text-gray-800'
            />
          </div>

          {/* Notes */}
          <div>
            <label className='block text-md font-semibold text-gray-700'>
              Notes
            </label>
            <textarea
              name='notes'
              value={formData.notes}
              onChange={handleChange}
              placeholder='Enter any additional notes'
              rows={3}
              className='mt-1 p-2 w-full border rounded-md border-gray-400 text-gray-800 resize-none'
            />
          </div>

          {/* Buttons */}
          <div className='w-full flex items-center gap-4'>
            <button
              type='submit'
              className='w-40 bg-[#01B0E9] text-white p-2 rounded-full cursor-pointer'
            >
              {activeTab === 'Company' ? 'Add Company' : 'Add Client'}
            </button>
            <button
              type='button'
              onClick={() => setOpenForm(false)}
              className='w-40 text-black p-2 border border-gray-400 rounded-full cursor-pointer'
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ClientForm;
