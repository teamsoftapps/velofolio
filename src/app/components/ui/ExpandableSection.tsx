import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus, FiMinus } from 'react-icons/fi';

interface ExpandableSectionProps {
  title: string;
  icon: any;
  children?: React.ReactNode;
  defaultOpen?: boolean;
  badgeCount?: number;
  action?: React.ReactNode;
  showToggle?: boolean;
}

const ExpandableSection = ({
  title,
  icon: Icon,
  children,
  defaultOpen = false,
  badgeCount,
  action,
  showToggle = true
}: ExpandableSectionProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className='bg-white rounded-lg border border-gray-200  overflow-hidden transition-all duration-300'>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className='w-full px-6 py-5 flex items-center justify-between hover:bg-gray-50 transition-colors cursor-pointer'
      >
        <div className='flex items-center gap-3'>
          <Icon size={24} className='text-gray-900' />
          <h3 className='text-lg font-bold text-gray-900 flex items-center gap-2'>
            {title}
            {badgeCount !== undefined && (
              <span className='bg-[#00B5E2] text-white text-sm font-medium px-2 py-1 w-5 h-5 flex items-center justify-center rounded-full'>
                {badgeCount}
              </span>
            )}
          </h3>
        </div>
        <div className='flex items-center gap-4'>
          {action && (
            <div onClick={(e) => e.stopPropagation()}>
              {action}
            </div>
          )}
          {showToggle && (
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-50 text-gray-400"
            >
              {isOpen ? <FiMinus size={20} /> : <FiPlus size={20} />}
            </motion.div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <div className='px-6 pb-6 pt-0 border-t border-gray-50'>
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ExpandableSection;
