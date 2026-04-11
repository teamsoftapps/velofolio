"use client";

import { useState } from "react";
import { updateUserPassword } from "@/firebase_Routes/routes";
import { toast } from "react-toastify";
import { FiEye, FiEyeOff } from "react-icons/fi";

export default function ChangePasswordForm() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }

    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    setIsLoading(true);
    const response = await updateUserPassword(currentPassword, newPassword);
    
    if (response.success) {
      toast.success("Password updated successfully");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } else {
      toast.error(response.error || "Failed to update password");
    }
    setIsLoading(false);
  };

  return (
   <div className="w-full lg:w-1/2 shrink-0">

      <h2 className="text-lg font-semibold mb-6">Change Password</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-1">
            Current Password
          </label>
          <div className="relative">
            <input
              type={showCurrent ? "text" : "password"}
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="Password"
              className="w-full px-4 py-3 border border-[#978F8F] rounded-lg pr-12 focus:outline-none focus:ring-1 focus:ring-[#01B0E9]"
              required
            />
            <button
              type="button"
              onClick={() => setShowCurrent(!showCurrent)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
            >
              {showCurrent ? <FiEyeOff size={20} /> : <FiEye size={20} />}
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-900 mb-1">
            New Password
          </label>
          <div className="relative">
            <input
              type={showNew ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Password"
              className="w-full px-4 py-3 border border-[#978F8F] rounded-lg pr-12 focus:outline-none focus:ring-1 focus:ring-[#01B0E9]"
              required
            />
            <button
              type="button"
              onClick={() => setShowNew(!showNew)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
            >
              {showNew ? <FiEyeOff size={20} /> : <FiEye size={20} />}
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-900 mb-1">
            Confirm New Password
          </label>
          <div className="relative">
            <input
              type={showConfirm ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
              className="w-full px-4 py-3 border border-[#978F8F] rounded-lg pr-12 focus:outline-none focus:ring-1 focus:ring-[#01B0E9]"
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
            >
              {showConfirm ? <FiEyeOff size={20} /> : <FiEye size={20} />}
            </button>
          </div>
        </div>

        <div className="flex gap-4 pt-4">

          <button
            type="submit"
            disabled={isLoading}
            className={`px-6 py-3 text-white rounded-full font-medium cursor-pointer transition-colors ${isLoading ? 'bg-gray-400' : 'bg-[#01B0E9] hover:bg-[#019cc7]'}`}
          >
            {isLoading ? "Updating..." : "Save New Password"}
          </button>
        </div>
      </form>
    </div>
  );
}