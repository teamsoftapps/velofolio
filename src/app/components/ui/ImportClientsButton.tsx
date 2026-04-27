import { Upload, Download } from 'lucide-react';

type ActionType = 'import' | 'export';

interface ActionButtonProps {
  type: ActionType;
  label?: string;
  onClick?: () => void;
  className?: string;
  showFormat?: boolean;
}

const ActionButton = ({
  type,
  label,
  onClick,
  className = '',
  showFormat = true,
}: ActionButtonProps) => {
  const isImport = type === 'import';

  const defaultLabel = isImport ? 'Import Clients' : 'Export PDF / CSV';
  const Icon = isImport ? Upload : Download;

  // Different colors for Import and Export
  const baseColor = isImport 
    ? 'bg-emerald-500 hover:bg-emerald-600' 
    : 'bg-[#01B0E9] hover:bg-[#01B0E9]/80';

  const formatColor = isImport ? 'text-emerald-100' : 'text-indigo-100';

  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 ${baseColor}  cursor-pointer
        text-white px-6 py-3 rounded-full font-medium text-sm 
        transition-all duration-200 active:scale-[0.98] shadow-sm hover:shadow-md
        ${className}`}
    >
      <Icon size={19} strokeWidth={2.5} />
      {label || defaultLabel}
      
      {showFormat && !isImport && (
        <span className={`${formatColor} text-xs font-normal ml-1`}>
          (PDF / CSV)
        </span>
      )}
    </button>
  );
};

export default ActionButton;