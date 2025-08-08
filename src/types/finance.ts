export interface FinancialItem {
  id?: string;
  value: string | number;
  category: string;
  subcategory?: string;
  frequency?: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly' | 'once';
  date?: string;
  description?: string;
  tags?: string[];
  isRecurring?: boolean;
  isVariable?: boolean;
  isTaxDeductible?: boolean;
  monthlyPayment?: number;
}
export interface FinancialData {
  incomes: FinancialItem[];
  expenses: FinancialItem[];
  savings?: FinancialItem[];
  investments?: FinancialItem[];
  debts?: FinancialItem[];
  assets?: FinancialItem[];
  liabilities?: FinancialItem[];
}
export interface EmotionalContext {
  mood: number;
  tags: string[];
  financialPersonality?: string;
  stressFactors?: string[];
}
export interface UserSettings {
  theme: 'neon' | 'pastel' | 'obsidian' | 'ethereal';
  currency: string;
  language: string;
  notificationsEnabled: boolean;
  dataRetentionMonths: number;
  privacyLevel: 'high' | 'standard' | 'low';
}
export interface SimulationParams {
  name: string;
  incomeGrowth: number;
  expenseReduction: number;
  savingsRate: number;
  investmentReturn: number;
  inflationRate: number;
  years: number;
}
export interface SimulationResult {
  years: number[];
  netWorth: number[];
  savings: number[];
  income: number[];
  expenses: number[];
}
export interface FinancialInsight {
  id: string;
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  category: 'savings' | 'expense' | 'income' | 'investment' | 'debt';
  action?: string;
  potentialSavings?: number;
}
export interface FinancialReport {
  id: string;
  title: string;
  date: string;
  insights: FinancialInsight[];
  summary: string;
  recommendations: string[];
  simulationResults?: SimulationResult;
}

export interface Prediction {
  [key: string]: unknown;
}

export interface HiddenFee {
  totalAmount: number;
  items: Array<{
    category: string;
    amount: number;
    description: string;
  }>;
}

export interface NewsArticle {
  title: string;
  description: string;
  url: string;
  source?: {
    name: string;
  };
  publishedAt: string;
  urlToImage?: string;
}

export interface InspirationalQuote {
  content: string;
  author: string;
}

export interface StockMarketData {
  symbol: string;
  price: string;
  change: string;
  changePercent: string;
}

export interface CryptoData {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
}

export interface HistoricalData {
  month: string;
  income: number;
  expenses: number;
  balance: number;
  savings: number;
  investments: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
}