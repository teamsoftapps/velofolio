'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';

import { useEffect } from 'react';

const variants = {
  hidden: { opacity: 0, scale: 0.98 },
  enter: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 1.02 },
};

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const isExcluded =
    ['/', '/signin', '/signup', '/forget-password', '/reset-password'].includes(pathname) ||
    ['/viewInvoice', '/viewQuote'].some((prefix) => pathname.startsWith(prefix));

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        variants={variants}
        initial="hidden"
        animate="enter"
        exit="exit"
        transition={{ duration: 0.35, ease: 'easeOut' }}
        style={{
          width: '100%',
          minHeight: '100vh',
          backgroundColor: '#FAFAFA'
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
