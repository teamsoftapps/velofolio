

'use client';

import React, { useState, useRef, ChangeEvent, DragEvent } from 'react';
import ImageReplacementTab from '../ImageReplacementTab';
import { SlCloudUpload } from "react-icons/sl";
import { RichTextEditor } from '../RichTextArea';
import { useDispatch, useSelector } from 'react-redux';
import { setInvoices } from '@/store/slices/invoiceSlice';

interface AddInvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: AddItemData) => void;
  initialData?: AddItemData | null;
}

interface AddItemData {
  id: string;
  name: string;
  description: string;
  image: any;
  imagePlacement: 'above' | 'below';
  discount: string;
  price: string;
  quantity: string;
  tax: string;
  totalAmount: string; 
}

const packagesData = [
  {
    id: 1,
    title: "Premium Portrait Package",
    price: "1999",
    description: "<p>A deluxe package created for families wanting timeless wall art and keepsake prints.</p>",
    tax: "0",
  },
  {
    id: 2,
    title: "Family Golden Package",
    price: "1299",
    description: "<p>Perfect for small families wanting beautifully curated images for albums and frames.</p>",
    tax: "0",
  },
  {
    id: 3,
    title: "Essential Portrait Package",
    price: "799",
    description: "<p>A simple and affordable package for individuals or couples wanting memorable photos.</p>",
    tax: "0",
  },
];

