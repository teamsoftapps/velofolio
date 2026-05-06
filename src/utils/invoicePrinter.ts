/** @format */

export interface InvoiceAction {
  id: string;
  clientName: string;
  clientEmail?: string;
  clientAddress?: string;
  createdAt: string;
  jobTitle: string;
  packages: {
    name?: string;
    title?: string;
    description?: string;
    price: number;
    qty?: number;
  }[];
  totalAmount: number;
  status: string;
  splitType?: string;
  dueDate?: string;
  paymentMethod?: string;
  discount?: number;
  tax?: number;
  payments?: {
    id: number;
    dueDate: string;
    status: string;
    percentage: string;
    amount: string;
    milestone?: string;
  }[];
}

export const printInvoice = (data: InvoiceAction) => {
  const win = window.open("", "_blank");
  if (!win) return;

  const showPayments = data.payments && data.payments.length > 0;
  const dueDate = data.dueDate || new Date(new Date().getTime() + 14 * 24 * 60 * 60 * 1000).toLocaleDateString();
  
  // Calculate Subtotal (sum of price * qty)
  const subtotal = data.packages.reduce((acc, p) => acc + (parseFloat(p.price.toString()) * (p.qty || 1)), 0);
  
  // Calculate Total Discount (aggregate per-item discount)
  const discountAmount = data.packages.reduce((acc, p) => {
    const itemSubtotal = parseFloat(p.price.toString()) * (p.qty || 1);
    const itemDiscount = (p as any).discount ? parseFloat((p as any).discount) : 0;
    return acc + (itemSubtotal * (itemDiscount / 100));
  }, 0) + (data.discount || 0);

  // Calculate Total Tax (aggregate per-item tax, calculated after discount)
  const taxAmount = data.packages.reduce((acc, p) => {
    const itemSubtotal = parseFloat(p.price.toString()) * (p.qty || 1);
    const itemDiscount = (p as any).discount ? parseFloat((p as any).discount) : 0;
    const afterDiscount = itemSubtotal - (itemSubtotal * (itemDiscount / 100));
    const itemTax = (p as any).tax ? parseFloat((p as any).tax) : 0;
    return acc + (afterDiscount * (itemTax / 100));
  }, 0) + ((subtotal - discountAmount) * ((data.tax || 0) / 100));

  const taxPercentage = data.tax || (subtotal > 0 ? (taxAmount / (subtotal - discountAmount)) * 100 : 0);

  // Read settings from localStorage to check logo visibility
  let showLogo = true;
  try {
    const saved = localStorage.getItem('clientCustomization');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.showLogoInvoice === false) {
        showLogo = false;
      }
    }
  } catch (e) {}

  // Generate QR metadata
  const qrMetadata = `Invoice ID: ${data.id}\nClient: ${data.clientName}\nTotal Amount: $${data.totalAmount}\nDate: ${new Date(data.createdAt).toLocaleDateString()}\nStatus: ${data.status || 'Sent'}`;
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${encodeURIComponent(qrMetadata)}`;

  win.document.write(`
    <html>
      <head>
        <title>Invoice ${data.id}</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
          
          * { margin: 0; padding: 0; box-sizing: border-box; }
          
          body { 
            font-family: 'Inter', sans-serif; 
            color: #1f2937; 
            line-height: 1.4; 
            background-color: #f3f4f6; 
            display: flex; 
            justify-content: center; 
            padding: 20px;
          }

          .page-container {
            background-color: white;
            width: 100%;
            max-width: 850px;
            padding: 40px;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
            border-radius: 8px;
            position: relative;
            display: flex;
            flex-direction: column;
          }
          
          /* Header */
          .header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 30px; }
          .invoice-title-section { display: flex; flex-direction: column; gap: 4px; }
          .invoice-number { color: #01B0E9; font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; }
          .title { font-size: 36px; font-weight: 800; color: #111827; letter-spacing: -0.02em; line-height: 1; }
          .status-badge { display: inline-flex; align-items: center; gap: 8px; margin-top: 2px; }
          .badge { background: #E0F2FE; color: #01B0E9; font-size: 10px; font-weight: 700; padding: 3px 6px; border-radius: 4px; text-transform: uppercase; }
          .due-text { font-size: 12px; color: #6b7280; font-weight: 500; }
          
          .company-section { text-align: right; display: flex; flex-direction: column; align-items: flex-end; gap: 2px; }
          .logo-img { width: 110px; height: auto; margin-bottom: 8px; }
          .company-name { font-size: 14px; font-weight: 700; color: #111827; }
          .company-address { font-size: 12px; color: #6b7280; max-width: 180px; }

          hr { border: 0; border-top: 1px solid #e5e7eb; margin: 20px 0; }

          /* Info Grid */
          .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; margin-bottom: 30px; }
          .info-column { display: flex; flex-direction: column; gap: 12px; position: relative; }
          .info-column:last-child::before { content: ''; position: absolute; left: -20px; top: 0; bottom: 0; width: 1px; background: #e5e7eb; }
          .info-label { font-size: 10px; font-weight: 700; color: #9ca3af; text-transform: uppercase; letter-spacing: 0.05em; }
          .info-content { display: flex; flex-direction: column; gap: 2px; }
          .info-name { font-size: 18px; font-weight: 700; color: #111827; }
          .info-detail { font-size: 13px; color: #4b5563; }
          .job-row { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; font-size: 13px; }
          .job-label { color: #6b7280; font-weight: 500; }
          .job-value { color: #111827; font-weight: 600; text-align: right; }

          /* Services Table */
          .section-title { font-size: 10px; font-weight: 700; color: #9ca3af; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 12px; }
          table { width: 100%; border-collapse: collapse; margin-bottom: 25px; }
          th { border-bottom: 2px solid #01B0E9; padding: 10px 0; text-align: left; font-size: 11px; color: #374151; font-weight: 600; }
          td { padding: 15px 0; border-bottom: 1px solid #f3f4f6; font-size: 13px; color: #111827; vertical-align: top; }
          .service-desc { max-width: 400px; }
          .service-name { font-weight: 700; margin-bottom: 2px; }
          .service-sub { font-size: 12px; color: #6b7280; line-height: 1.4; }
          .text-right { text-align: right; }
          .col-qty { width: 50px; text-align: center; }
          .col-price { width: 100px; }
          .col-total { width: 100px; }

          /* Summary Section */
          .summary-section { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; align-items: flex-start; }
          .payment-schedule-card { background: white; border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px; display: flex; flex-direction: column; gap: 12px; }
          .milestone-row { display: flex; justify-content: space-between; align-items: center; padding-bottom: 12px; border-bottom: 1px solid #f3f4f6; }
          .milestone-row:last-child { border-bottom: 0; padding-bottom: 0; }
          .milestone-info { display: flex; flex-direction: column; gap: 1px; }
          .milestone-name { font-size: 13px; font-weight: 700; color: #111827; }
          .milestone-date { font-size: 11px; color: #9ca3af; }
          .milestone-values { text-align: right; }
          .milestone-percent { font-size: 12px; font-weight: 700; color: #01B0E9; }
          .milestone-amount { font-size: 12px; color: #6b7280; font-weight: 500; }

          .totals-column { display: flex; flex-direction: column; gap: 8px; align-items: flex-end; }
          .total-row { display: flex; justify-content: space-between; width: 100%; max-width: 240px; font-size: 13px; color: #6b7280; font-weight: 500; }
          .total-value { color: #111827; font-weight: 600; }
          .discount-value { color: #dc2626; }
          .grand-total-row { border-top: 1px solid #e5e7eb; padding-top: 10px; margin-top: 4px; color: #111827; }
          .total-label-large { font-size: 10px; font-weight: 700; text-transform: uppercase; color: #9ca3af; }
          .total-amount-large { font-size: 36px; font-weight: 800; color: #01B0E9; letter-spacing: -0.02em; }

          /* QR Code Section */
          .qr-section { margin-top: 25px; display: flex; align-items: center; gap: 12px; padding: 12px; border: 1px dashed #e5e7eb; border-radius: 6px; align-self: flex-start; }
          .qr-img { width: 70px; height: 70px; }
          .qr-text { font-size: 10px; color: #9ca3af; font-weight: 500; max-width: 140px; }

          /* Footer */
          .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #f3f4f6; display: flex; justify-content: space-between; align-items: center; color: #9ca3af; font-size: 11px; font-weight: 500; }
          .footer-links { display: flex; gap: 20px; }
          .footer-icon-link { display: flex; align-items: center; gap: 5px; }

          @media print {
            body { background-color: white; padding: 0; display: block; }
            .page-container { box-shadow: none; border-radius: 0; padding: 30px; max-width: none; min-height: auto; }
            .no-print { display: none; }
          }
        </style>
      </head>
      <body>
        <div class="page-container">
          <!-- Header -->
          <div class="header">
            <div class="invoice-title-section">
              <div class="invoice-number">Invoice #${data.id}</div>
              <div class="title">INVOICE</div>
              <div class="status-badge">
                <span class="badge">${data.status || 'SENT'}</span>
                <span class="due-text">Due on ${dueDate}</span>
              </div>
            </div>
            <div class="company-section">
              ${showLogo ? `<img src="/images/logo.png" alt="VeloFolio" class="logo-img" />` : ''}
              <div class="company-name">VeloFolio Studio</div>
              <div class="company-address">San Francisco, CA</div>
            </div>
          </div>

          <hr />

          <!-- Info Grid -->
          <div class="info-grid">
            <div class="info-column">
              <div class="info-label">Client Information</div>
              <div class="info-content">
                <div class="info-name">${data.clientName}</div>
                <div class="info-detail">${data.clientEmail || ''}</div>
                <div class="info-detail">${data.clientAddress || '123 Sunset Boulevard, Los Angeles, CA 90028'}</div>
              </div>
            </div>
            <div class="info-column">
              <div class="info-label">Job Reference</div>
              <div class="info-content">
                <div class="info-name" style="font-size: 16px; margin-bottom: 4px;">${data.jobTitle}</div>
                <div class="job-row">
                  <span class="job-label">Issue Date:</span>
                  <span class="job-value">${new Date(data.createdAt).toLocaleDateString()}</span>
                </div>
                <div class="job-row">
                  <span class="job-label">Payment Method:</span>
                  <span class="job-value">${data.paymentMethod || 'Bank Transfer'}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Services -->
          <div class="section-title">Services</div>
          <table>
            <thead>
              <tr>
                <th class="service-desc">Description</th>
                <th class="col-qty">Qty</th>
                <th class="col-price text-right">Price</th>
                <th class="col-total text-right">Total</th>
              </tr>
            </thead>
            <tbody>
              ${data.packages.map((p: any) => `
                <tr>
                  <td class="service-desc">
                    <div class="service-name">${p.name || p.title}</div>
                    <div class="service-sub">${p.description || 'Professional photography session including post-production and digital delivery.'}</div>
                  </td>
                  <td class="col-qty">${p.qty || 1}</td>
                  <td class="col-price text-right">$${parseFloat(p.price).toLocaleString()}</td>
                  <td class="col-total text-right">$${(parseFloat(p.price) * (p.qty || 1)).toLocaleString()}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>

          <!-- Summary -->
          <div class="summary-section">
            <div class="column">
              ${showPayments ? `
                <div class="section-title">Payment Schedule</div>
                <div class="payment-schedule-card">
                  ${data.payments?.map((pay: any) => `
                    <div class="milestone-row">
                      <div class="milestone-info">
                        <div class="milestone-name">${pay.dueDate === 'Upon Signing' ? 'Booking Deposit' : 'Current Milestone'} (${pay.status || 'Pending'})</div>
                        <div class="milestone-date">${pay.dueDate}</div>
                      </div>
                      <div class="milestone-values">
                        <div class="milestone-percent">${pay.percentage}</div>
                        <div class="milestone-amount">$${parseFloat(pay.amount).toLocaleString()}</div>
                      </div>
                    </div>
                  `).join('')}
                </div>
              ` : ''}
            </div>
            
            <div class="totals-column">
              <div class="total-row">
                <span>Subtotal</span>
                <span class="total-value">$${subtotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
              </div>
              ${discountAmount > 0 ? `
                <div class="total-row">
                  <span>Discount</span>
                  <span class="total-value discount-value">-$${discountAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
              ` : ''}
              <div class="total-row">
                <span>Tax (${taxPercentage.toFixed(0)}%)</span>
                <span class="total-value">$${taxAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
              </div>
              <div class="total-row grand-total-row">
                <span class="total-label-large">Total Amount Due</span>
              </div>
              <div class="total-amount-large">$${parseFloat(data.totalAmount.toString()).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
            </div>
          </div>

          <!-- QR Section -->
          <div class="qr-section">
            <img src="${qrCodeUrl}" alt="Invoice QR Code" class="qr-img" />
            <div class="qr-text">Scan this QR code to verify invoice authenticity and view payment details.</div>
          </div>

          <!-- Footer -->
          <div class="footer">
            <div class="footer-links">
               <div class="footer-icon-link">
                 <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                 Securely handled by VeloFolio
               </div>
               <div class="footer-icon-link">
                 <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                 Download PDF
               </div>
            </div>
            <div>© ${new Date().getFullYear()} VeloFolio Inc.</div>
          </div>
        </div>

        <script>
          window.onload = () => {
            setTimeout(() => {
              window.print();
              window.onafterprint = () => window.close();
            }, 800);
          };
        </script>
      </body>
    </html>
  `);
  win.document.close();
};
