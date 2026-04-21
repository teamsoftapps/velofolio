'use client';

import React, { useState } from 'react';
import { colors } from '../../utils/colors';
import { MdClose, MdCalendarToday, MdLocationOn, MdPersonAdd, MdCheck } from 'react-icons/md';
import Image from 'next/image';

interface JobData {
    jobName: string;
    clientName: string;
    location: string;
    date: string;
    time: string;
    status: 'completed' | 'in-progress' | 'pending';
    deliverables: string[];
    teamIds: string[];
    notes?: string;
}

interface Member {
    id: string;
    name: string;
    image?: string;
    role?: string;
}

interface AddJobModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAddJob: (data: JobData) => void;
    members?: Member[];
}

const statusOptions = [
    { value: 'pending', label: 'Pending', color: 'bg-gray-400', bgColor: 'bg-gray-100', textColor: 'text-gray-700' },
    { value: 'in-progress', label: 'In Progress', colorStr: colors.primary, bgColor: 'bg-blue-50', textColorStr: colors.primary },
    { value: 'completed', label: 'Completed', colorStr: colors.success, bgColor: 'bg-emerald-50', textColorStr: colors.success },
];

const defaultDeliverables = ['Full Film', 'Teaser', 'RAW Photos', 'Edited Photos', 'Album', 'Drone Footage'];

const defaultMembers: Member[] = [
    { id: '1', name: 'Sarah Johnson', image: '/teampic1.png', role: 'Lead Photographer' },
    { id: '2', name: 'Priya', image: '/teampic2.png', role: 'Photographer' },
    { id: '3', name: 'Sofia', image: '/teampic3.png', role: 'Assistant' },
    { id: '4', name: 'Mike Chen', image: '/teampic4.png', role: 'Videographer' },
];

