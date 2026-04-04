/** @format */

import React from 'react';
import { colors } from '../../utils/colors';
import { FaCalendarAlt } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';

interface LeadFormProps {
  onSubmit: (data: LeadFormData) => void;
  initialData?: Partial<LeadFormData>;
  setOpenForm: (isOpen: boolean) => void;
}

interface LeadFormData {
  leadName: string;
  email: string;
  phone: string;
  leadSource: string;
  priority: string;
  eventDate: string;
  status: string;
  notes: string;
}

const LeadForm: React.FC<LeadFormProps> = ({
  onSubmit,
  setOpenForm,
  initialData = {},
}) => {
  const [formData, setFormData] = React.useState<LeadFormData>({
    leadName: initialData.leadName || '',
    email: initialData.email || '',
    phone: initialData.phone || '',
    leadSource: initialData.leadSource || '',
    priority: initialData.priority || '',
    eventDate: initialData.eventDate || '',
    status: initialData.status || '',
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      leadName: '',
      email: '',
      phone: '',
      leadSource: '',
      priority: '',
      eventDate: '',
      status: '',
      notes: '',
    });
    // setOpenForm(false);
  };

  return (
    <div className='fixed inset-0 flex items-center justify-center z-50 px-4' style={{ backgroundColor: 'rgba(0,0,0,0.4)' }} onClick={() => setOpenForm(false)}>
      <div className='relative p-6 sm:p-8 rounded-lg shadow-lg w-full max-w-3xl overflow-y-auto max-h-[90vh] scroller' style={{ backgroundColor: colors.white }} onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <IoMdClose
          className='absolute top-4 right-4 text-2xl sm:text-3xl cursor-pointer'
          style={{ color: colors.gray800 }}
          onClick={() => setOpenForm(false)}
        />

        <form
          onSubmit={handleSubmit}
          className='flex flex-col gap-6 w-full'>
          <h2 className='text-lg sm:text-xl font-semibold text-center sm:text-left' style={{ color: colors.gray900 }}>
            Add New Lead
          </h2>

          {/* Lead Name */}
          <div>
            <label className='block text-md sm:text-md font-semibold' style={{ color: colors.gray800 }}>
              Lead Name
            </label>
            <input
              type='text'
              name='leadName'
              required
              maxLength={100}
              value={formData.leadName}
              onChange={handleChange}
              placeholder='Enter lead name'
              className='mt-1 p-2 w-full border rounded-md' style={{ borderColor: colors.gray400, color: colors.gray800 }}
            />
          </div>

          {/* Email */}
          <div>
            <label className='block text-md sm:text-md font-semibold' style={{ color: colors.gray800 }}>
              Email
            </label>
            <input
              type='email'
              name='email'
              required
              maxLength={255}
              value={formData.email}
              onChange={handleChange}
              placeholder='Enter client email e.g. info@client.com'
              className='mt-1 p-2 w-full border rounded-md' style={{ borderColor: colors.gray400, color: colors.gray800 }}
            />
          </div>

          {/* Phone */}
          <div>
            <label className='block text-md sm:text-md font-semibold' style={{ color: colors.gray800 }}>
              Phone
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
              placeholder='Enter contact number e.g. +123 456 7890'
              className='mt-1 p-2 w-full border rounded-md' style={{ borderColor: colors.gray400, color: colors.gray800 }}
            />
          </div>

          {/* Lead Source & Priority */}
          <div className='flex flex-col sm:flex-row gap-4'>
            <div className='flex-1'>
              <label className='block text-md sm:text-md font-semibold' style={{ color: colors.gray800 }}>
                Lead Source
              </label>
              <select
                name='leadSource'
                required
                value={formData.leadSource}
                onChange={handleChange}
                className='mt-1 p-2 w-full border rounded-md border-gray-400 text-gray-800'>
                <option value=''>Select lead source</option>
                <option value='Website'>Website</option>
                <option value='Referral'>Referral</option>
                <option value='Social Media'>Social Media</option>
                <option value='Advertisement'>Advertisement</option>
                <option value='Other'>Other</option>
              </select>
            </div>

            <div className='flex-1'>
              <label className='block text-md sm:text-md font-semibold' style={{ color: colors.gray800 }}>
                Priority
              </label>
              <select
                name='priority'
                required
                value={formData.priority}
                onChange={handleChange}
                className='mt-1 p-2 w-full border rounded-md' style={{ borderColor: colors.gray400, color: colors.gray800 }}>
                <option value=''>Select priority</option>
                <option value='High'>High</option>
                <option value='Medium'>Medium</option>
                <option value='Low'>Low</option>
              </select>
            </div>
          </div>

          {/* Event Date & City */}
          <div className='flex flex-col sm:flex-row gap-4'>
            <div className='flex-1 relative'>
              <label className='block text-md sm:text-md font-semibold' style={{ color: colors.gray800 }}>
                Event Date
              </label>
              <input
                type='date'
                name='eventDate'
                required
                value={formData.eventDate}
                onChange={handleChange}
                className='mt-1 p-2 w-full border rounded-md border-gray-400 text-gray-800'
              />
              {/* <FaCalendarAlt className='absolute right-3 top-9 text-gray-400' /> */}
            </div>
            <div className='flex-1'>
              <label className='block text-md font-semibold' style={{ color: colors.gray800 }}>
                Status
              </label>
              <select
                name='status'
                required
                value={formData.status}
                onChange={handleChange}
                className='mt-1 p-2 w-full border rounded-md' style={{ borderColor: colors.gray400, color: colors.gray800 }}>
                <option value=''>Select member status</option>
                <option value='active'>Active</option>
                <option value='inactive'>Inactive</option>
              </select>
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className='block text-md sm:text-md font-semibold' style={{ color: colors.gray800 }}>
              Notes
            </label>
            <textarea
              name='notes'
              maxLength={2000}
              value={formData.notes}
              onChange={handleChange}
              placeholder='Enter any additional notes'
              rows={3}
              className='mt-1 p-2 w-full border rounded-md resize-none'
              style={{ borderColor: colors.gray400, color: colors.gray800 }}
            />
          </div>

          {/* Submit */}
          <div className='w-full flex items-center gap-4'>
            <button
              type='submit'
              className='w-40 p-2 rounded-full cursor-pointer'
              style={{ backgroundColor: colors.primary, color: colors.white }}
            >
              Add Lead
            </button>
            <button
              type='button'
              onClick={() => setOpenForm(false)}
              className='w-40 p-2 border-1 rounded-full cursor-pointer'
              style={{ color: colors.black, borderColor: colors.gray400 }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>

      {/* Hide scrollbar */}
      <style
        jsx
        global>{`
        .scroller::-webkit-scrollbar {
          width: 0;
          background: transparent;
        }
        .scroller {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default LeadForm;
