/** @format */
'use client';
import React, { useState } from 'react';
import { FaCalendarAlt } from 'react-icons/fa';
import Image from 'next/image';
import { IoMdClose } from 'react-icons/io';

interface ClientFormProps {
  onSubmit: (data: FormData) => void;
  initialData?: Partial<FormData>;
  setOpenForm: (isOpen: boolean) => void;
}

interface FormData {
  profilePhoto?: File | null;
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
}

const ClientForm: React.FC<ClientFormProps> = ({
  onSubmit,
  setOpenForm,
  initialData = {},
}) => {
  const [formData, setFormData] = React.useState<FormData>({
    profilePhoto: null,
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
  });

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
    console.log('Client Form submitted:', formData);
    onSubmit(formData);
    setFormData({
      profilePhoto: null,
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      leadSource: '',
      assignedTeam: '',
      eventDate: '',
      city: '',
      timezone: '',
      notes: '',
    });
  };

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black/40 z-50 px-4'>
      <div className='relative bg-white p-6 sm:p-8 rounded-lg shadow-lg w-full max-w-3xl overflow-y-auto max-h-[90vh] scroller'>
        {/* Close Button */}
        <IoMdClose
          className='absolute top-4 right-4 text-2xl sm:text-3xl cursor-pointer text-gray-700'
          onClick={() => setOpenForm(false)}
        />

        <form
          onSubmit={handleSubmit}
          className='flex flex-col gap-6 w-full'>
          {/* Profile Section */}
          <div className='flex   items-center  gap-4'>
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
              <h2 className='text-xl sm:text-xl font-semibold'>
                Add New Client
              </h2>
              <label
                htmlFor='profilePhoto'
                className='text-[#34C0EE] text-sm sm:text-md underline cursor-pointer'>
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

          {/* First & Last Name */}
          <div className='flex flex-col sm:flex-row gap-4'>
            <div className='flex-1'>
              <label className='block text-md font-semibold sm:text-md  text-gray-700'>
                First Name
              </label>
              <input
                type='text'
                name='firstName'
                value={formData.firstName}
                onChange={handleChange}
                placeholder='Enter first name'
                className='mt-1 p-2 w-full border rounded-md border-gray-400 text-gray-800'
              />
            </div>
            <div className='flex-1'>
              <label className='block text-md font-semibold sm:text-md  text-gray-700'>
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
          </div>

          {/* Email */}
          <div>
            <label className='block text-md font-semibold sm:text-md  text-gray-700'>
              Email
            </label>
            <input
              type='email'
              name='email'
              value={formData.email}
              onChange={handleChange}
              placeholder='Enter client email e.g. info@client.com'
              className='mt-1 p-2 w-full border rounded-md border-gray-400 text-gray-800'
            />
          </div>

          {/* Phone */}
          <div>
            <label className='block text-md font-semibold sm:text-md  text-gray-700'>
              Phone
            </label>
            <input
              type='tel'
              name='phone'
              value={formData.phone}
              onChange={handleChange}
              placeholder='Enter contact number e.g. +123 456 7890'
              className='mt-1 p-2 w-full border rounded-md border-gray-400 text-gray-800'
            />
          </div>

          {/* Lead Source & Assigned Team */}
          <div className='flex flex-col sm:flex-row gap-4'>
            <div className='flex-1'>
              <label className='block text-md font-semibold sm:text-md  text-gray-700'>
                Lead Source
              </label>
              <select
                name='leadSource'
                value={formData.leadSource}
                onChange={handleChange}
                className='mt-1 p-2 w-full border rounded-md border-gray-400 text-gray-800'>
                <option value=''>Select lead source</option>
                <option value='Website'>Website</option>
                <option value='Referral'>Referral</option>
                <option value='Social Media'>Social Media</option>
                <option value='Other'>Other</option>
              </select>
            </div>

            <div className='flex-1'>
              <label className='block text-md font-semibold sm:text-md  text-gray-700'>
                Assigned Team
              </label>
              <select
                name='assignedTeam'
                value={formData.assignedTeam}
                onChange={handleChange}
                className='mt-1 p-2 w-full border rounded-md border-gray-400 text-gray-800'>
                <option value=''>Select assigned team</option>
                <option value='Team A'>Team A</option>
                <option value='Team B'>Team B</option>
                <option value='Team C'>Team C</option>
              </select>
            </div>
          </div>

          {/* Event Date & City */}
          <div className='flex flex-col sm:flex-row gap-4'>
            <div className='flex-1 relative'>
              <label className='block text-md font-semibold sm:text-md  text-gray-700'>
                Event Date
              </label>
              <input
                type='date'
                name='eventDate'
                value={formData.eventDate}
                onChange={handleChange}
                className='mt-1 p-2 w-full border rounded-md border-gray-400 text-gray-800'
              />
              <FaCalendarAlt className='absolute right-3 top-9 text-gray-400' />
            </div>

            <div className='flex-1'>
              <label className='block text-md font-semibold sm:text-md  text-gray-700'>
                City
              </label>
              <input
                type='text'
                name='city'
                value={formData.city}
                onChange={handleChange}
                placeholder='Enter city name'
                className='mt-1 p-2 w-full border rounded-md border-gray-400 text-gray-800'
              />
            </div>
          </div>

          {/* Timezone */}
          <div>
            <label className='block text-md font-semibold sm:text-md  text-gray-700'>
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
            <label className='block text-md font-semibold sm:text-md  text-gray-700'>
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

          {/* Submit */}
          <div className='w-full flex items-center gap-4'>
            <button
              type='submit'
              className='w-40 bg-[#01B0E9] text-white p-2  rounded-full cursor-pointer'>
              Add Client
            </button>
            <button
              type='submit'
              onClick={() => setOpenForm(false)}
              className='w-40  text-black p-2 border-1  border-gray-400 rounded-full cursor-pointer '>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ClientForm;
