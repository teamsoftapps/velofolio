/** @format */

import React, { useState, useRef, useEffect } from 'react';
import { FaPlus, FaMapMarkerAlt, FaChevronDown } from 'react-icons/fa';
import { MdClose } from 'react-icons/md';
import { HiMenuAlt2 } from 'react-icons/hi';
import { GrAttachment } from 'react-icons/gr';
import { SlOptions } from 'react-icons/sl';
import { CiImageOn } from 'react-icons/ci';
import Image from 'next/image';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import COLORS from '@/utils/Color';
import DeleteCommentModal from './CommentDeleteModal';
import CommentItem from './CommentItem';
import CommentAction from './CommentActions';
import { LiaComment } from 'react-icons/lia';


interface PreWeddingModalProps {
  setModal: (open: boolean) => void;
  Modal?: any;
}

const PreWeddingModal: React.FC<PreWeddingModalProps> = ({ setModal }) => {
  const [coverImage, setCoverImage] = useState<string>(
    '/images/prodCardImg.png'
  ); // Main header image
  const [menuOpenFor, setMenuOpenFor] = useState<string | null>(null); // Track which 3-dot is open
  const menuRef = useRef<HTMLDivElement>(null);
  const [dueDate, setDueDate] = useState<Date | null>(
    new Date('2025-10-30T05:32:00')
  );
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [description, setDescription] = useState(
    'Footage received from the videographer. Editor to create a 3-minute highlight reel and full-length film by the deadline. Color correction and music selection in progress.'
  );
  const [originalDescription, setOriginalDescription] = useState(description);
  const [isEditing, setIsEditing] = useState(false);
  const [showFilePicker, setShowFilePicker] = useState(false);
  const addButtonRef = useRef<HTMLButtonElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const pickerRef = useRef<HTMLDivElement>(null);
  const [comment, setComment] = useState('');
  const [isCommentEditing, setIsCommentEditing] = useState(false);
  const [commentModel,setCommentModal] = useState<boolean>(false)
  const [attachments, setAttachments] = useState<
    { id: string; name: string; url: string; date: string; type: string }[]
  >([
    // Optional: keep existing file as fallback
    {
      id: '1',
      name: 'wedding.jpg',
      url: '/images/prodCardImg.png',
      date: 'Added Nov 1, 2025, 5:59 PM',
      type: 'image',
    },
  ]);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [commentData,setCommentData] =useState<
    { id: string; name: string;  date: string; comment: string }[]
  >([]);
  const handleEditComment = (id: string) => {
    const commentToEdit = commentData.find((comment) => comment.id === id);
    if (commentToEdit) {
      setComment(commentToEdit.comment);
      setIsCommentEditing(true);
    }
    
  }
const DeleteComment = (id: string) => {
  setCommentData(commentData.filter((comment) => comment.id !== id));
}
const handleSaveComment = () => {
  if(comment.trim() === '') return
  const newComment = {
    id: Date.now().toString(),
    name: 'John Doe',
    date: `Added ${new Date().toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    })}`,
    comment,
  };
  setCommentData([...commentData, newComment]);
  setComment('');
}




  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpenFor(null);
      }
      if (
        showFilePicker &&
        pickerRef.current &&
        !pickerRef.current.contains(e.target as Node) &&
        addButtonRef.current &&
        !addButtonRef.current.contains(e.target as Node)
      ) {
        setShowFilePicker(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showFilePicker, menuOpenFor]);

