/** @format */

import React from 'react';
import { FaCalendarAlt } from 'react-icons/fa';
import Image from 'next/image';
import { IoMdClose } from 'react-icons/io';

interface MemberFormProps {
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
  role: string;
  status: string;
  joinedDate: string;
  availability: string;
  dateOfBirth: string;
  gender: string;
  address: string;
}

const MemberForm: React.FC<MemberFormProps> = ({
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
    role: initialData.role || '',
    status: initialData.status || '',
    joinedDate: initialData.joinedDate || '',
    availability: initialData.availability || '',
    dateOfBirth: initialData.dateOfBirth || '',
    gender: initialData.gender || '',
    address: initialData.address || '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    e.preventDefault(); // Prevent default form submission
    console.log('Form data submitted:', formData);
    onSubmit(formData); // Pass the current formData to the onSubmit prop
    setFormData({
      profilePhoto: null,
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      role: '',
      status: '',
      joinedDate: '',
      availability: '',
      dateOfBirth: '',
      gender: '',
      address: '',
    });
  };

  return (
    <div className='bg-white p-8  rounded-lg shadow-lg w-full mt-12 max-w-3xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
      <div className='absolute right-2'>
        <IoMdClose
          className='absolute top-4 right-4 text-4xl cursor-pointer text-gray-700'
          onClick={() => setOpenForm(false)}
        />
      </div>

      <form
        onSubmit={handleSubmit}
        className='flex flex-col gap-6 w-full'>
        {/* Profile Section */}
        <div className='flex items-center gap-4'>
          <div className='w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden'>
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

          <div className='text-black'>
            <h2 className='text-xl font-semibold'>Add New Member</h2>
            <label
              htmlFor='profilePhoto'
              className='text-[#34C0EE] text-md underline cursor-pointer'>
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

        {/* Name Row */}
        <div className='flex gap-4'>
          <div className='flex-1'>
            <label className='block text-md font-semibold text-gray-700'>
              First Name
            </label>
            <input
              type='text'
              name='firstName'
              value={formData.firstName}
              onChange={handleChange}
              placeholder='Enter first name'
              className='mt-1 p-2 w-full border rounded-md border-gray-400 text-gray-400'
            />
          </div>

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
              className='mt-1 p-2 w-full border rounded-md border-gray-400 text-gray-400'
            />
          </div>
        </div>

        {/* Email */}
        <div className='flex flex-col'>
          <label className='block text-md font-semibold text-gray-700'>
            Email
          </label>
          <input
            type='email'
            name='email'
            value={formData.email}
            onChange={handleChange}
            placeholder='Enter member email e.g. info@sarah.org'
            className='mt-1 p-2 w-full border rounded-md border-gray-400 text-gray-400'
          />
        </div>

        {/* Phone */}
        <div className='flex flex-col'>
          <label className='block text-md font-semibold text-gray-700'>
            Phone
          </label>
          <input
            type='tel'
            name='phone'
            value={formData.phone}
            onChange={handleChange}
            placeholder='Enter member contact number e.g. +123 456 7890'
            className='mt-1 p-2 w-full border rounded-md border-gray-400 text-gray-400'
          />
        </div>

        {/* Role & Status Row */}
        <div className='flex gap-4'>
          <div className='flex-1'>
            <label className='block text-md font-semibold text-gray-700'>
              Role
            </label>
            <select
              name='role'
              value={formData.role}
              onChange={handleChange}
              className='mt-1 p-2 w-full border rounded-md border-gray-400 text-gray-400'>
              <option value=''>Select member role</option>
              <option value='admin'>Admin</option>
              <option value='member'>Member</option>
            </select>
          </div>

          <div className='flex-1'>
            <label className='block text-md font-semibold text-gray-700'>
              Status
            </label>
            <select
              name='status'
              value={formData.status}
              onChange={handleChange}
              className='mt-1 p-2 w-full border rounded-md border-gray-400 text-gray-400'>
              <option value=''>Select member status</option>
              <option value='active'>Active</option>
              <option value='inactive'>Inactive</option>
            </select>
          </div>
        </div>

        {/* Joined Date & Availability */}
        <div className='flex gap-4'>
          <div className='flex-1 relative'>
            <label className='block text-md font-semibold text-gray-700'>
              Joined Date
            </label>
            <input
              type='date'
              name='joinedDate'
              value={formData.joinedDate}
              onChange={handleDateChange}
              className='mt-1 p-2 w-full border rounded-md border-gray-400 text-gray-400'
            />
            <FaCalendarAlt className='absolute right-3 top-9 text-gray-400' />
          </div>

          <div className='flex-1'>
            <label className='block text-md font-semibold text-gray-700'>
              Availability
            </label>
            <select
              name='availability'
              value={formData.availability}
              onChange={handleChange}
              className=' p-3 w-full border rounded-md border-gray-400 text-gray-400'>
              <option value=''>Select availability e.g. Free, Busy</option>
              <option value='free'>Free</option>
              <option value='busy'>Busy</option>
            </select>
          </div>
        </div>

        {/* Date of Birth & Gender */}
        <div className='flex gap-4'>
          <div className='flex-1 relative'>
            <label className='block text-md font-semibold text-gray-700'>
              Date of Birth
            </label>
            <input
              type='date'
              name='dateOfBirth'
              value={formData.dateOfBirth}
              onChange={handleDateChange}
              className='mt-1 p-2 w-full border rounded-md border-gray-400 text-gray-400'
            />
            <FaCalendarAlt className='absolute right-3 top-9 text-gray-400' />
          </div>

          <div className='flex-1'>
            <label className='block text-md font-semibold text-gray-700'>
              Gender
            </label>
            <select
              name='gender'
              value={formData.gender}
              onChange={handleChange}
              className=' p-3 w-full border rounded-md border-gray-400 text-gray-400'>
              <option value=''>Select Gender</option>
              <option value='male'>Male</option>
              <option value='female'>Female</option>
              <option value='other'>Other</option>
            </select>
          </div>
        </div>

        {/* Address */}
        <div className='flex flex-col'>
          <label className='block text-md font-semibold text-gray-700'>
            Address
          </label>
          <input
            type='text'
            name='address'
            value={formData.address}
            onChange={handleChange}
            placeholder='Enter client address'
            className='mt-1 p-2 w-full border rounded-md border-gray-400 text-gray-400'
          />
        </div>

        {/* Submit Button */}
        <div className='w-full flex items-center gap-4'>
          <button
            type='submit'
            className='w-40 bg-[#01B0E9] text-white p-2  rounded-full cursor-pointer'>
            Add Member
          </button>
          <button
            type='submit'
            onClick={() => setOpenForm(false)}
            className='w-40  text-black p-2 border-1  border-gray-400 rounded-full  cursor-pointer'>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default MemberForm;
