export const fetchUsers = async () => {
  const accessToken = localStorage.getItem('accessToken');
  
  const [usersResponse, verificationsResponse] = await Promise.all([
    fetch(`${import.meta.env.VITE_API_URL}/user`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      }
    }),
    fetch(`${import.meta.env.VITE_API_URL}/identity-verification`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      }
    })
  ]);

  if (!usersResponse.ok || !verificationsResponse.ok) {
    throw new Error('Failed to fetch users or verifications');
  }

  const [users, verifications] = await Promise.all([
    usersResponse.json(),
    verificationsResponse.json()
  ]);

  // Create a map of user IDs to their verification status
  const verificationMap = verifications.reduce((map: Record<number, any>, verification: any) => {
    map[verification.user.id] = verification;
    return map;
  }, {});

  // Merge users with their verification status
  const usersWithVerification = users.map((user: any) => ({
    ...user,
    identityVerification: verificationMap[user.id] || null
  }));

  return usersWithVerification;
};

export const fetchInvestmentOpportunities = async () => {
  const accessToken = localStorage.getItem('accessToken');
  
  const response = await fetch(`${import.meta.env.VITE_API_URL}/investment-opportunities/`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    }
  });

  if (!response.ok) {
    throw new Error('Failed to fetch investment opportunities');
  }

  return response.json();
};

export const fetchUserPortfolios = async (userId: number) => {
  const accessToken = localStorage.getItem('accessToken');
  
  const response = await fetch(`${import.meta.env.VITE_API_URL}/portfolios/user/${userId}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    }
  });

  if (!response.ok) {
    throw new Error('Failed to fetch user portfolios');
  }

  return response.json();
};

export const fetchUserIdentityVerification = async (userId: number) => {
  const accessToken = localStorage.getItem('accessToken');
  
  const response = await fetch(`${import.meta.env.VITE_API_URL}/identity-verification/user/${userId}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    }
  });

  if (!response.ok) {
    if (response.status === 404) {
      return null;
    }
    throw new Error('Failed to fetch identity verification');
  }

  return response.json();
};

export const deleteUser = async (userId: number) => {
  const accessToken = localStorage.getItem('accessToken');
  
  const response = await fetch(`${import.meta.env.VITE_API_URL}/user/${userId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  });

  if (!response.ok) {
    throw new Error('Failed to delete user');
  }

  return true;
};