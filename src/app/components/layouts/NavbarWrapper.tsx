'use client';

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';

// Routes where the global Navbar should NOT appear
// (auth pages handle their own UI, and guest pages like viewInvoice/viewQuote have their own Navbar with guestLabel)
const NO_NAV_ROUTES = [
  '/',
  '/signin',
  '/signup',
  '/forget-password',
  '/reset-password',
];

const NO_NAV_PREFIXES = ['/viewInvoice', '/viewQuote'];

export default function NavbarWrapper() {
  const pathname = usePathname();

  const isExcluded =
    NO_NAV_ROUTES.includes(pathname) ||
    NO_NAV_PREFIXES.some((prefix) => pathname.startsWith(prefix));

  if (isExcluded) return null;

  return <Navbar />;
}
