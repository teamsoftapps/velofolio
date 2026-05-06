'use client';

import React, { useState } from 'react';
import { MdClose, MdCalendarToday } from 'react-icons/md';
import Image from 'next/image';

interface TimeOffData {
    type: 'vacation' | 'sick' | 'personal' | 'other';
    startDate: string;
    endDate: string;
    notes: string;
}

interface AddTimeOffModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAddTimeOff: (data: TimeOffData) => void;
    memberName?: string;
    memberImage?: string;
}

const timeOffTypes = [
    { value: 'timeoff', label: 'Time Off', color: 'bg-blue-500' },
    { value: 'booked', label: 'Booked', color: 'bg-black' },
    { value: 'partial', label: 'Partial', color: 'bg-yellow-500' },
    { value: 'available', label: 'Available', color: 'bg-gray-400' },
];

export default function AddTimeOffModal({
    isOpen,
    onClose,
    onAddTimeOff,
    memberName = 'Sarah Johnson',
    memberImage = '/teampic1.png',
}: AddTimeOffModalProps) {
    const [formData, setFormData] = useState<TimeOffData>({
        type: 'vacation',
        startDate: '',
        endDate: '',
        notes: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onAddTimeOff(formData);
        onClose();
        // Reset form
        setFormData({
            type: 'vacation',
            startDate: '',
            endDate: '',
            notes: '',
        });
    };

    if (!isOpen) return null;

    return (
        <>
            {/* Backdrop */}
            <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />

            {/* Modal */}
            <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-md shadow-xl w-full max-w-md max-h-screen overflow-y-auto">
                    {/* Header */}
                    <div className="flex items-center justify-between p-4 border-b border-gray-100">
                        <h2 className="text-lg font-medium text-gray-900">
                            Add Time Off
                        </h2>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            <MdClose className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Member Info Card */}
                    <div className="px-4 py-3 bg-gray-50 mx-4 mt-4 rounded-lg">
                        <div className="flex items-center gap-3">
                            <Image
                                src={memberImage}
                                alt={memberName}
                                width={40}
                                height={40}
                                className="w-10 h-10 rounded-full object-cover"
                            />
                            <div>
                                <p className="text-sm font-medium text-gray-900">{memberName}</p>
                                <p className="text-xs text-gray-500">Requesting time off</p>
                            </div>
                        </div>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="p-4 space-y-4">
                        {/* Time Off Type */}
                        <div>
                            <label className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2 block">
                                Time Off Type
                            </label>
                            <div className="grid grid-cols-2 gap-2">
                                {timeOffTypes.map((type) => (
                                    <button
                                        key={type.value}
                                        type="button"
                                        onClick={() => setFormData({ ...formData, type: type.value as TimeOffData['type'] })}
                                        className={`flex items-center gap-2 p-3 rounded-lg border transition-all ${formData.type === type.value
                                            ? 'border-[var(--primary-color)] bg-blue-50'
                                            : 'border-gray-200 hover:bg-gray-50'
                                            }`}
                                    >
                                        <div className={`w-3 h-3 rounded-full ${type.color}`} />
                                        <span className={`text-sm ${formData.type === type.value ? 'font-medium text-gray-900' : 'text-gray-600'}`}>
                                            {type.label}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Date Range */}
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2 block">
                                    Start Date
                                </label>
                                <div className="relative">
                                    <input
                                        type="date"
                                        required
                                        value={formData.startDate}
                                        onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                                        className="w-full pl-3 pr-10 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent"
                                    />
                                    <MdCalendarToday className="absolute right-3 top-2.5 w-4 h-4 text-gray-400 pointer-events-none" />
                                </div>
                            </div>
                            <div>
                                <label className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2 block">
                                    End Date
                                </label>
                                <div className="relative">
                                    <input
                                        type="date"
                                        required
                                        value={formData.endDate}
                                        onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                                        className="w-full pl-3 pr-10 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent"
                                    />
                                    <MdCalendarToday className="absolute right-3 top-2.5 w-4 h-4 text-gray-400 pointer-events-none" />
                                </div>
                            </div>
                        </div>

                        {/* Notes */}
                        <div>
                            <label className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2 block">
                                Notes (Optional)
                            </label>
                            <textarea
                                rows={3}
                                value={formData.notes}
                                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                                placeholder="Add any additional details..."
                                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent resize-none"
                            />
                        </div>

                        {/* Legend Reference */}
                        <div className="flex items-center gap-4 pt-2 text-xs text-gray-500">
                            <div className="flex items-center gap-1.5">
                                <div className="w-3 h-3 rounded-full bg-gray-300" />
                                <span>Available</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                                <span>Partial</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <div className="w-3 h-3 rounded-full bg-black" />
                                <span>Booked</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <div className="w-3 h-3 rounded-full bg-blue-500" />
                                <span>Time Off</span>
                            </div>
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
                                className="flex-1 px-4 py-2 text-sm font-medium text-white bg-[var(--primary-color)] hover:bg-[#0095c7] rounded-md transition-colors"
                            >
                                Add Time Off
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
