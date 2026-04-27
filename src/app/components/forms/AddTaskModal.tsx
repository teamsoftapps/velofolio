'use client';

import React, { useState } from 'react';
import { MdClose, MdCalendarToday, MdPerson, MdWork } from 'react-icons/md';
import Image from 'next/image';

interface TaskData {
    taskName: string;
    jobId: string;
    jobName: string;
    dueDate: string;
    priority: 'high' | 'medium' | 'low';
    status: 'pending' | 'in-progress' | 'completed';
    assigneeId?: string;
    notes?: string;
}

interface Job {
    id: string;
    name: string;
    client: string;
}

interface Member {
    id: string;
    name: string;
    image?: string;
}

interface AddTaskModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAddTask: (data: TaskData) => void;
    jobs?: Job[];
    members?: Member[];
}

const priorityOptions = [
    { value: 'high', label: 'High', color: 'bg-orange-500', textColor: 'text-orange-600', bgColor: 'bg-orange-50' },
    { value: 'medium', label: 'Medium', color: 'bg-[#01B0E9]', textColor: 'text-[#01B0E9]', bgColor: 'bg-blue-50' },
    { value: 'low', label: 'Low', color: 'bg-yellow-500', textColor: 'text-yellow-600', bgColor: 'bg-yellow-50' },
];

const statusOptions = [
    { value: 'pending', label: 'Pending', color: 'bg-gray-400' },
    { value: 'in-progress', label: 'In Progress', color: 'bg-yellow-400' },
    { value: 'completed', label: 'Completed', color: 'bg-emerald-500' },
];

const defaultJobs: Job[] = [
    { id: '1', name: 'Wedding Shoot', client: 'John & Emma' },
    { id: '2', name: 'Corporate Gala', client: 'BlueTech' },
    { id: '3', name: 'Birthday Event', client: 'Sarah' },
    { id: '4', name: 'Engagement Session', client: 'Alex & Mia' },
];

const defaultMembers: Member[] = [
    { id: '1', name: 'Sarah Johnson', image: '/teampic1.png' },
    { id: '2', name: 'John Doe', image: '/teampic2.png' },
    { id: '3', name: 'Mike Chen', image: '/teampic3.png' },
];

