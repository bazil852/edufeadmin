export interface Investment {
    id: number;
    amountInvested: string;
    interestType: 'Simple' | 'Compound';
    timePeriod: number;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface Portfolio {
    id: number;
    name: string;
    totalValue: string;
    isListedOnMarketplace: boolean;
    priceToSell: string | null;
    createdAt: string;
    updatedAt: string;
    investments: Investment[];
  }