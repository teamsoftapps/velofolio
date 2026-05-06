/** @format */

export const printPrivacyPolicy = (lastUpdated: string, sections: { title: string, content: string }[]) => {
  const win = window.open("", "_blank");
  if (!win) return;

  win.document.write(`
    <html>
      <head>
        <title>Velofolio Privacy Policy</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
          
          * { margin: 0; padding: 0; box-sizing: border-box; }
          
          body { 
            font-family: 'Inter', sans-serif; 
            color: #1f2937; 
            line-height: 1.6; 
            background-color: white;
            padding: 40px;
          }

          .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 2px solid #01B0E9;
            padding-bottom: 20px;
            margin-bottom: 25px;
          }

          .logo-container {
            display: flex;
            align-items: center;
          }

          .logo-img {
            width: 140px;
            height: auto;
            object-fit: contain;
          }

          .brand-name {
            font-size: 24px;
            font-weight: 800;
            color: #000;
            letter-spacing: -0.025em;
          }

          .doc-info {
            text-align: right;
          }

          .doc-title {
            font-size: 28px;
            font-weight: 800;
            color: #111827;
            margin-bottom: 2px;
          }

          .last-updated {
            color: #6b7280;
            font-size: 14px;
            font-weight: 500;
          }

          .content {
            max-width: 800px;
            margin: 0 auto;
          }

          .intro {
            font-size: 16px;
            color: #4b5563;
            margin-bottom: 25px;
            padding: 20px;
            background-color: #f9fafb;
            border-radius: 12px;
            border-left: 4px solid #01B0E9;
          }

          .section {
            margin-bottom: 20px;
          }

          .section-title {
            font-size: 20px;
            font-weight: 700;
            color: #111827;
            margin-bottom: 12px;
            display: flex;
            align-items: center;
            gap: 10px;
          }

          .section-content {
            font-size: 16px;
            color: #374151;
            text-align: justify;
          }

          .footer {
            margin-top: 60px;
            padding-top: 30px;
            border-top: 1px solid #e5e7eb;
            text-align: center;
            color: #9ca3af;
            font-size: 12px;
          }

          @media print {
            body { padding: 0; }
            button { display: none; }
            .no-print { display: none; }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="logo-container">
            <img src="/images/logo.png" class="logo-img" alt="Logo" />
          </div>
          <div class="doc-info">
            <h1 class="doc-title">Privacy Policy</h1>
            <p class="last-updated">Last Updated: ${lastUpdated}</p>
          </div>
        </div>

        <div class="content">
          <div class="intro">
            At Velofolio, your privacy is our top priority. This document outlines how we collect, use, and protect your data to ensure a secure and transparent experience on our platform.
          </div>

          ${sections.map(section => `
            <div class="section">
              <h2 class="section-title">${section.title}</h2>
              <p class="section-content">${section.content}</p>
            </div>
          `).join('')}

          <div class="footer">
            &copy; ${new Date().getFullYear()} All rights reserved. Professional Photography Workflow Solutions.
          </div>
        </div>

        <script>
          window.onload = () => {
            window.print();
            // Optional: close window after print
            // window.onafterprint = () => window.close();
          };
        </script>
      </body>
    </html>
  `);
  win.document.close();
};
