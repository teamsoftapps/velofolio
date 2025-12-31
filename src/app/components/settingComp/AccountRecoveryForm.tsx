"use client";

import { useState } from "react";

export default function AccountRecoveryForm() {
  const [recoveryEmail, setRecoveryEmail] = useState("");
  const [backupPhone, setBackupPhone] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add your account recovery update logic here
    console.log("Updating recovery info:", { recoveryEmail, backupPhone });
  };

  return (  <div className="w-full lg:w-1/2 shrink-0">

      <h2 className="text-lg font-semibold mb-6">Account Recovery</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-1">
            Recovery Email
          </label>
          <input
            type="email"
            value={recoveryEmail}
            onChange={(e) => setRecoveryEmail(e.target.value)}
            placeholder="Email"
            className="w-full px-4 py-3 border border-[#978F8F] rounded-lg"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-900 mb-1">
            Backup Phone Number
          </label>
          <input
            type="tel"
            value={backupPhone}
            onChange={(e) => setBackupPhone(e.target.value)}
            placeholder="Phone Number"
            className="w-full px-4 py-3 border border-[#978F8F] rounded-lg"
          />
        </div>

        <div className="pt-4">
          <button
            type="submit"
            className="px-6 py-3 bg-[#01B0E9] text-white rounded-full font-medium cursor-pointer hover:bg-[#019dcf] transition"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
}