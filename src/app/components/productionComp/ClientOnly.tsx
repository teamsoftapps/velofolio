/** @format */

'use client';

import React, { useState, useEffect } from 'react';

export const ClientOnly: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <div className='w-full h-[200px] bg-gray-100 animate-pulse' />;
  }

  return <>{children}</>;
};

export default ClientOnly;