export default function AddJobModal({
    isOpen,
    onClose,
    onAddJob,
    members = defaultMembers,
}: AddJobModalProps) {
    const [formData, setFormData] = useState<JobData>({
        jobName: '',
        clientName: '',
        location: '',
        date: '',
        time: '',
        status: 'pending',
        deliverables: [],
        teamIds: [],
        notes: '',
    });

    const [customDeliverable, setCustomDeliverable] = useState('');
    const [showTeamDropdown, setShowTeamDropdown] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        if (name === 'jobName' || name === 'clientName') {
            if (/[0-9]/.test(value)) {
                const label = name === 'jobName' ? 'Job name' : 'Client name';
                setErrors(prev => ({ ...prev, [name]: `${label} should not contain numbers` }));
                setTimeout(() => setErrors(prev => ({ ...prev, [name]: '' })), 3000);
            }
            const filteredValue = value.replace(/[0-9]/g, '');
            setFormData(prev => ({ ...prev, [name]: filteredValue }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleDeliverableToggle = (item: string) => {
        setFormData(prev => ({
            ...prev,
            deliverables: prev.deliverables.includes(item)
                ? prev.deliverables.filter(d => d !== item)
                : [...prev.deliverables, item]
        }));
    };

    const handleAddCustomDeliverable = () => {
        if (customDeliverable.trim() && !formData.deliverables.includes(customDeliverable.trim())) {
            setFormData(prev => ({
                ...prev,
                deliverables: [...prev.deliverables, customDeliverable.trim()]
            }));
            setCustomDeliverable('');
        }
    };

    const handleTeamToggle = (memberId: string) => {
        setFormData(prev => ({
            ...prev,
            teamIds: prev.teamIds.includes(memberId)
                ? prev.teamIds.filter(id => id !== memberId)
                : [...prev.teamIds, memberId]
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onAddJob(formData);
        onClose();
        setFormData({
            jobName: '',
            clientName: '',
            location: '',
            date: '',
            time: '',
            status: 'pending',
            deliverables: [],
            teamIds: [],
            notes: '',
        });
    };

    const selectedTeamMembers = members.filter(m => formData.teamIds.includes(m.id));

    if (!isOpen) return null;

    return (
        <>
            <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />
            <div className="fixed inset-0 flex items-center justify-center z-50 p-4" >
                <div className="bg-white rounded-md shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center justify-between p-4 border-b border-gray-100">
                        <h2 className="text-lg font-medium text-gray-900">Add New Job</h2>
                        <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
                            <MdClose className="w-6 h-6" />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="p-4 space-y-4">
                        {/* Job Name & Client */}
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2 block">
                                    Job Name
                                </label>
                                <input
                                    type="text"
                                    name="jobName"
                                    required
                                    maxLength={100}
                                    placeholder="e.g., Wedding Ceremony"
                                    value={formData.jobName}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#01B0E9] focus:border-transparent"
                                />
                                {errors.jobName && <p className="text-xs text-red-500 mt-1">{errors.jobName}</p>}
                            </div>
                            <div>
                                <label className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2 block">
                                    Client Name
                                </label>
                                <input
                                    type="text"
                                    name="clientName"
                                    required
                                    maxLength={100}
                                    placeholder="e.g., Sarah & John"
                                    value={formData.clientName}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#01B0E9] focus:border-transparent"
                                />
                                {errors.clientName && <p className="text-xs text-red-500 mt-1">{errors.clientName}</p>}
                            </div>
                        </div>

                        {/* Status */}
                        <div>
                            <label className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2 block">
                                Status
                            </label>
                            <div className="flex gap-2">
                                {statusOptions.map((status) => (
                                    <button
                                        key={status.value}
                                        type="button"
                                        onClick={() => setFormData({ ...formData, status: status.value as JobData['status'] })}
                                        className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all ${formData.status === status.value
                                            ? `${status.bgColor} border-transparent`
                                            : 'bg-white border-gray-300 text-gray-600 hover:bg-gray-50'
                                            }`}
                                        style={formData.status === status.value && status.textColorStr ? { color: status.textColorStr } : {}}
                                    >
                                        <div className={`w-2 h-2 rounded-full ${formData.status === status.value && !status.colorStr ? status.color : 'bg-transparent'}`} style={formData.status === status.value && status.colorStr ? { backgroundColor: status.colorStr } : {}} />
                                        <span className="text-sm font-medium">{status.label}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Location & Date/Time */}
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2 block">
                                    Location
                                </label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        required
                                        maxLength={255}
                                        placeholder="Enter location..."
                                        value={formData.location}
                                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                        className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#01B0E9] focus:border-transparent"
                                    />
                                    <MdLocationOn className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                                <div>
                                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2 block">Date</label>
                                    <input
                                        type="date"
                                        required
                                        value={formData.date}
                                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                        className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#01B0E9] focus:border-transparent"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2 block">Time</label>
                                    <input
                                        type="time"
                                        required
                                        value={formData.time}
                                        onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                                        className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#01B0E9] focus:border-transparent"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Deliverables */}
                        <div>
                            <label className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2 block">
                                Deliverables
                            </label>
                            <div className="flex flex-wrap gap-2 mb-2">
                                {defaultDeliverables.map((item) => (
                                    <button
                                        key={item}
                                        type="button"
                                        onClick={() => handleDeliverableToggle(item)}
                                        className={`px-3 py-1.5 rounded-md text-sm transition-all ${formData.deliverables.includes(item)
                                            ? 'text-white'
                                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                            }`}
                                        style={formData.deliverables.includes(item) ? { backgroundColor: colors.primary } : {}}
                                    >
                                        {item}
                                    </button>
                                ))}
                            </div>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    maxLength={100}
                                    placeholder="Add custom deliverable..."
                                    value={customDeliverable}
                                    onChange={(e) => setCustomDeliverable(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddCustomDeliverable())}
                                    className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#01B0E9] focus:border-transparent"
                                />
                                <button
                                    type="button"
                                    onClick={handleAddCustomDeliverable}
                                    className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md transition-colors"
                                >
                                    <MdCheck className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        {/* Team */}
                        <div className="relative">
                            <label className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2 block">
                                Team
                            </label>
                            <button
                                type="button"
                                onClick={() => setShowTeamDropdown(!showTeamDropdown)}
                                className="w-full flex items-center justify-between px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm hover:bg-gray-100 transition-colors"
                            >
                                <div className="flex items-center gap-2">
                                    {selectedTeamMembers.length > 0 ? (
                                        <div className="flex -space-x-2">
                                            {selectedTeamMembers.slice(0, 3).map((member) => (
                                                <Image
                                                    key={member.id}
                                                    src={member.image || '/teampic1.png'}
                                                    alt={member.name}
                                                    width={24}
                                                    height={24}
                                                    className="w-6 h-6 rounded-full object-cover border-2 border-white"
                                                />
                                            ))}
                                            {selectedTeamMembers.length > 3 && (
                                                <span className="w-6 h-6 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-xs text-gray-600">
                                                    +{selectedTeamMembers.length - 3}
                                                </span>
                                            )}
                                        </div>
                                    ) : (
                                        <MdPersonAdd className="w-4 h-4 text-gray-400" />
                                    )}
                                    <span className={selectedTeamMembers.length > 0 ? 'text-gray-900' : 'text-gray-400'}>
                                        {selectedTeamMembers.length > 0
                                            ? `${selectedTeamMembers.length} member${selectedTeamMembers.length > 1 ? 's' : ''} selected`
                                            : 'Assign team members...'}
                                    </span>
                                </div>
                                <svg className={`w-4 h-4 text-gray-400 transition-transform ${showTeamDropdown ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>

                            {showTeamDropdown && (
                                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-48 overflow-y-auto">
                                    {members.map((member) => {
                                        const isSelected = formData.teamIds.includes(member.id);
                                        return (
                                            <button
                                                key={member.id}
                                                type="button"
                                                onClick={() => handleTeamToggle(member.id)}
                                                className={`w-full flex items-center justify-between px-3 py-2 text-left text-sm hover:bg-gray-50 transition-colors ${isSelected ? 'bg-blue-50' : ''}`}
                                            >
                                                <div className="flex items-center gap-2">
                                                    <Image
                                                        src={member.image || '/teampic1.png'}
                                                        alt={member.name}
                                                        width={28}
                                                        height={28}
                                                        className="w-7 h-7 rounded-full object-cover"
                                                    />
                                                    <div>
                                                        <p className="font-medium text-gray-900">{member.name}</p>
                                                        <p className="text-xs text-gray-500">{member.role}</p>
                                                    </div>
                                                </div>
                                                {isSelected && (
                                                    <div className="w-5 h-5 rounded flex items-center justify-center" style={{ backgroundColor: colors.primary }}>
                                                        <MdCheck className="w-3 h-3 text-white" />
                                                    </div>
                                                )}
                                            </button>
                                        );
                                    })}
                                </div>
                            )}
                        </div>

                        {/* Notes */}
                        <div>
                            <label className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2 block">
                                Notes (Optional)
                            </label>
                            <textarea
                                rows={2}
                                maxLength={2000}
                                value={formData.notes}
                                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                                placeholder="Add job details, special requirements..."
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
                                className="flex-1 px-4 py-2 text-sm font-medium text-white hover:brightness-110 rounded-md transition-colors"
                                style={{ backgroundColor: colors.primary }}
                            >
                                Add Job
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}