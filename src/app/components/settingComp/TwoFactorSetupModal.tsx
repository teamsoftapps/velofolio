'use client';


import { X, Copy, Smartphone, Monitor, Globe } from 'lucide-react';
import QRCode from "react-qr-code";
import React, { useEffect, useState } from "react";
import OtpInput from './OtpInput';

export default function TwoFactorSetupModal({ setIsOpenTFAModal, onEnable }: any) {
  const secretCode = 'DRN2QCDD2YBURZWE3PUNHNDWP6S3REZM';
  const [TFAContinue, setTFAContinue] = useState(false);
  const [copied, setCopied] = useState(false);
  const [timestamp, setTimestamp] = useState(Date.now()); // track last update


  useEffect(() => {
    const interval = setInterval(() => {
      setTimestamp(Date.now());
    }, 10000);

    return () => clearInterval(interval);
  }, []);


  const qrValue = `otpauth://totp/velofolio:user?secret=${secretCode}&issuer=Velofolio&time=${timestamp}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(secretCode);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1500);
  };
  const handleClose = () => {
    setIsOpenTFAModal(false);
    onEnable && onEnable(); // enable 2FA after closing modal
  };


  return (
    <>
      <div className="fixed inset-0 bg-black/40 bg-opacity-50 flex items-center justify-center z-50 p-4 ">
        <div className="bg-white rounded-2xl  max-w-2xl w-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6">
            <h2 className="text-xl font-semibold text-gray-900">
              Set Up Two-Factor Authentication
            </h2>
            <button
              onClick={() => setIsOpenTFAModal(false)

              }
              aria-label="Close modal"
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Body */}
          <div className="px-8  ">
            <div className=" bg-[#F4F4F5] p-6 rounded-2xl">
              {!TFAContinue && <div >

                <p className="text-center text-base font-medium text-black mb-4 mx-20">
                  Scan this QR code using Google Authenticator, Authy, or any 2FA app.
                </p>

                {/* QR Code Placeholder */}

                <div className="flex justify-center mb-5">

                  <QRCode value={qrValue} size={160} />
                </div>

                <p className="text-left text-base font-medium text-black mb-4">
                  If you can't scan the image, enter this code instead:
                </p>

                {/* Secret Code */}
                <div className="flex items-center justify-center gap-3 bg-white">
                  <code className=" px-4 py-2 rounded-lg font-mono text-sm tracking-wider">
                    {secretCode}
                  </code>
                  <div className="relative">
                    <button
                      onClick={handleCopy}
                      className="p-2 text-gray-600 cursor-pointer hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                      aria-label="Copy code"
                    >
                      <Copy className="w-5 h-5" />
                    </button>

                    {copied && (
                      <span className="absolute -top-9 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded-md whitespace-nowrap">
                        Copied!
                      </span>
                    )}
                  </div>

                </div>
              </div>
              }
              {TFAContinue && <OtpInput onComplete={(otp) => console.log("OTP:", otp)} />
              }





            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-between gap-4 px-8 py-6 border-gray-200">
            <button className="px-6 py-2 border-[#E7E7E9] border-2  cursor-pointer rounded-full font-medium transition-colors"
              onClick={() => setIsOpenTFAModal(false)}
            >
              Cancel
            </button>
            <button className="px-6 py-2 bg-[var(--primary-color)] rounded-full text-white  cursor-pointer font-medium transition-colors"
              onClick={() => {
                if (TFAContinue) {
                  setIsOpenTFAModal(false)

                  setTFAContinue(!TFAContinue)
                  handleClose();
                }
                else {
                  setTFAContinue(!TFAContinue)

                }

              }}>
              {TFAContinue ? "Verify & Enable" : " Continue"}
            </button>
          </div>
        </div>

        {/* Optional: Active Sessions List (shown in background like screenshot) */}
        <div className="absolute inset-x-0 top-full mt-8 max-w-4xl mx-auto hidden lg:block">
          <div className="bg-gray-800 rounded-lg shadow-lg p-6 text-white">
            <h3 className="text-lg font-semibold mb-4">Backup Phone Number</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Smartphone className="w-6 h-6 text-gray-400" />
                  <div>
                    <p className="font-medium">iPhone</p>
                    <p className="text-sm text-gray-400">San Francisco</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="inline-block bg-orange-500 text-white text-xs px-3 py-1 rounded-full mb-1">
                    2 MIN AGO
                  </span>
                  <button className="text-sm text-gray-300 hover:text-white ml-4">
                    Logout
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Monitor className="w-6 h-6 text-gray-400" />
                  <div>
                    <p className="font-medium">Chrome - Mac</p>
                    <p className="text-sm text-gray-400">San Francisco</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-sm text-gray-400">YESTERDAY</span>
                  <button className="text-sm text-gray-300 hover:text-white ml-4">
                    Logout
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                <div className="flex items-center gap-4">
                  <Globe className="w-6 h-6 text-gray-400" />
                  <div>
                    <p className="font-medium">Unknown Device</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-sm text-gray-400">YESTERDAY</span>
                  <button className="text-sm text-gray-300 hover:text-white ml-4">
                    Logout
                  </button>
                </div>
              </div>

              <button className="text-sm text-gray-300 hover:text-white mt-4">
                Logout from all devices
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
