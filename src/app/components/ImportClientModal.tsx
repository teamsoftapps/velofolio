/** @format */
import { useState } from 'react';
import { Upload, Download, X, FileText, CheckCircle, AlertCircle } from 'lucide-react';

interface ImportClientsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImportSuccess: (newClients: any[]) => void;
}

const ImportClientsModal = ({ isOpen, onClose, onImportSuccess }: ImportClientsModalProps) => {
  const [step, setStep] = useState<'upload' | 'processing' | 'success' | 'error'>('upload');
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  // Download Template (same as before)
  const downloadTemplate = () => {
    const csvContent = `Date Created,First Name,Last Name,Email,Phone,Event,Status,Event Date
2025-09-25,Sarah,Connor,sarah.connor@gmail.com,+1 (561) 863-7946,Pre Wedding,Booked,2025-10-25
2025-08-26,James,Anderson,james.anderson@gmail.com,+1 (364) 607-9402,Webinar,Proposal,2025-11-10
2025-08-09,Lucas,White,lucas.white@hotmail.com,+1 (746) 315-2505,Product Demo,Proposal,2025-10-29
2025-07-27,Emma,Wilson,emma.wilson@outlook.com,+1 (471) 538-7270,Corporate,Booked,2025-10-30`;

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'clients_import_template.csv';
    link.click();
  };

  const parseCSV = (csvText: string): any[] => {
    const lines = csvText.trim().split('\n');
    const headers = lines[0].split(',').map(h => h.trim().replace(/^"|"$/g, ''));

    return lines.slice(1).map(line => {
      // Split by comma, but ignore commas inside double quotes
      const values = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/).map(v => v.trim().replace(/^"|"$/g, ''));
      const client: any = {};

      headers.forEach((header, i) => {
        const key = header.toLowerCase().replace(/\s+/g, '');
        client[key] = values[i] || '';
      });

      return {
        name: client.name || `${client.firstname || ''} ${client.lastname || ''}`.trim() || 'Unknown',
        firstName: client.firstname || '',
        lastName: client.lastname || '',
        company: client.company || '',
        jobs: client.jobs || '',
        email: client.email || '',
        phone: client.phone || '',
        event: client.event || '',
        status: client.status || 'New Lead',
        eventDate: client.eventdate || '',
        dateCreated: client.datecreated || new Date().toISOString().split('T')[0],
      };
    }).filter(c => c.email); // Skip rows without email
  };

  const handleImport = async () => {
    if (!file) return;

    setStep('processing');
    setErrorMsg('');

    try {
      const text = await file.text();
      const parsedClients = parseCSV(text);

      if (parsedClients.length === 0) {
        throw new Error("No valid clients found in CSV");
      }

      onImportSuccess(parsedClients);        // ← Send data to parent
      setStep('success');
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to parse CSV file');
      setStep('error');
    }
  };

  // Drag & Drop + File Select (same as before, slightly cleaned)
  const handleDragOver = (e: React.DragEvent) => { e.preventDefault(); setIsDragging(true); };
  const handleDragLeave = () => setIsDragging(false);
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile?.name.toLowerCase().endsWith('.csv')) setFile(droppedFile);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected?.name.toLowerCase().endsWith('.csv')) setFile(selected);
  };

  const resetAndClose = () => {
    setStep('upload');
    setFile(null);
    setErrorMsg('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg mx-4 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-5 border-b">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-2xl bg-[#33BFEC] flex items-center justify-center">
              <Upload className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Import Clients</h2>
              <p className="text-sm text-gray-500">CSV • Will merge with existing clients</p>
            </div>
          </div>
          <button onClick={resetAndClose}><X size={24} className="text-gray-400 hover:text-gray-600" /></button>
        </div>

        <div className="p-8">
          {step === 'upload' && (
            <>
              {/* Drag & Drop Area */}
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-2xl p-10 text-center transition-all ${isDragging ? 'border-[#33BFEC] bg-[#33BFEC]/5' : 'border-gray-300'
                  }`}
              >
                <Upload className="mx-auto mb-4 text-gray-400" size={48} />
                <p className="text-lg font-medium">Drop CSV file here</p>
                <p className="text-sm text-gray-500 my-4">or</p>
                <label className="cursor-pointer bg-gray-100 hover:bg-gray-200 px-6 py-3 rounded-full font-medium inline-flex items-center gap-2">
                  <FileText size={18} /> Choose CSV File
                  <input type="file" accept=".csv" onChange={handleFileSelect} className="hidden" />
                </label>
              </div>

              {file && (
                <div className="mt-6 p-4 bg-gray-50 rounded-2xl flex items-center gap-3">
                  <FileText className="text-[#33BFEC]" size={24} />
                  <div className="flex-1 truncate">
                    <p className="font-medium">{file.name}</p>
                    <p className="text-xs text-gray-500">{(file.size / 1024).toFixed(1)} KB</p>
                  </div>
                  <button onClick={() => setFile(null)} className="text-red-500"><X size={20} /></button>
                </div>
              )}

              {/* Template */}
              <div className="mt-8 p-5 bg-[#F8FAFC] border border-gray-200 rounded-2xl">
                <button
                  onClick={downloadTemplate}
                  className="flex items-center gap-2 text-[#33BFEC] hover:underline font-medium"
                >
                  <Download size={18} /> Download CSV Template
                </button>
              </div>
            </>
          )}

          {step === 'processing' && (
            <div className="py-16 text-center">
              <div className="mx-auto w-16 h-16 border-4 border-[#33BFEC]/30 border-t-[#33BFEC] rounded-full animate-spin" />
              <p className="mt-6 text-lg font-medium">Processing and merging clients...</p>
            </div>
          )}

          {step === 'success' && (
            <div className="py-16 text-center">
              <CheckCircle className="mx-auto text-emerald-500" size={72} />
              <h3 className="text-2xl font-semibold mt-6">Import Successful!</h3>
              <p className="text-gray-600 mt-3">New clients have been merged with existing data.</p>
            </div>
          )}

          {step === 'error' && (
            <div className="py-12 text-center">
              <AlertCircle className="mx-auto text-red-500" size={60} />
              <p className="mt-6 text-red-600 font-medium">{errorMsg}</p>
            </div>
          )}
        </div>

        <div className="px-8 py-5 border-t bg-gray-50 flex justify-end gap-3 rounded-b-3xl">
          {step === 'upload' && (
            <>
              <button onClick={resetAndClose} className="px-6 py-3 text-gray-600 hover:bg-gray-100 rounded-full">Cancel</button>
              <button
                onClick={handleImport}
                disabled={!file}
                className={`px-8 py-3 rounded-full font-semibold text-white ${file ? 'bg-[#33BFEC] hover:bg-[#2aa8d6]' : 'bg-gray-300 cursor-not-allowed'}`}
              >
                Import & Merge
              </button>
            </>
          )}

          {(step === 'success' || step === 'error') && (
            <button onClick={resetAndClose} className="px-10 py-3 bg-[#33BFEC] text-white font-semibold rounded-full hover:bg-[#2aa8d6]">
              Done
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImportClientsModal;