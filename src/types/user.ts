export interface User {
  id: number;
  fullName: string;
  email: string;
  resetPasswordToken: string | null;
  resetPasswordTokenExpiry: string | null;
  phoneNo: string | null;
  address: string | null;
  photo: string | null;
  otp: string | null;
  otpExpiry: string | null;
  role: string;
  accessLevel: string | null;
  isEmailVerified: boolean;
  emailVerificationToken: string;
  emailVerificationTokenExpiry: string;
  isPhoneNoVerified: boolean;
  getNotifications: boolean;
  bio: string;
  createdAt: string;
  updatedAt: string;
}

export interface IdentityVerification {
  id: number;
  idType: string;
  idUrl: string;
  status: string;
  rejectionReason: string | null;
  reviewedAt: string | null;
  createdAt: string;
  updatedAt: string;
  reviewedBy: string | null;
  user: User;
}