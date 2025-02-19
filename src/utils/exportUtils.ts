import { User } from '../types/user';

export const exportUsersToCSV = (users: User[]) => {
  // Define CSV headers
  const headers = [
    'Full Name',
    'Email',
    'Role',
    'Source of Income',
    'Phone Number',
    'Email Verified',
    'Phone Verified',
    'KYC Status',
    'Joined Date',
    'Last Updated'
  ];

  // Transform user data into CSV rows
  const rows = users.map(user => [
    user.fullName,
    user.email,
    user.role,
    user.sourceOfIncome || 'Not Specified',
    user.phoneNo || 'N/A',
    user.isEmailVerified ? 'Yes' : 'No',
    user.isPhoneNoVerified ? 'Yes' : 'No',
    user.identityVerification?.status || 'NOT SUBMITTED',
    new Date(user.createdAt).toLocaleDateString(),
    new Date(user.updatedAt).toLocaleDateString()
  ]);

  // Combine headers and rows
  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
  ].join('\n');

  // Create blob and download
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', `users_export_${new Date().toISOString().split('T')[0]}.csv`);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const exportToCSV = (data: any[], filename: string) => {
  // Get headers from the first object
  const headers = Object.keys(data[0]);

  // Transform data into CSV rows
  const rows = data.map(item =>
    headers.map(header => {
      const value = item[header];
      // Escape quotes and wrap in quotes if contains comma or newline
      const cell = String(value).replace(/"/g, '""');
      return /[,\n"]/.test(cell) ? `"${cell}"` : cell;
    })
  );

  // Combine headers and rows
  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.join(','))
  ].join('\n');

  // Create and download the file
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};