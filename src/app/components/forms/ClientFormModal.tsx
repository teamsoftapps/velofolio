
/** @format */
'use client';
import React, { useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import Image from 'next/image';
import { useCreateClientMutation } from '@/store/apis/Common';
import { toast } from 'react-toastify';
interface ClientFormProps {
  onSubmit: (data: any) => void;
  setOpenForm: (isOpen: boolean) => void;
  initialData?: Partial<FormData>;
  setClients: (clients: any) => void;
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
  personName?: string;
 
}

const ClientForm: React.FC<ClientFormProps> = ({
  onSubmit,
  setOpenForm,
  initialData = {},
  setClients
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
    personName: initialData.personName || '',
  });


  const [activeTab, setActiveTab] = useState<'Client' | 'Company'>('Client');
const [createClient] = useCreateClientMutation();
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    // Data limitation logic
    if (name === 'phone' || name === 'companyPhone') {
      if (/[^0-9+\s\-()]/.test(value)) {
        setErrors((prev) => ({ ...prev, [name]: 'Only numbers and +, -, ( ), spaces are allowed' }));
        setTimeout(() => setErrors((prev) => ({ ...prev, [name]: '' })), 3000);
      }
      const filteredValue = value.replace(/[^0-9+\s\-()]/g, '');
      setFormData((prev) => ({ ...prev, [name]: filteredValue }));
    } else if (['firstName', 'lastName', 'city', 'country', 'personName'].includes(name)) {
      if (/[0-9]/.test(value)) {
        setErrors((prev) => ({ ...prev, [name]: 'Numbers are not allowed here' }));
        setTimeout(() => setErrors((prev) => ({ ...prev, [name]: '' })), 3000);
      }
      const filteredValue = value.replace(/[0-9]/g, '');
      setFormData((prev) => ({ ...prev, [name]: filteredValue }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData((prev) => ({
        ...prev,
        profilePhoto: e.target.files?.[0] || null,
      }));
    }
  };

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();

    if (activeTab === 'Company') {
      handleCompanySubmit();
      return;
    }

    const finalData = {
      type: 'Client',
      firstName: formData.firstName ,
      lastName: formData.lastName ,
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
   try {
  const res = await createClient(finalData).unwrap();
  console.log('Client created:', res);
  setClients((prev: any) => [...prev, res.client]);
  toast.success('Client created successfully');
  onSubmit(res);
} catch (error) {
  console.error('Client creation failed:', error);
  toast.error('Failed to create client')
}

   
  };

  const handleCompanySubmit = () => {
    const companyData = {
      type: 'Company',
      companyName: formData.firstName,
      personName: formData.personName,
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
    <div className='fixed inset-0 flex items-center justify-center bg-black/40 z-[1100] px-4 inter' onClick={() => setOpenForm(false)}>
      <div className='relative mt-20 bg-white p-6 sm:p-8 rounded-lg shadow-lg w-full max-w-3xl overflow-y-auto max-h-[90vh] scroller' onClick={(e) => e.stopPropagation()}>
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
          <div className='flex w-full sm:w-64 bg-gray-100 rounded-full p-1'>
            <button
              type='button'
              onClick={() => setActiveTab('Client')}
              className={`flex-1 text-center py-2 rounded-full cursor-pointer text-sm font-medium transition-all duration-200 ${
                activeTab === 'Client'
                  ? 'bg-[#01B0E9] shadow text-white ]'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Client
            </button>
            <button
              type='button'
              onClick={() => setActiveTab('Company')}
              className={`flex-1 text-center py-2 rounded-full cursor-pointer text-sm font-medium transition-all duration-200 ${
                activeTab === 'Company'
                  ? 'bg-[#01B0E9] shadow text-white ]'
                  : 'text-gray-600 hover:text-gray-900'
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
                required
                maxLength={100}
                value={formData.firstName}
                onChange={handleChange}
                placeholder={
                  activeTab === 'Company'
                    ? 'Enter company name'
                    : 'Enter first name'
                }
                className='mt-1 p-2 w-full border rounded-md border-gray-400 text-gray-800'
              />
              {errors.firstName && <p className='text-xs text-red-500 mt-1'>{errors.firstName}</p>}
            </div>

            {activeTab === 'Client' && (
              <div className='flex-1'>
                <label className='block text-md font-semibold text-gray-700'>
                  Last Name
                </label>
                <input
                  type='text'
                  name='lastName'
                  required={activeTab === 'Client'}
                  maxLength={100}
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder='Enter last name'
                  className='mt-1 p-2 w-full border rounded-md border-gray-400 text-gray-800'
                />
                {errors.lastName && <p className='text-xs text-red-500 mt-1'>{errors.lastName}</p>}
              </div>
            )}

            {activeTab === 'Company' && (
              <div className='flex-1'>
                <label className='block text-md font-semibold text-gray-700'>
                  Person Name
                </label>
                <input
                  type='text'
                  name='personName'
                  required={activeTab === 'Company'}
                  maxLength={100}
                  value={formData.personName}
                  onChange={handleChange}
                  placeholder='Enter person name'
                  className='mt-1 p-2 w-full border rounded-md border-gray-400 text-gray-800'
                />
                {errors.personName && <p className='text-xs text-red-500 mt-1'>{errors.personName}</p>}
              </div>
            )}
          </div>


  <div className='flex flex-col sm:flex-row gap-4 w-full'>
          {/* Email */}
          <div className='w-full'>
            <label className='block text-md font-semibold text-gray-700 '>
              {activeTab === 'Company' ? 'Company Email' : 'Email'}
            </label>
            <input
              type='email'
              name='email'
              required
              maxLength={255}
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
         <div className='w-full'>
            <label className='block text-md font-semibold text-gray-700'>
              {activeTab === 'Company' ? 'Company Phone' : 'Phone'}
            </label>
            <input
              type='tel'
              name='phone'
              required
              maxLength={20}
              pattern="^[+]?[0-9\s\-()]{7,20}$"
              title="Enter a valid phone number (e.g. +123 456 7890)"
              value={formData.phone}
              onChange={handleChange}
               placeholder={
                activeTab === 'Company'
                  ? 'Enter company Phone'
                  : 'Enter client Phone'
              }
              className='mt-1 p-2 w-full border rounded-md border-gray-400 text-gray-800'
            />
            {errors.phone && <p className='text-xs text-red-500 mt-1'>{errors.phone}</p>}
          </div>
</div>
          {/* Lead Source */}


            <div className='flex flex-col sm:flex-row gap-4 w-full'>
          <div className='w-full'>
            <label className='block text-md font-semibold text-gray-700'>
              Lead Source
            </label>
            <select
              name='leadSource'
              required
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

          {/* Status */}
          <div className='w-full'>
            <label className='block text-md font-semibold text-gray-700'>
              Status
            </label>
            <select
              name='status'
              required
              value={formData.status}
              onChange={handleChange}
              className='mt-1 p-2 w-full border rounded-md border-gray-400 text-gray-800'
            >
              <option value=''>Select Status</option>
              <option value='New Lead'>New Lead</option>
              <option value='Proposal'>Proposal</option>
              <option value='Booked'>Booked</option>
              <option value='Active'>Active</option>
              <option value='Done'>Done</option>
            </select>
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
              required
              maxLength={255}
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
                required
                maxLength={100}
                value={formData.country}
                onChange={handleChange}
                placeholder='Enter country'
                className='mt-1 p-2 w-full border rounded-md border-gray-400 text-gray-800'
              />
              {errors.country && <p className='text-xs text-red-500 mt-1'>{errors.country}</p>}
            </div>

            <div className='flex-1'>
              <label className='block text-md font-semibold text-gray-700'>
                City
              </label>
              <input
                type='text'
                name='city'
                required
                maxLength={100}
                value={formData.city}
                onChange={handleChange}
                placeholder='Enter city'
                className='mt-1 p-2 w-full border rounded-md border-gray-400 text-gray-800'
              />
              {errors.city && <p className='text-xs text-red-500 mt-1'>{errors.city}</p>}
            </div>
          </div>

          {/* Timezone */}
          <div>
            <label className='block text-md font-semibold text-gray-700'>
              Timezone
            </label>
            <select
              name='timezone'
              required
              value={formData.timezone}
              onChange={handleChange}
              className='mt-1 p-2 w-full border rounded-md border-gray-400 text-gray-800'
            >
              <option value=''>Select Timezone</option>
              <option value='UTC-12:00'>UTC-12:00 (Baker Island)</option>
              <option value='UTC-11:00'>UTC-11:00 (American Samoa)</option>
              <option value='UTC-10:00'>UTC-10:00 (Honolulu)</option>
              <option value='UTC-09:00'>UTC-09:00 (Anchorage)</option>
              <option value='UTC-08:00'>UTC-08:00 (Los Angeles, PST)</option>
              <option value='UTC-07:00'>UTC-07:00 (Denver, MST)</option>
              <option value='UTC-06:00'>UTC-06:00 (Chicago, CST)</option>
              <option value='UTC-05:00'>UTC-05:00 (New York, EST)</option>
              <option value='UTC-04:00'>UTC-04:00 (Caracas)</option>
              <option value='UTC-03:00'>UTC-03:00 (Buenos Aires)</option>
              <option value='UTC-02:00'>UTC-02:00 (South Georgia)</option>
              <option value='UTC-01:00'>UTC-01:00 (Azores)</option>
              <option value='UTC+00:00'>UTC+00:00 (London, GMT)</option>
              <option value='UTC+01:00'>UTC+01:00 (Berlin, CET)</option>
              <option value='UTC+02:00'>UTC+02:00 (Athens, EET)</option>
              <option value='UTC+03:00'>UTC+03:00 (Moscow)</option>
              <option value='UTC+04:00'>UTC+04:00 (Dubai)</option>
              <option value='UTC+05:00'>UTC+05:00 (Karachi)</option>
              <option value='UTC+05:30'>UTC+05:30 (India Standard Time)</option>
              <option value='UTC+06:00'>UTC+06:00 (Dhaka)</option>
              <option value='UTC+07:00'>UTC+07:00 (Bangkok)</option>
              <option value='UTC+08:00'>UTC+08:00 (Singapore, Beijing)</option>
              <option value='UTC+09:00'>UTC+09:00 (Tokyo, KST)</option>
              <option value='UTC+10:00'>UTC+10:00 (Sydney)</option>
              <option value='UTC+11:00'>UTC+11:00 (Noumea)</option>
              <option value='UTC+12:00'>UTC+12:00 (Auckland)</option>
            </select>
          </div>

          {/* Notes */}
          <div>
            <label className='block text-md font-semibold text-gray-700'>
              Notes
            </label>
            <textarea
              name='notes'
              maxLength={2000}
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
