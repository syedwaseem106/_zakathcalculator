export type Madhab = 'Hanafi' | 'Shafi' | 'Maliki' | 'Hanbali';

export interface ZakatAssets {
  gold: {
    weight: number; // in grams
    price: number; // per gram
  };
  silver: {
    weight: number; // in grams
    price: number; // per gram
  };
  cash: {
    amount: number;
    currency: string;
  };
  businessInventory: {
    value: number;
    currency: string;
  };
  livestock: {
    type: 'camel' | 'cow' | 'sheep' | 'goat';
    count: number;
    value: number;
  }[];
  agriculturalProduce: {
    type: 'irrigated' | 'rain-fed';
    value: number;
    currency: string;
  };
  shares: {
    value: number;
    currency: string;
  };
  rentalIncome: {
    amount: number;
    currency: string;
  };
  debts: {
    amount: number;
    currency: string;
    type: 'receivable' | 'payable';
  }[];
}

export interface NisabValues {
  gold: number; // in grams
  silver: number; // in grams
  lastUpdated: string;
}

export interface ZakatCalculation {
  totalAssets: number;
  totalLiabilities: number;
  netZakatableAmount: number;
  zakatAmount: number;
  isZakatDue: boolean;
  madhab: Madhab;
  calculationDate: string;
  nisabValues: NisabValues;
}

export interface ZakatReference {
  source: 'Quran' | 'Hadith' | 'Fiqh';
  reference: string;
  description: string;
} 