const AddInvoiceModal: React.FC<AddInvoiceModalProps> = ({ isOpen, onClose, onSubmit, initialData }) => {
  const dispatch = useDispatch();
  const invoices = useSelector((state: any) => state.persisted.invoiceandQuote.invoices);
  
  const [formData, setFormData] = useState<AddItemData>({
    id: '',
    name: '',
    description: '',
    image: null,
    imagePlacement: 'above',
    discount: '',
    price: '',
    quantity: '',
    tax: '',
    totalAmount: '0.00',
  });

  // Helper function to calculate total amount
  const calculateTotalAmount = (data: AddItemData): string => {
    const price = parseFloat(data.price) || 0;
    const quantity = parseFloat(data.quantity) || 0;
    const discountPercent = parseFloat(data.discount) || 0;
    const taxPercent = parseFloat(data.tax) || 0;

    const subtotal = price * quantity;
    const discountAmount = subtotal * (discountPercent / 100);
    const subtotalAfterDiscount = subtotal - discountAmount;
    const total = subtotalAfterDiscount + (subtotalAfterDiscount * (taxPercent / 100));

    return total.toFixed(2);
  };

  const getImageUrl = (image: any): string => {
    if (!image) return '';
    if (typeof image === 'string') return image;
    if (image instanceof File || image instanceof Blob) {
      return URL.createObjectURL(image);
    }
    return '';
  };

  const [isDragging, setIsDragging] = useState(false);
  const [hasImage, setHasImage] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (isOpen && initialData) {
      setFormData(initialData);
      setHasImage(!!initialData.image);
    } else if (isOpen) {
      setFormData({
        id: '',
        name: '',
        description: '',
        image: null,
        imagePlacement: 'above',
        discount: '',
        price: '',
        quantity: '',
        tax: '',
        totalAmount: '0.00',
      });
      setHasImage(false);
    }
  }, [isOpen, initialData]);

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (field: keyof AddItemData, value: string | File) => {
    let filteredValue = value;

    // Numeric filtering for financial fields
    if (['price', 'quantity', 'discount', 'tax'].includes(field) && typeof value === 'string') {
      if (/[^0-9.]/.test(value)) {
        setErrors((prev) => ({ ...prev, [field]: 'Only numbers and a decimal point are allowed' }));
        setTimeout(() => setErrors((prev) => ({ ...prev, [field]: '' })), 3000);
      }
      // Allow only numbers and a single decimal point
      filteredValue = value.replace(/[^0-9.]/g, '');
      const parts = filteredValue.split('.');
      if (parts.length > 2) {
        filteredValue = parts[0] + '.' + parts.slice(1).join('');
      }
    } else if (field === 'name' && typeof value === 'string') {
      // Optional: basic filtering for product names if relevant
      filteredValue = value;
    }

    setFormData(prev => {
      const newFormData = { ...prev, [field]: filteredValue };

      // If price, quantity, discount, or tax changes, update the totalAmount
      if (['price', 'quantity', 'discount', 'tax'].includes(field)) {
        newFormData.totalAmount = calculateTotalAmount(newFormData);
      }

      return newFormData;
    });
  };

  const handleExistingPackageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const pkgId = e.target.value;
    if (!pkgId) {
      return;
    }
    const pkg = packagesData.find(p => p.id.toString() === pkgId);
    if (pkg) {
      setFormData(prev => {
        const newFormData = {
          ...prev,
          name: pkg.title,
          price: pkg.price,
          description: pkg.description,
          tax: pkg.tax,
          quantity: '1',
          discount: '0',
        };
        newFormData.totalAmount = calculateTotalAmount(newFormData);
        return newFormData;
      });
    }
  };

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      setFormData(prev => ({ ...prev, image: file }));
      setHasImage(true);
    }
  };

  const [imagePlacement, setImagePlacement] = useState<'above' | 'below'>('above');

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);

    const file = event.dataTransfer.files[0];
    if (file && (file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'image/jpg')) {
      setFormData(prev => ({ ...prev, image: file }));
      setHasImage(true);
    }
  };

  const handleRemoveImage = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    setFormData(prev => ({ ...prev, image: null }));
    setHasImage(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const id = formData.id || Math.random().toString(36).substring(2, 9);

    const newPackage = { ...formData, id };


    if (formData.name.trim()) {

      onSubmit(newPackage);

      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/25 text-black text-md bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl w-full max-w-2xl mx-auto max-h-[80vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="flex justify-between items-center py-3 px-4 border-gray-200 ">
          <h2 className="text-2xl font-semibold text-gray-900">Add Item</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 scroller">
          {/* Existing Product/Package Dropdown */}
          <div className="mb-6">
            <label className="block text-md text-black font-medium mb-2">
              Choose Existing Product/Package
            </label>
            <select
              className="w-full px-3 py-2 border text-[#978F8F] border-[#978F8F] rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              defaultValue=""
              onChange={handleExistingPackageChange}
            >
              <option value="">No existing product/package</option>
              {packagesData.map(pkg => (
                <option key={pkg.id} value={pkg.id}>{pkg.title}</option>
              ))}
            </select>
          </div>

          {/* Product/Package Name */}
          <div className="mb-6">
            <label className="block text-md text-black font-medium mb-2" htmlFor="productName">
              Product/Package Name *
            </label>
            <input
              id="productName"
              type="text"
              required
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className="w-full px-3 text-[#978F8F] py-2 border border-[#978F8F] rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter a Product/Package Name"
            />
          </div>

          {/* Image Upload */}
          <div className="mb-6">
            <label className="block text-md font-medium text-black mb-3">Image (optional)</label>
            <div className="flex flex-col lg:flex-row lg:items-start lg:gap-6">
              <div className="flex-1">
                <div
                  className={`relative min-w-74 w-full h-48 rounded-lg border-2 p-2 border-dashed transition-all duration-200
                    ${isDragging ? 'border-blue-500 bg-blue-50' : hasImage ? 'border-gray-300 bg-gray-50' : 'border-gray-300 hover:border-gray-400'}
                  `}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  {!hasImage && (
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/png,image/jpeg,image/jpg"
                      onChange={handleImageUpload}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                  )}
                  {hasImage ? (
                    <div className="flex items-center justify-center h-full p-4 relative z-10">
                      <div className="flex flex-col items-center">
                        <div className="w-24 h-24 bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden relative">
                          <img
                            src={getImageUrl(formData.image)}
                            alt="Uploaded"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={handleRemoveImage}
                          className="mt-3 px-4 py-2 text-sm font-medium text-red-600 bg-red-100 rounded-lg hover:bg-red-200 transition-colors pointer-events-auto"
                        >
                          Remove Image
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full">
                      <SlCloudUpload className="text-4xl text-gray-400 mb-2" />
                      <p className="text-sm text-gray-600">Click to upload an image</p>
                    </div>
                  )}
                </div>
              </div>
              <ImageReplacementTab imagePlacement={formData.imagePlacement} setImagePlacement={(value: any) => handleInputChange('imagePlacement', value)} />
            </div>
          </div>

          {/* Description */}
          <RichTextEditor
            label="Description"
            content={formData.description}
            onChange={(content) => handleInputChange('description', content)}
            placeholder="Type Project Description..."
          />

          {/* Pricing Inputs */}
          <div className="flex flex-wrap sm:flex-nowrap gap-2 items-center justify-between">
            <div className="flex flex-col">
              <label htmlFor="price">Price</label>
              <input
                id="price"
                type="number"
                value={formData.price}
                onChange={(e) => handleInputChange('price', e.target.value)}
                className=" w-full sm:w-40 border border-gray-400 p-1 rounded-md"
              />
              {errors.price && <p className='text-[10px] text-red-500 mt-1 max-w-[160px] leading-tight'>{errors.price}</p>}
            </div>
            <div className="flex flex-col">
              <label htmlFor="quantity">Quantity</label>
              <input
                id="quantity"
                type="number"
                value={formData.quantity}
                onChange={(e) => handleInputChange('quantity', e.target.value)}
                className=" w-full sm:w-40  border border-gray-400 p-1 rounded-md"
              />
              {errors.quantity && <p className='text-[10px] text-red-500 mt-1 max-w-[160px] leading-tight'>{errors.quantity}</p>}
            </div>
            <div className="flex flex-col">
              <label htmlFor="discount">Discount (%)</label>
              <input
                id="discount"
                type="number"
                value={formData.discount}
                onChange={(e) => handleInputChange('discount', e.target.value)}
                min={0}
                step={0.01}
                className=" w-full sm:w-40  border border-gray-400 p-1 rounded-md"
              />
              {errors.discount && <p className='text-[10px] text-red-500 mt-1 max-w-[160px] leading-tight'>{errors.discount}</p>}
            </div>
          </div>

          {/* Tax */}
          <div className="my-6">
            <label className="block text-md font-medium text-black mb-2">
              Tax
            </label>
            <select
              className="w-full px-3 py-2 border text-gray-400 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={formData.tax}
              onChange={(e) => handleInputChange('tax', e.target.value)}
            >
              <option value="0">No Tax</option>
              <option value="5">5% Tax</option>
            </select>
          </div>

          {/* Total Amount */}
          <div className="w-full bg-[#EDEDED] rounded-md p-7">
            <div className="my-2">
              <h1 className="text-xl font-medium">Total Amount</h1>
              <h3 className="font-bold text-xl my-1">${formData.totalAmount}</h3>
            </div>
            <hr className="text-[#C6C6C6] border-1" />
            <div className="mt-4 flex flex-col gap-3">
              <div className="flex w-full items-center justify-between ">
                <p>Price</p>
                <p>{formData.price} $</p>
              </div>
              <div className="flex w-full items-center justify-between ">
                <p>Tax</p>
                <p>{formData.tax} %</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 lg:w-2/3 my-3">
            <button className="w-full sm:w-40 bg-[#01B0E9] text-white py-3 rounded-full mb-2 sm:mb-0 cursor-pointer">
              Save Invoice
            </button>
            <button
              onClick={() => onClose()}
              className="w-full sm:w-32 border border-gray-400 text-black py-3 rounded-full cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddInvoiceModal;
