'use client';

import React, { useState } from 'react';
import { MdClose, MdCalendarToday, MdPerson } from 'react-icons/md';
import Image from 'next/image';

interface ShootData {
    title: string;
    date: string;
    isAllDay: boolean;
    startTime?: string;
    endTime?: string;
    personId: string;
    personName: string;
    type: 'job' | 'lead' | 'personal' | 'other';
    category: string;
    status: 'confirmed' | 'tentative' | 'cancelled';
    notes?: string;
}

interface Person {
    id: string;
    name: string;
    image?: string;
    role?: string;
}

interface AddShootModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAddShoot: (data: ShootData) => void;
    people?: Person[];
}

const typeOptions = [
    { value: 'job', label: 'Job', color: 'bg-emerald-100', textColor: 'text-emerald-700', borderColor: 'border-emerald-200' },
    { value: 'lead', label: 'Lead', color: 'bg-red-50', textColor: 'text-red-600', borderColor: 'border-red-200' },
    { value: 'personal', label: 'Personal', color: 'bg-blue-50', textColor: 'text-blue-600', borderColor: 'border-blue-200' },
    { value: 'other', label: 'Other', color: 'bg-gray-100', textColor: 'text-gray-600', borderColor: 'border-gray-200' },
];

const categoryOptions = [
    'Wedding', 'Engagement', 'Portrait', 'Corporate', 'Event',
    'Product', 'Real Estate', 'Web Development', 'Meeting', 'Other'
];

const statusOptions = [
    { value: 'confirmed', label: 'Confirmed', dotColor: 'bg-emerald-500' },
    { value: 'tentative', label: 'Tentative', dotColor: 'bg-yellow-500' },
    { value: 'cancelled', label: 'Cancelled', dotColor: 'bg-red-500' },
];

const defaultPeople: Person[] = [
    { id: '1', name: 'Sarah Johnson', image: '/teampic1.png', role: 'Lead Photographer' },
    { id: '2', name: 'David P.', image: '/teampic2.png', role: 'Photographer' },
    { id: '3', name: 'Mike Chen', image: '/teampic3.png', role: 'Developer' },
    { id: '4', name: 'Priya', image: '/teampic4.png', role: 'Designer' },
];

