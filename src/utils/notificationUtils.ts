interface KYCNotificationPayload {
  userId: string;
  userName: string;
  action: 'hold' | 'reject';
  reason: string;
}

export const sendKYCNotification = async (payload: KYCNotificationPayload) => {
  const { userId, userName, action, reason } = payload;
  
  // Email notification content
  const emailContent = {
    subject: `KYC Verification ${action === 'hold' ? 'On Hold' : 'Rejected'}`,
    body: `Dear ${userName},

Your KYC verification has been ${action === 'hold' ? 'put on hold' : 'rejected'} for the following reason:

${reason}

${action === 'hold' 
  ? 'Please provide the requested information to continue with the verification process.'
  : 'You may submit a new verification request after addressing the mentioned issues.'}

If you have any questions, please contact our support team.

Best regards,
Edufe Team`
  };

  // Push notification content
  const pushContent = {
    title: `KYC Verification ${action === 'hold' ? 'On Hold' : 'Rejected'}`,
    message: reason,
    type: 'kyc_status',
    userId,
    priority: 'high'
  };

  try {
    // In a real application, these would be API calls to your notification service
    console.log('Sending email notification:', emailContent);
    console.log('Sending push notification:', pushContent);
    
    return {
      success: true,
      message: 'Notifications sent successfully'
    };
  } catch (error) {
    console.error('Error sending notifications:', error);
    throw new Error('Failed to send notifications');
  }
};