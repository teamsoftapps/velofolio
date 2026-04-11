import { useState, useEffect } from "react";
import { auth } from "@/config/firebase";
import { updateAccountRecovery, getUserProfile } from "@/firebase_Routes/routes";
import { toast } from "react-toastify";

export default function AccountRecoveryForm() {
  const [recoveryEmail, setRecoveryEmail] = useState("");
  const [backupPhone, setBackupPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchRecoveryInfo = async () => {
      const user = auth.currentUser;
      if (user) {
        const { profile } = await getUserProfile(user.uid);
        if (profile) {
          setRecoveryEmail(profile.recoveryEmail || "");
          setBackupPhone(profile.backupPhone || "");
        }
      }
    };
    fetchRecoveryInfo();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (!user) {
      toast.error("You must be logged in");
      return;
    }

    setIsLoading(true);
    const response = await updateAccountRecovery(user.uid, {
      recoveryEmail,
      backupPhone,
    });

    if (response.success) {
      toast.success("Account recovery info updated");
    } else {
      toast.error(response.error || "Failed to update info");
    }
    setIsLoading(false);
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
            disabled={isLoading}
            className={`px-6 py-3 text-white rounded-full font-medium cursor-pointer transition ${isLoading ? 'bg-gray-400' : 'bg-[#01B0E9] hover:bg-[#019dcf]'}`}
          >
            {isLoading ? "Updating..." : "Update"}
          </button>
        </div>
      </form>
    </div>
  );
}