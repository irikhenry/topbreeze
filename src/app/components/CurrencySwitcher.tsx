import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { Currency, currencies } from '@/app/utils/currency';

interface CurrencySwitcherProps {
  selectedCurrency: Currency;
  onCurrencyChange: (currency: Currency) => void;
  isDarkBackground?: boolean;
}

export function CurrencySwitcher({
  selectedCurrency,
  onCurrencyChange,
  isDarkBackground = false,
}: CurrencySwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currencyList = Object.values(currencies);
  const selectedCurrencyInfo = currencies[selectedCurrency];

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group flex items-center gap-2"
        aria-label="Select currency"
      >
        <span
          style={{ fontFamily: 'Inter, sans-serif' }}
          className={`text-sm tracking-wide uppercase transition-all duration-500 group-hover:opacity-50 ${
            isDarkBackground ? 'text-white' : 'text-foreground'
          }`}
        >
          {selectedCurrencyInfo.code}
        </span>
        <ChevronDown
          className={`w-3 h-3 transition-all duration-500 ${
            isOpen ? 'rotate-180' : 'rotate-0'
          } ${isDarkBackground ? 'text-white' : 'text-foreground'}`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className={`absolute top-full right-0 mt-3 min-w-[200px] backdrop-blur-xl border shadow-2xl z-50 ${
              isDarkBackground
                ? 'bg-black/80 border-white/20'
                : 'bg-white/95 border-foreground/10'
            }`}
          >
            {currencyList.map((currency) => (
              <button
                key={currency.code}
                onClick={() => {
                  onCurrencyChange(currency.code);
                  setIsOpen(false);
                }}
                className={`w-full px-6 py-4 text-left transition-all duration-300 ${
                  selectedCurrency === currency.code
                    ? isDarkBackground
                      ? 'bg-white/10'
                      : 'bg-foreground/5'
                    : isDarkBackground
                    ? 'hover:bg-white/5'
                    : 'hover:bg-foreground/5'
                }`}
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <div
                      style={{ fontFamily: 'Inter, sans-serif' }}
                      className={`text-sm font-medium mb-1 ${
                        isDarkBackground ? 'text-white' : 'text-foreground'
                      }`}
                    >
                      {currency.code}
                    </div>
                    <div
                      style={{ fontFamily: 'Inter, sans-serif' }}
                      className={`text-xs ${
                        isDarkBackground ? 'text-white/60' : 'text-foreground/60'
                      }`}
                    >
                      {currency.name}
                    </div>
                  </div>
                  <span
                    style={{ fontFamily: 'Inter, sans-serif' }}
                    className={`text-lg ${
                      isDarkBackground ? 'text-white/80' : 'text-foreground/80'
                    }`}
                  >
                    {currency.symbol}
                  </span>
                </div>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
