"use client";

import React, { useRef, useState } from "react";

interface OtpInputProps {
  length?: number;
  onComplete?: (otp: string) => void;
}

export default function OtpInput({ length = 6, onComplete }: OtpInputProps) {
  const [otp, setOtp] = useState<string[]>(Array(length).fill(""));
  const inputsRef:any = useRef<HTMLInputElement[]>([]);

  const handleChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return; // allow only numbers

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }

    if (newOtp.every((digit) => digit !== "")) {
      onComplete?.(newOtp.join(""));
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pasteData = e.clipboardData.getData("text").slice(0, length);
    if (!/^\d+$/.test(pasteData)) return;

    const newOtp = pasteData.split("");
    setOtp(newOtp);

    newOtp.forEach((digit, index) => {
      if (inputsRef.current[index]) {
        inputsRef.current[index].value = digit;
      }
    });

    onComplete?.(newOtp.join(""));
  };

  return (
    <div className="flex gap-3 justify-center">
      {otp.map((digit, index) => (
        <input
          key={index}
          ref={(el) => {(inputsRef.current[index] = el!)}}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digit}
          onChange={(e) => handleChange(e.target.value, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onPaste={handlePaste}
          className="w-12 h-12 text-center text-lg font-semibold border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#01B0E9]"
        />
      ))}
    </div>
  );
}