const MAX_FILE_SIZE = 20 * 1024 * 1024; // 5MB

  
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;


      if (file.size > MAX_FILE_SIZE) {
    alert('File must be less than 20');
    return;
  }
    const reader = new FileReader();
    reader.onload = (event) => {
      const url = event.target?.result as string;
      const newAttachment = {
        id: Date.now().toString(),
        name: file.name,
        url,
        date: `Added ${new Date().toLocaleString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
          hour: 'numeric',
          minute: '2-digit',
          hour12: true,
        })}`,
        type: file.type.startsWith('image/') ? 'image' : 'file',
      };

      setAttachments((prev) => [...prev, newAttachment]);
      setShowFilePicker(false);
    };

    reader.readAsDataURL(file);
  };

  const formatDueDate = (date: Date | null) => {
    if (!date) return 'Select date & time';
    return date.toLocaleString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    });
  };

  return (
    <div className='fixed inset-0 bg-transparent bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto mt-10'>
      <div className='bg-white rounded-xl w-[95%] sm:w-11/12 md:w-3/4 lg:w-2/3 xl:w-1/2 p-4 sm:p-6 relative my-10 lg:pt-5 h-full overflow-y-auto mt-10 xl:h-auto'>
        {/* Header Image Section */}
        <div className='w-full relative'>
          <div className='absolute top-2 left-2 right-2 flex justify-between items-center px-2 sm:px-3'>
            <span className='py-1 sm:py-2 bg-white px-3 sm:px-4 text-black text-xs sm:text-sm font-semibold rounded'>
              PENDING
            </span>
            <div className='flex items-center gap-2 sm:gap-3'>
              <button className='text-gray-800 hover:text-gray-700 w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-full flex items-center justify-center cursor-pointer'>
                <CiImageOn
                  size={20}
                  className='sm:w-6 sm:h-6'
                />
              </button>
              <button
                onClick={() => setModal(false)}
                className='text-gray-800 hover:text-gray-700 w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-full flex items-center justify-center cursor-pointer'>
                <MdClose
                  size={20}
                  className='sm:w-6 sm:h-6'
                />
              </button>
            </div>
          </div>
          <img
            src={coverImage}
            alt='Pre-Wedding Shoot'
            className='w-full h-40 sm:h-52 md:h-60 lg:h-64 object-cover rounded-lg'
          />
        </div>

        {/* Main Content */}
        <div className='flex flex-col lg:flex-row mt-4 gap-6'>
          {/* Left Side: Details */}
          <div className='w-full lg:w-1/2'>
            <div className='flex justify-between items-center pb-4 border-b border-gray-200 lg:border-0'>
              <h2 className='text-lg sm:text-xl font-bold text-black'>
                Pre-Wedding Shoot - Sarah & John
              </h2>
            </div>

            {/* Buttons */}
            <div className='flex flex-wrap gap-3 mt-4'>
              <button className='flex items-center text-black border border-gray-300 rounded-md px-3 py-2 text-sm hover:bg-gray-100'>
                <FaPlus className='mr-2' /> Add
              </button>
              <button className='flex items-center text-black border border-gray-300 rounded-md px-3 py-2 text-sm hover:bg-gray-100'>
                <FaMapMarkerAlt className='mr-2' /> Location
              </button>
            </div>

            {/* Members, Client, Due Date */}
            <div className='mt-6 flex flex-col sm:flex-row flex-wrap gap-6'>
              {/* Members */}
              <div className='flex flex-col'>
                <div className='text-gray-600 text-sm'>Members</div>
                <div className='flex items-center mt-1 space-x-2'>
                  <Image
                    src='/teampic3.png'
                    alt='Member'
                    width={36}
                    height={36}
                    className='rounded-full'
                  />
                  <Image
                    src='/teampic3.png'
                    alt='Member'
                    width={36}
                    height={36}
                    className='rounded-full'
                  />
                  <button className='w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-600'>
                    <FaPlus />
                  </button>
                </div>
              </div>

              {/* Client */}
              <div className='flex flex-col'>
                <div className='text-gray-600 text-sm'>Client</div>
                <Image
                  src='/teampic3.png'
                  alt='Client'
                  width={36}
                  height={36}
                  className='rounded-full mt-1'
                />
              </div>

              {/* Due Date – RESPONSIVE PICKER BELOW BUTTON */}
              <div className='flex flex-col w-full sm:w-auto relative'>
                <div className='text-gray-600 text-sm'>Due Date</div>

                {/* Trigger Button */}
                <button
                  ref={buttonRef}
                  type='button'
                  onClick={() => setIsPickerOpen(!isPickerOpen)}
                  className='flex items-center justify-between w-full sm:w-48 px-3 py-2 mt-1 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors'>
                  <span className='text-sm'>{formatDueDate(dueDate)}</span>
                  <FaChevronDown className='ml-2 text-gray-500' />
                </button>

                {/* RESPONSIVE PICKER – Opens BELOW the button */}
                {isPickerOpen && buttonRef.current && (
                  <div
                    className='absolute left-0 right-0 mt-1 w-full sm:w-90 bg-white rounded-lg shadow-2xl border border-gray-200 z-[2000] p-3'
                    style={{
                      top: `${
                        buttonRef.current.getBoundingClientRect().bottom -
                        buttonRef.current.parentElement!.getBoundingClientRect()
                          .top +
                        4
                      }px`,
                    }}
                    onClick={(e) => e.stopPropagation()}>
                    {/* Header */}
                    <div className='flex justify-between items-center mb-2'>
                      <h3 className='text-sm font-medium text-gray-800'>
                        Dates
                      </h3>
                      <button
                        onClick={() => setIsPickerOpen(false)}
                        className='text-gray-500 hover:text-gray-700'>
                        <MdClose size={16} />
                      </button>
                    </div>

                    {/* Compact Calendar + Time */}
                    <DatePicker
                      selected={dueDate}
                      onChange={(date) => setDueDate(date)} // Accepts Date | null
                      showTimeSelect
                      timeFormat='h:mm aa'
                      timeIntervals={15}
                      dateFormat='MM/dd/yyyy, h:mm aa'
                      inline
                      calendarClassName='custom-compact-calendar'
                      minDate={new Date()} // ← THIS DISABLES PAST DATES
                      filterDate={(date) => date >= new Date()} // Optional: extra safety
                    />

                    {/* Action Buttons */}
                    <div className='flex gap-1.5 mt-3'>
                      <button
                        onClick={() => {
                          setDueDate(null);
                          setIsPickerOpen(false);
                        }}
                        className='flex-1 py-1.5 text-xs font-medium text-black bg-[#E8E9EB] rounded'>
                        Remove
                      </button>
                      <button
                        onClick={() => setIsPickerOpen(false)}
                        className='flex-1 py-1.5 text-xs font-medium text-white bg-[#00A4DD] rounded'>
                        Save
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
            {/* Description - Editable */}
            <div className='mt-6  '>
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-2'>
                  <HiMenuAlt2 className='text-gray-600 w-6 h-6' />
                  <h2 className='text-gray-900 font-semibold text-lg'>
                    Description
                  </h2>
                </div>
                <button
                  onClick={() => setIsEditing(true)}
                  className={`text-gray-900 px-4 py-1 text-sm rounded cursor-pointer transition-colors ${
                    isEditing ? 'hidden' : 'bg-gray-200 hover:bg-gray-300'
                  }`}>
                  Edit
                </button>
              </div>

              {/* Editable Textarea */}
              <div
                className={`mt-2 relative ${
                  isEditing ? 'border-2 border-[#00A4DD] rounded-md' : ''
                }`}>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  disabled={!isEditing}
                  className={`w-full p-3 text-sm sm:text-base text-gray-700 bg-transparent resize-none outline-none ${
                    isEditing ? 'cursor-text' : 'cursor-default'
                  }`}
                  rows={4}
                  placeholder='Add a description...'
                />
              </div>

              {/* Save / Cancel Buttons - only when editing */}
              {isEditing && (
                <div className='flex gap-2 mt-2 '>
                  <button
                    onClick={() => {
                      setIsEditing(false);
                      setDescription(originalDescription); // revert
                    }}
                    className='px-4 py-1.5 text-sm font-medium text-black bg-[#E8E9EB] rounded hover:bg-[#d1d3d6] transition-colors'>
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      setIsEditing(false);
                      setOriginalDescription(description); // save
                    }}
                    className='px-4 py-1.5 text-sm font-medium text-white bg-[#00A4DD] rounded hover:bg-[#0088b8] transition-colors'>
                    Save
                  </button>
                </div>
              )}
            </div>

            {/* Attachment */}

            <div className='mt-6 relative'>
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-2'>
                  <GrAttachment className='text-gray-600 w-5 h-5' />
                  <h1 className='text-gray-600 font-semibold text-lg'>
                    Attachment
                  </h1>
                </div>
                <button
                  ref={addButtonRef}
                  onClick={() => setShowFilePicker((prev) => !prev)}
                  className='bg-gray-300 px-4 py-1 text-sm rounded text-gray-900 cursor-pointer hover:bg-gray-400 transition-colors relative z-10'>
                  Add
                </button>
              </div>

              <div className='mt-3 space-y-3'>
                {attachments.map((file) => (
                  <div
                    key={file.id}
                    className='flex items-center flex-wrap lg:flex-nowrap gap-3 relative'>
                    {/* Thumbnail */}
                    {file.type === 'image' ? (
                      <img
                        src={file.url}
                        alt={file.name}
                        className='w-28 h-16 object-cover rounded'
                      />
                    ) : (
                      <div className='w-28 h-16 bg-gray-200 border-2 border-dashed border-gray-300 rounded flex items-center justify-center'>
                        <GrAttachment className='text-gray-500 w-8 h-8' />
                      </div>
                    )}

                    {/* File Info */}
                    <div className='flex-1 min-w-[150px]'>
                      <h1 className='text-gray-700 font-medium text-sm sm:text-base truncate'>
                        {file.name}
                      </h1>
                      <h3 className='text-gray-500 text-xs sm:text-sm'>
                        {file.date}
                      </h3>
                    </div>

                    {/* 3-Dot Menu Button */}
                    <button
                      onClick={() =>
                        setMenuOpenFor(menuOpenFor === file.id ? null : file.id)
                      }
                      className='text-gray-600 hover:text-gray-800 p-1 rounded hover:bg-gray-200 transition-colors z-20'>
                      <SlOptions className='w-5 h-5' />
                    </button>

                    {/* Dropdown Menu - Opens ABOVE the 3 dots */}
                    {menuOpenFor === file.id && (
                      <div
                        ref={menuRef}
                        className='absolute right-0 bottom-full mb-1 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-[3000] py-1'
                        style={{
                          bottom: '100%',
                          marginBottom: '4px',
                        }}
                        onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={() => {
                            const link = document.createElement('a');
                            link.href = file.url;
                            link.download = file.name;
                            link.click();
                            setMenuOpenFor(null);
                          }}
                          className='w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2'>
                          Download
                        </button>

                        {file.type === 'image' && (
                          <button
                            onClick={() => {
                              setCoverImage(file.url);
                              setMenuOpenFor(null);
                            }}
                            className='w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2'>
                            Make Cover
                          </button>
                        )}

                        <button
                          onClick={() => {
                            setAttachments((prev) =>
                              prev.filter((f) => f.id !== file.id)
                            );
                            setMenuOpenFor(null);
                          }}
                          className='w-full text-left px-4 py-2 text-sm text-[#F7631C] hover:bg-red-50 flex items-center gap-2'>
                          Remove
                        </button>
                      </div>
                    )}
                  </div>
                ))}

                {attachments.length === 0 && (
                  <p className='text-gray-500 text-sm italic'>
                    No attachments yet
                  </p>
                )}
              </div>

              {/* FILE PICKER - ON TOP of "Add" button */}
              {showFilePicker && addButtonRef.current && (
                <div
                  ref={pickerRef}
                  className='absolute bg-white rounded-lg shadow-2xl border border-gray-200 z-[3000] p-5 w-80'
                  style={{
                    top: `${
                      addButtonRef.current.getBoundingClientRect().top -
                      addButtonRef.current.parentElement!.getBoundingClientRect()
                        .top
                    }px`,
                    right: '0px',
                    width: '320px',
                  }}
                  onClick={(e) => e.stopPropagation()}>
                  <div className='flex justify-between items-center mb-3'>
                    <h3 className='text-base font-semibold text-gray-800'>
                      Attach
                    </h3>
                    <button
                      onClick={() => setShowFilePicker(false)}
                      className='text-gray-500 hover:text-gray-700'>
                      <MdClose size={18} />
                    </button>
                  </div>

                  <p className='text-sm text-gray-600 mb-2'>
                    Attach a file from your computer
                  </p>
                  <p className='text-xs text-gray-500 mb-5'>
                    You can also drag and drop files to upload them
                  </p>

                  <input
                    ref={fileInputRef}
                    type='file'
                    accept='image/*,.pdf,.doc,.docx'
                    className='hidden'
                    onChange={handleFileSelect}
                  />

                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className='w-full py-2 text-sm font-medium text-white bg-[#00A4DD] rounded hover:bg-[#0088b8] transition-colors'>
                    Choose a file
                  </button>
                </div>
              )}
            </div>

            {/* <div className='mt-6'>
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-2'>
                  <GrAttachment className='text-gray-600 w-5 h-5' />
                  <h1 className='text-gray-600 font-semibold text-lg'>
                    Attachment
                  </h1>
                </div>
                <button className='bg-gray-300 px-4 py-1 text-sm rounded text-gray-900 cursor-pointer'>
                  Add
                </button>
              </div>
              <div className='mt-3 flex items-center flex-wrap lg:flex-nowrap gap-3'>
                <img
                  src='/images/prodCardImg.png'
                  alt='Attachment'
                  className='w-28 h-16 object-cover rounded'
                />
                <div className='flex-1 min-w-[150px]'>
                  <h1 className='text-gray-700 font-medium text-sm sm:text-base'>
                    wedding.jpg
                  </h1>
                  <h3 className='text-gray-500 text-xs sm:text-sm'>
                    Added Nov 1, 2025, 5:59 PM
                  </h3>
                </div>
                <button className='text-black bg-gray-200 p-2 rounded cursor-pointer'>
                  <SlOptions className='w-5 h-5' />
                </button>
              </div>
            </div> */}
          </div>

          {/* Right Side: Comments & Activity */}
          <div className='w-full  lg:w-1/2 bg-gray-100 p-4 rounded-lg'>
            <h3 className='text-lg font-medium text-black flex items-center'>
           <LiaComment className='w-6 h-6 text-black mr-2' />     Comments & Activity
            </h3>
            <input
              type='text'
              placeholder='Write a comment...'
              className='w-full mt-2 p-2 text-gray-600 rounded text-sm sm:text-base bg-white border-0 outline-0'
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              onFocus={()=>setIsFocused(true)}
            />
            {
              isFocused &&(
               <CommentAction comment={comment} onSave={handleSaveComment} onCancel={()=>{
                setIsFocused(false) ;setIsCommentEditing(false)}}/>
              )
            }
            <div className='mt-4 space-y-4 min-h-[300px] w-full  overflow-y-auto'>
              {
               commentData.map((data, index) => (
                <CommentItem
                 key={data.id}
    id={data.id}
    name={data.name}
    comment={data.comment}
    setIsCommentEditing={setIsCommentEditing}
 
    date={data.date}
    onDelete={DeleteComment}/>
    
                 
                ))
              }
              {[1, 2].map((i) => (
                <div
                  key={i}
                  className='flex items-start gap-2'>
                  <img
                    src='/teampic1.png'
                    alt='Sarah Johnson'
                    className='w-10 h-10 rounded-full'
                  />
                  <div>
                    <p className='text-gray-700 text-sm sm:text-base'>
                      <b>Sarah Johnson</b> moved this card from <b>PENDING</b>{' '}
                      to <b>IN PROGRESS</b>
                    </p>
                    <h3 className='text-xs sm:text-sm text-[#00A4DD]'>
                      Nov 2, 2025, 12:59 PM
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreWeddingModal;
