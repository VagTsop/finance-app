export interface Balance {
  current: number;
  income: number;
  expenses: number;
}

export interface Transaction {
  id: string;
  avatar: string;
  name: string;
  category: string;
  date: string;
  amount: number;
  recurring: boolean;
}

export interface Budget {
  id: string;
  category: string;
  maximum: number;
  theme: string;
}

export interface BudgetSummary extends Budget {
  spent: number;
  remaining: number;
  percentage: number;
}

export interface Pot {
  id: string;
  name: string;
  target: number;
  total: number;
  theme: string;
}

export interface PotSummary extends Pot {
  progress: number;
}

export interface FinanceData {
  balance: Balance;
  transactions: Transaction[];
  budgets: Budget[];
  pots: Pot[];
}