export default function AddTaskModal({
    isOpen,
    onClose,
    onAddTask,
    jobs = defaultJobs,
    members = defaultMembers,
}: AddTaskModalProps) {
    const [formData, setFormData] = useState<TaskData>({
        taskName: '',
        jobId: '',
        jobName: '',
        dueDate: '',
        priority: 'medium',
        status: 'pending',
        assigneeId: '',
        notes: '',
    });

    const [showJobDropdown, setShowJobDropdown] = useState(false);
    const [showAssigneeDropdown, setShowAssigneeDropdown] = useState(false);

    const handleJobSelect = (job: Job) => {
        setFormData({
            ...formData,
            jobId: job.id,
            jobName: `${job.name} - ${job.client}`
        });
        setShowJobDropdown(false);
    };

    const handleAssigneeSelect = (member: Member) => {
        setFormData({ ...formData, assigneeId: member.id });
        setShowAssigneeDropdown(false);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onAddTask(formData);
        onClose();
        setFormData({
            taskName: '',
            jobId: '',
            jobName: '',
            dueDate: '',
            priority: 'medium',
            status: 'pending',
            assigneeId: '',
            notes: '',
        });
    };

    const selectedAssignee = members.find(m => m.id === formData.assigneeId);
    const selectedJob = jobs.find(j => j.id === formData.jobId);

    if (!isOpen) return null;

    return (
        <>
            <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />
            <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-md shadow-xl w-full max-w-lg max-h-screen overflow-y-auto">
                    <div className="flex items-center justify-between p-4 border-b border-gray-100">
                        <h2 className="text-lg font-medium text-gray-900">Add New Task</h2>
                        <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
                            <MdClose className="w-6 h-6" />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="p-4 space-y-4">
                        <div>
                            <label className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2 block">
                                Task Name
                            </label>
                            <input
                                type="text"
                                required
                                placeholder="Enter task name..."
                                value={formData.taskName}
                                onChange={(e) => setFormData({ ...formData, taskName: e.target.value })}
                                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#01B0E9] focus:border-transparent"
                            />
                        </div>

                        <div className="relative">
                            <label className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2 block">
                                Job / Project
                            </label>
                            <button
                                type="button"
                                onClick={() => setShowJobDropdown(!showJobDropdown)}
                                className="w-full flex items-center justify-between px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm text-gray-900 hover:bg-gray-100 transition-colors"
                            >
                                <div className="flex items-center gap-2">
                                    <MdWork className="w-4 h-4 text-gray-400" />
                                    <span className={selectedJob ? 'text-gray-900' : 'text-gray-400'}>
                                        {selectedJob ? `${selectedJob.name} - ${selectedJob.client}` : 'Select a job...'}
                                    </span>
                                </div>
                                <svg className={`w-4 h-4 text-gray-400 transition-transform ${showJobDropdown ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>

                            {showJobDropdown && (
                                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-48 overflow-y-auto">
                                    {jobs.map((job) => (
                                        <button
                                            key={job.id}
                                            type="button"
                                            onClick={() => handleJobSelect(job)}
                                            className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0"
                                        >
                                            <p className="font-medium text-gray-900">{job.name}</p>
                                            <p className="text-xs text-gray-500">{job.client}</p>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2 block">
                                    Due Date
                                </label>
                                <div className="relative">
                                    <input
                                        type="date"
                                        required
                                        value={formData.dueDate}
                                        onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                                        className="w-full pl-3 pr-10 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#01B0E9] focus:border-transparent"
                                    />
                                    <MdCalendarToday className="absolute right-3 top-2.5 w-4 h-4 text-gray-400 pointer-events-none" />
                                </div>
                            </div>

                            <div className="relative">
                                <label className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2 block">
                                    Assignee
                                </label>
                                <button
                                    type="button"
                                    onClick={() => setShowAssigneeDropdown(!showAssigneeDropdown)}
                                    className="w-full flex items-center justify-between px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm hover:bg-gray-100 transition-colors"
                                >
                                    <div className="flex items-center gap-2">
                                        {selectedAssignee ? (
                                            <>
                                                <Image
                                                    src={selectedAssignee.image || '/teampic1.png'}
                                                    alt={selectedAssignee.name}
                                                    width={24}
                                                    height={24}
                                                    className="w-6 h-6 rounded-full object-cover"
                                                />
                                                <span className="text-gray-900">{selectedAssignee.name}</span>
                                            </>
                                        ) : (
                                            <>
                                                <MdPerson className="w-4 h-4 text-gray-400" />
                                                <span className="text-gray-400">Assign to...</span>
                                            </>
                                        )}
                                    </div>
                                    <svg className={`w-4 h-4 text-gray-400 transition-transform ${showAssigneeDropdown ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>

                                {showAssigneeDropdown && (
                                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-48 overflow-y-auto">
                                        {members.map((member) => (
                                            <button
                                                key={member.id}
                                                type="button"
                                                onClick={() => handleAssigneeSelect(member)}
                                                className="w-full flex items-center gap-2 px-3 py-2 text-left text-sm hover:bg-gray-50 transition-colors"
                                            >
                                                <Image
                                                    src={member.image || '/teampic1.png'}
                                                    alt={member.name}
                                                    width={24}
                                                    height={24}
                                                    className="w-6 h-6 rounded-full object-cover"
                                                />
                                                <span className="text-gray-900">{member.name}</span>
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div>
                            <label className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2 block">
                                Priority
                            </label>
                            <div className="flex gap-2">
                                {priorityOptions.map((priority) => (
                                    <button
                                        key={priority.value}
                                        type="button"
                                        onClick={() => setFormData({ ...formData, priority: priority.value as TaskData['priority'] })}
                                        className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-md border transition-all ${formData.priority === priority.value
                                                ? `${priority.bgColor} border-${priority.color.replace('bg-', '')} ${priority.textColor}`
                                                : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
                                            }`}
                                    >
                                        <div className={`w-2 h-2 rounded-full ${priority.color}`} />
                                        <span className="text-sm font-medium">{priority.label}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2 block">
                                Status
                            </label>
                            <div className="flex gap-2">
                                {statusOptions.map((status) => (
                                    <button
                                        key={status.value}
                                        type="button"
                                        onClick={() => setFormData({ ...formData, status: status.value as TaskData['status'] })}
                                        className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-full border transition-all ${formData.status === status.value
                                                ? 'bg-gray-900 text-white border-gray-900'
                                                : 'bg-white border-gray-300 text-gray-600 hover:bg-gray-50'
                                            }`}
                                    >
                                        <div className={`w-2 h-2 rounded-full ${formData.status === status.value ? 'bg-white' : status.color}`} />
                                        <span className="text-sm font-medium">{status.label}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2 block">
                                Notes (Optional)
                            </label>
                            <textarea
                                rows={2}
                                value={formData.notes}
                                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                                placeholder="Add task details..."
                                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#01B0E9] focus:border-transparent resize-none"
                            />
                        </div>

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
                                Add Task
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}