export default function AddShootModal({
    isOpen,
    onClose,
    onAddShoot,
    people = defaultPeople,
}: AddShootModalProps) {
    const [formData, setFormData] = useState<ShootData>({
        title: '',
        date: '',
        isAllDay: true,
        startTime: '',
        endTime: '',
        personId: '',
        personName: '',
        type: 'job',
        category: 'Wedding',
        status: 'confirmed',
        notes: '',
    });

    const [showPersonDropdown, setShowPersonDropdown] = useState(false);

    const handlePersonSelect = (person: Person) => {
        setFormData({
            ...formData,
            personId: person.id,
            personName: person.name
        });
        setShowPersonDropdown(false);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onAddShoot(formData);
        onClose();
        setFormData({
            title: '',
            date: '',
            isAllDay: true,
            startTime: '',
            endTime: '',
            personId: '',
            personName: '',
            type: 'job',
            category: 'Wedding',
            status: 'confirmed',
            notes: '',
        });
    };

    const selectedPerson = people.find(p => p.id === formData.personId);
    const selectedType = typeOptions.find(t => t.value === formData.type);

    if (!isOpen) return null;

    return (
        <>
            <div className="fixed inset-0  bg-black/50 z-40 w-full " onClick={onClose} />
            <div className="fixed inset-0 flex top-16  items-center justify-center z-50 p-4" onClick={onClose} // 👈 catch outside clicks here
            >
                <div className="bg-white rounded-md shadow-xl w-full max-w-xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center justify-between p-4  border-gray-100">
                        <h2 className="text-lg font-medium text-gray-900">Add Shoot / Appointment</h2>
                        <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
                            <MdClose className="w-6 h-6" />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="p-4 space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2 block">
                                    Title
                                </label>
                                <input
                                    type="text"
                                    required
                                    placeholder="e.g., Pre-Wedding Shoot"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#01B0E9] focus:border-transparent"
                                />
                            </div>
                            <div>
                                <label className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2 block">
                                    Date & Time
                                </label>
                                <input
                                    type="date"
                                    required
                                    value={formData.date}
                                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                    className="w-full pl-3 pr-10 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#01B0E9] focus:border-transparent"
                                />
                                <MdCalendarToday className="absolute right-3 top-2.5 w-4 h-4 text-gray-400 pointer-events-none" />
                            </div>
                        </div>
                        {/* Title */}


                        {/* Date & Time */}

                        <div className="space-y-2">
                            <div className="relative">

                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={formData.isAllDay}
                                        onChange={(e) => setFormData({ ...formData, isAllDay: e.target.checked })}
                                        className="w-4 h-4 text-[#01B0E9] border-gray-300 rounded focus:ring-[#01B0E9]"
                                    />
                                    <span className="text-sm text-gray-700">All Day</span>
                                </label>

                                {!formData.isAllDay && (
                                    <div className="grid grid-cols-2 gap-2">
                                        <input
                                            type="time"
                                            value={formData.startTime}
                                            onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                                            className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#01B0E9] focus:border-transparent"
                                        />
                                        <input
                                            type="time"
                                            value={formData.endTime}
                                            onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                                            className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#01B0E9] focus:border-transparent"
                                        />
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Assigned To */}
                        <div className="relative">
                            <label className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2 block">
                                Assigned To
                            </label>
                            <button
                                type="button"
                                onClick={() => setShowPersonDropdown(!showPersonDropdown)}
                                className="w-full flex items-center justify-between px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm hover:bg-gray-100 transition-colors"
                            >
                                <div className="flex items-center gap-2">
                                    {selectedPerson ? (
                                        <>
                                            <Image
                                                src={selectedPerson.image || '/teampic1.png'}
                                                alt={selectedPerson.name}
                                                width={24}
                                                height={24}
                                                className="w-6 h-6 rounded-full object-cover"
                                            />
                                            <span className="text-gray-900">{selectedPerson.name}</span>
                                        </>
                                    ) : (
                                        <>
                                            <MdPerson className="w-4 h-4 text-gray-400" />
                                            <span className="text-gray-400">Select person...</span>
                                        </>
                                    )}
                                </div>
                                <svg className={`w-4 h-4 text-gray-400 transition-transform ${showPersonDropdown ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>

                            {showPersonDropdown && (
                                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-48 overflow-y-auto">
                                    {people.map((person) => (
                                        <button
                                            key={person.id}
                                            type="button"
                                            onClick={() => handlePersonSelect(person)}
                                            className="w-full flex items-center gap-2 px-3 py-2 text-left text-sm hover:bg-gray-50 transition-colors"
                                        >
                                            <Image
                                                src={person.image || '/teampic1.png'}
                                                alt={person.name}
                                                width={28}
                                                height={28}
                                                className="w-7 h-7 rounded-full object-cover"
                                            />
                                            <div>
                                                <p className="font-medium text-gray-900">{person.name}</p>
                                                <p className="text-xs text-gray-500">{person.role}</p>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Type & Category */}
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2 block">
                                    Type
                                </label>
                                <div className="flex flex-wrap gap-1.5">
                                    {typeOptions.map((type) => (
                                        <button
                                            key={type.value}
                                            type="button"
                                            onClick={() => setFormData({ ...formData, type: type.value as ShootData['type'] })}
                                            className={`px-3 py-1.5 rounded-md text-xs font-medium border transition-all ${formData.type === type.value
                                                ? `${type.color} ${type.textColor} ${type.borderColor}`
                                                : 'bg-gray-100 text-gray-600 border-gray-200 hover:bg-gray-200'
                                                }`}
                                        >
                                            {type.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2 block">
                                    Category
                                </label>
                                <select
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#01B0E9] focus:border-transparent"
                                >
                                    {categoryOptions.map((cat) => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Status */}
                        <div>
                            <label className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2 block">
                                Status
                            </label>
                            <div className="flex gap-3">
                                {statusOptions.map((status) => (
                                    <button
                                        key={status.value}
                                        type="button"
                                        onClick={() => setFormData({ ...formData, status: status.value as ShootData['status'] })}
                                        className={`flex items-center gap-2 px-3 py-2 rounded-full border transition-all ${formData.status === status.value
                                            ? 'bg-gray-900 text-white border-gray-900'
                                            : 'bg-white border-gray-300 text-gray-600 hover:bg-gray-50'
                                            }`}
                                    >
                                        <div className={`w-2 h-2 rounded-full ${formData.status === status.value ? 'bg-white' : status.dotColor}`} />
                                        <span className="text-sm font-medium">{status.label}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Preview Card */}
                        <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Preview</p>
                            <div className="flex items-center gap-3">
                                <div className={`w-2 h-2 rounded-full ${statusOptions.find(s => s.value === formData.status)?.dotColor}`} />
                                <span className="text-sm text-gray-500">
                                    {formData.date || '2025-10-01'}
                                </span>
                                <span className="text-sm text-gray-400">
                                    {formData.isAllDay ? 'All Day' : 'Timed'}
                                </span>
                                <span className="text-sm font-medium text-gray-900">
                                    {selectedPerson?.name || 'Select person'}
                                </span>
                            </div>
                            <div className="flex gap-2 mt-2">
                                <span className={`px-2 py-0.5 rounded text-xs font-medium border ${selectedType?.color} ${selectedType?.textColor} ${selectedType?.borderColor}`}>
                                    {selectedType?.label}
                                </span>
                                <span className="px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-600 border border-gray-200">
                                    {formData.category}
                                </span>
                            </div>
                        </div>

                        {/* Notes */}
                        <div>
                            <label className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2 block">
                                Notes (Optional)
                            </label>
                            <textarea
                                rows={2}
                                value={formData.notes}
                                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                                placeholder="Add any additional details..."
                                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#01B0E9] focus:border-transparent resize-none"
                            />
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                            <button
                                type="button"
                                onClick={onClose}
                                className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="flex-1 px-4 py-2 text-sm font-medium text-white bg-[#01B0E9] hover:bg-[#0095c7] rounded-md transition-colors"
                            >
                                Add Shoot
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}