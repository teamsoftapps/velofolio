import React from 'react';
import { Mail } from 'lucide-react';

interface InviteEmailButtonProps {
    onClick?: () => void;
    className?: string;
    disabled?: boolean;
}

const InviteEmailButton: React.FC<InviteEmailButtonProps> = ({
    onClick,
    className = '',
    disabled = false,
}) => {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`
        flex items-center justify-center gap-2 
        bg-[#14CB95] hover:bg-[#14CB95] 
        text-white font-medium 
        px-6 py-2.5 rounded-full
        transition-all duration-200 
        active:scale-95 
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
      `}
        >
            <Mail className="w-5 h-5" />
            <span>Invite via Email</span>
        </button>
    );
};

export default InviteEmailButton;