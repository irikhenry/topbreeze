export type Currency = 'USD' | 'EUR' | 'NGN' | 'XAF' | 'GHS';

export interface CurrencyInfo {
  code: Currency;
  symbol: string;
  name: string;
  rate: number; // Conversion rate from USD
}

export const currencies: Record<Currency, CurrencyInfo> = {
  USD: {
    code: 'USD',
    symbol: '$',
    name: 'US Dollar',
    rate: 1,
  },
  EUR: {
    code: 'EUR',
    symbol: '€',
    name: 'Euro',
    rate: 0.92, // 1 USD = 0.92 EUR
  },
  NGN: {
    code: 'NGN',
    symbol: '₦',
    name: 'Nigerian Naira',
    rate: 1550, // 1 USD = 1550 NGN
  },
  XAF: {
    code: 'XAF',
    symbol: 'FCFA',
    name: 'Central African CFA Franc',
    rate: 605, // 1 USD = 605 XAF
  },
  GHS: {
    code: 'GHS',
    symbol: '₵',
    name: 'Ghanaian Cedi',
    rate: 15.5, // 1 USD = 15.5 GHS
  },
};

export function convertPrice(priceInUSD: number, currency: Currency): number {
  const rate = currencies[currency].rate;
  return priceInUSD * rate;
}

export function formatPrice(priceInUSD: number, currency: Currency): string {
  const convertedPrice = convertPrice(priceInUSD, currency);
  const currencyInfo = currencies[currency];
  
  // Format with appropriate decimal places
  const decimals = currency === 'NGN' || currency === 'XAF' ? 0 : 2;
  const formattedAmount = convertedPrice.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  
  // For FCFA, put the symbol after the amount
  if (currency === 'XAF') {
    return `${formattedAmount} ${currencyInfo.symbol}`;
  }
  
  return `${currencyInfo.symbol}${formattedAmount}`;
}
