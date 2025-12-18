import React, { useState } from 'react';
import { X } from 'lucide-react';

interface AddGoalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (goal: { type: string; target: string; period: string }) => void;
}

const AddGoalModal: React.FC<AddGoalModalProps> = ({ isOpen, onClose, onSave }) => {
  const [goalType, setGoalType] = useState('');
  const [targetValue, setTargetValue] = useState('');
  const [timePeriod, setTimePeriod] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (goalType && targetValue && timePeriod) {
      onSave({ type: goalType, target: targetValue, period: timePeriod });
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed  z-40" onClick={onClose} />

      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-50 px-4">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl relative">
          {/* Header */}
          <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Add New Goal</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition"
            >
              <X size={24} />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            {/* Goal Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Goal Type
              </label>
              <select
                value={goalType}
                onChange={(e) => setGoalType(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
              >
                <option value="" disabled>
                  Select goal type
                </option>
                <option value="Revenue">Revenue</option>
                <option value="Jobs">Jobs</option>
                <option value="Payments">Payments</option>
                <option value="Team Utilization">Team Utilization</option>
              </select>
            </div>

            {/* Target Value */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Target Value
              </label>
              <input
                type="text"
                value={targetValue}
                onChange={(e) => setTargetValue(e.target.value)}
                placeholder="e.g. $30,000 / 25 Jobs / 80%"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2  focus:border-transparent placeholder-gray-400"
              />
            </div>

            {/* Time Period */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Time Period
              </label>
              <select
                value={timePeriod}
                onChange={(e) => setTimePeriod(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2  focus:border-transparent text-gray-900"
              >
                <option value="" disabled>
                  Select time period
                </option>
                <option value="Weekly">Weekly</option>
                <option value="Monthly">Monthly</option>
                <option value="Quarterly">Quarterly</option>
              </select>
            </div>

            {/* Buttons */}
            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 bg-[#19B7EB] text-white rounded-lg hover:bg-[#19B7EB] transition font-medium shadow-md hover:shadow-lg"
              >
                Save Goal
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddGoalModal;