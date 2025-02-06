export const fetchUsers = async () => {
  const accessToken = localStorage.getItem('accessToken');
  
  const response = await fetch(`${import.meta.env.VITE_API_URL}/user`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    }
  });

  if (!response.ok) {
    throw new Error('Failed to fetch users');
  }

  return response.json();
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