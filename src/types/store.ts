/** @format */

import { Invoice } from './calendar';

export interface InvoiceState {
  invoices: Invoice[];
  loading?: boolean;
  error?: string | null;
}

export interface RootState {
  persisted: {
    invoiceandQuote: InvoiceState;
  };
}
