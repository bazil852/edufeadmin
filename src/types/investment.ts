export interface ROICondition {
  months: number;
  minAmount: number;
  roiPercentage: number;
}

export interface Investment {
  id: string;
  title: string;
  description: string;
  minInvestmentAmount: number;
  roiConditions: ROICondition[];
  edufeMargin: number;
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
}

export interface MarginUpdateOptions {
  type: 'all' | 'new_only';
  percentage: number;
}