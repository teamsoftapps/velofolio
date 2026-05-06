'use client';

import React, { useEffect, useState } from 'react';
import { MdClose, MdCheckCircle, MdDownload } from 'react-icons/md';
import { AiOutlineFilePdf } from 'react-icons/ai';
import { BsFiletypeCsv } from 'react-icons/bs';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmExport: (format: 'csv' | 'pdf') => void;
  fileName?: string;
  recordCount?: number;
}

export default function ExportModal({
  isOpen,
  onClose,
  onConfirmExport,
  fileName = 'export',
  recordCount = 0,
}: ExportModalProps) {
  const [stage, setStage] = useState<'select' | 'exporting' | 'done'>('select');
  const [progress, setProgress] = useState(0);
  const [selectedFormat, setSelectedFormat] = useState<'csv' | 'pdf'>('csv');

  // Reset when modal opens
  useEffect(() => {
    if (isOpen) {
      setStage('select');
      setProgress(0);
      setSelectedFormat('csv');
    }
  }, [isOpen]);

  const handleExport = () => {
    setStage('exporting');
    setProgress(0);

    // Animate progress bar
    let current = 0;
    const interval = setInterval(() => {
      current += Math.random() * 18 + 5;
      if (current >= 100) {
        current = 100;
        clearInterval(interval);
        setProgress(100);
        setTimeout(() => {
          onConfirmExport(selectedFormat);
          setStage('done');
        }, 400);
      } else {
        setProgress(Math.round(current));
      }
    }, 120);
  };

  const handleClose = () => {
    setStage('select');
    setProgress(0);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 z-[1100] flex items-center justify-center p-4"
        onClick={stage !== 'exporting' ? handleClose : undefined}
      >
        <div
          className="relative mt-20 bg-white rounded-2xl shadow-2xl w-full max-w-md p-8"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          {stage !== 'exporting' && (
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
            >
              <MdClose className="w-5 h-5" />
            </button>
          )}

          {/* ---- SELECT STAGE ---- */}
          {stage === 'select' && (
            <>
              <div className="flex flex-col items-center text-center mb-6">
                <div className="w-14 h-14 bg-[var(--primary-color)]/10 rounded-full flex items-center justify-center mb-4">
                  <MdDownload className="w-7 h-7 text-[var(--primary-color)]" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900">Export Clients</h2>
                <p className="text-sm text-gray-500 mt-1">
                  {recordCount} record{recordCount !== 1 ? 's' : ''} will be exported
                </p>
              </div>

              <p className="text-sm font-medium text-gray-700 mb-3">Choose format</p>
              <div className="grid grid-cols-2 gap-3 mb-6">
                {/* CSV Option */}
                <button
                  onClick={() => setSelectedFormat('csv')}
                  className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all cursor-pointer ${
                    selectedFormat === 'csv'
                      ? 'border-[var(--primary-color)] bg-[var(--primary-color)]/5'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <BsFiletypeCsv className={`w-9 h-9 ${selectedFormat === 'csv' ? 'text-[var(--primary-color)]' : 'text-gray-400'}`} />
                  <span className={`text-sm font-semibold ${selectedFormat === 'csv' ? 'text-[var(--primary-color)]' : 'text-gray-600'}`}>
                    CSV
                  </span>
                  <span className="text-xs text-gray-400">Spreadsheet</span>
                </button>

                {/* PDF Option */}
                <button
                  onClick={() => setSelectedFormat('pdf')}
                  className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all cursor-pointer ${
                    selectedFormat === 'pdf'
                      ? 'border-[var(--primary-color)] bg-[var(--primary-color)]/5'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <AiOutlineFilePdf className={`w-9 h-9 ${selectedFormat === 'pdf' ? 'text-[var(--primary-color)]' : 'text-gray-400'}`} />
                  <span className={`text-sm font-semibold ${selectedFormat === 'pdf' ? 'text-[var(--primary-color)]' : 'text-gray-600'}`}>
                    PDF
                  </span>
                  <span className="text-xs text-gray-400">Document</span>
                </button>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleClose}
                  className="flex-1 py-2.5 border border-gray-300 text-gray-600 font-medium rounded-full hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleExport}
                  className="flex-1 py-2.5 bg-[var(--primary-color)] text-white font-medium rounded-full hover:bg-[var(--primary-color)]/85 transition-colors cursor-pointer"
                >
                  Export {selectedFormat.toUpperCase()}
                </button>
              </div>
            </>
          )}

          {/* ---- EXPORTING STAGE ---- */}
          {stage === 'exporting' && (
            <div className="flex flex-col items-center text-center py-4">
              <div className="w-14 h-14 bg-[var(--primary-color)]/10 rounded-full flex items-center justify-center mb-5 animate-pulse">
                <MdDownload className="w-7 h-7 text-[var(--primary-color)]" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-1">Exporting…</h2>
              <p className="text-sm text-gray-500 mb-6">
                Preparing your {selectedFormat.toUpperCase()} file, please wait.
              </p>

              {/* Progress Bar */}
              <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden mb-2">
                <div
                  className="h-full bg-[var(--primary-color)] rounded-full transition-all duration-200 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-xs text-gray-400">{progress}%</p>
            </div>
          )}

          {/* ---- DONE STAGE ---- */}
          {stage === 'done' && (
            <div className="flex flex-col items-center text-center py-4">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mb-5 bg-green-50">
                <MdCheckCircle className="w-10 h-10 text-green-500" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-1">Export Complete!</h2>
              <p className="text-sm text-gray-500 mb-6">
                <span className="font-medium text-gray-700">{fileName}.{selectedFormat}</span> has been downloaded successfully.
              </p>

              {/* Progress Bar - full */}
              <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden mb-6">
                <div className="h-full bg-green-500 rounded-full w-full" />
              </div>

              <button
                onClick={handleClose}
                className="w-full py-2.5 bg-[var(--primary-color)] text-white font-medium rounded-full hover:bg-[var(--primary-color)]/85 transition-colors cursor-pointer"
              >
                Done
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
