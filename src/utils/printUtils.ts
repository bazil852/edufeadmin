import { User } from '../types';

export const printUserDetails = (user: User) => {
  // Create a new window for printing
  const printWindow = window.open('', '_blank');
  if (!printWindow) return;

  // Create print-friendly content
  const content = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>User Details - ${user.name}</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            padding: 20px;
            max-width: 800px;
            margin: 0 auto;
          }
          .header {
            text-align: center;
            margin-bottom: 30px;
            padding-bottom: 10px;
            border-bottom: 2px solid #114A55;
          }
          .section {
            margin-bottom: 20px;
            padding-bottom: 20px;
            border-bottom: 1px solid #eee;
          }
          .grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
          }
          .field {
            margin-bottom: 10px;
          }
          .label {
            font-weight: bold;
            color: #666;
          }
          .value {
            color: #333;
          }
          .status {
            display: inline-block;
            padding: 5px 10px;
            border-radius: 15px;
            font-size: 14px;
            font-weight: bold;
          }
          .status-verified {
            background-color: #dcfce7;
            color: #166534;
          }
          .status-pending {
            background-color: #fef9c3;
            color: #854d0e;
          }
          .status-rejected {
            background-color: #fee2e2;
            color: #991b1b;
          }
          .documents {
            page-break-before: always;
          }
          img {
            max-width: 100%;
            height: auto;
            margin-bottom: 10px;
          }
          @media print {
            body { margin: 0; padding: 20px; }
            .no-print { display: none; }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>User Details Report</h1>
          <p>Generated on ${new Date().toLocaleString()}</p>
        </div>

        <div class="section">
          <h2>Personal Information</h2>
          <div class="grid">
            <div class="field">
              <div class="label">Name</div>
              <div class="value">${user.name}</div>
            </div>
            <div class="field">
              <div class="label">Email</div>
              <div class="value">${user.email}</div>
            </div>
            <div class="field">
              <div class="label">KYC Status</div>
              <div class="status status-${user.kycStatus}">
                ${user.kycStatus.charAt(0).toUpperCase() + user.kycStatus.slice(1)}
              </div>
            </div>
            <div class="field">
              <div class="label">Joined Date</div>
              <div class="value">${user.joinedAt}</div>
            </div>
          </div>
        </div>

        <div class="section">
          <h2>Bank Account Details</h2>
          <div class="grid">
            <div class="field">
              <div class="label">Bank Name</div>
              <div class="value">Banco Industrial</div>
            </div>
            <div class="field">
              <div class="label">Account Number</div>
              <div class="value">0175-0001-1234-5678</div>
            </div>
            <div class="field">
              <div class="label">Account Type</div>
              <div class="value">Savings</div>
            </div>
            <div class="field">
              <div class="label">Swift/BIC Code</div>
              <div class="value">INDGGTGCXXX</div>
            </div>
            <div class="field">
              <div class="label">Branch</div>
              <div class="value">Central Branch - Guatemala City</div>
            </div>
          </div>
        </div>

        <div class="section documents">
          <h2>KYC Documents</h2>
          <div class="grid">
            <div>
              <div class="label">Photo ID</div>
              <img src="https://i.postimg.cc/d121ZWks/image.png" alt="ID Document" />
            </div>
            <div>
              <div class="label">Driver's License/Passport</div>
              <img src="https://i.postimg.cc/L5mstzLz/image.png" alt="License/Passport" />
            </div>
          </div>
        </div>
      </body>
    </html>
  `;

  // Write content to the new window
  printWindow.document.write(content);
  printWindow.document.close();

  // Wait for images to load before printing
  printWindow.onload = () => {
    printWindow.print();
    // Close the window after printing (optional)
    printWindow.onafterprint = () => {
      printWindow.close();
    };
  };
};