import { useState } from 'react';
import { motion } from 'motion/react';
import { Menu, X, ShoppingBag } from 'lucide-react';
import { CurrencySwitcher } from '@/app/components/CurrencySwitcher';
import { Currency } from '@/app/utils/currency';

interface NavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  cartItemCount: number;
  isDarkBackground?: boolean;
  selectedCurrency: Currency;
  onCurrencyChange: (currency: Currency) => void;
}

export function Navigation({ 
  currentPage, 
  onNavigate, 
  cartItemCount, 
  isDarkBackground = false,
  selectedCurrency,
  onCurrencyChange,
}: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', page: 'home' },
    { label: 'Fragrance', page: 'collection-fragrance' },
    { label: 'Perfumery', page: 'collection-perfumery' },
    { label: 'Diffusers', page: 'collection-diffuser' },
  ];

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md transition-all duration-500 ${
        isDarkBackground 
          ? 'border-b border-white/10 text-white' 
          : 'border-b border-foreground/10 text-foreground'
      }`}
    >
      <div className="px-6 md:px-12 py-6 md:py-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => onNavigate('home')}
            className="group"
            aria-label="TopBreeze Home"
          >
            <motion.div
              whileHover={{ opacity: 0.7 }}
              transition={{ duration: 0.3 }}
              style={{ fontFamily: 'Cormorant, serif' }}
              className={`text-2xl md:text-3xl tracking-tight transition-colors duration-500 ${
                isDarkBackground ? 'text-white' : 'text-foreground'
              }`}
            >
              TopBreeze
            </motion.div>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-12">
            {navLinks.map((link) => (
              <button
                key={link.page}
                onClick={() => onNavigate(link.page)}
                className="relative group"
              >
                <span
                  style={{ fontFamily: 'Inter, sans-serif' }}
                  className={`text-sm tracking-wide uppercase transition-all duration-500 group-hover:opacity-50 ${
                    isDarkBackground ? 'text-white' : 'text-foreground'
                  }`}
                >
                  {link.label}
                </span>
                {currentPage === link.page && (
                  <motion.div
                    layoutId="activeNav"
                    className={`absolute -bottom-1 left-0 right-0 h-[1px] transition-colors duration-500 ${
                      isDarkBackground ? 'bg-white' : 'bg-foreground'
                    }`}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Cart & Mobile Menu */}
          <div className="flex items-center gap-6">
            {/* Currency Switcher */}
            <CurrencySwitcher
              selectedCurrency={selectedCurrency}
              onCurrencyChange={onCurrencyChange}
              isDarkBackground={isDarkBackground}
            />
            
            <button
              onClick={() => onNavigate('cart')}
              className="relative group"
              aria-label="Shopping cart"
            >
              <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
                <ShoppingBag className={`w-5 h-5 transition-all duration-500 group-hover:opacity-50 ${
                  isDarkBackground ? 'text-white' : 'text-foreground'
                }`} />
              </motion.div>
              {cartItemCount > 0 && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className={`absolute -top-2 -right-2 w-5 h-5 rounded-full flex items-center justify-center transition-colors duration-500 ${
                    isDarkBackground 
                      ? 'bg-white text-black' 
                      : 'bg-foreground text-background'
                  }`}
                  style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px' }}
                >
                  {cartItemCount}
                </motion.div>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className={`w-6 h-6 transition-colors duration-500 ${
                  isDarkBackground ? 'text-white' : 'text-foreground'
                }`} />
              ) : (
                <Menu className={`w-6 h-6 transition-colors duration-500 ${
                  isDarkBackground ? 'text-white' : 'text-foreground'
                }`} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden mt-8 pb-4"
          >
            <div className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <button
                  key={link.page}
                  onClick={() => {
                    onNavigate(link.page);
                    setMobileMenuOpen(false);
                  }}
                  className="text-left"
                >
                  <span
                    style={{ fontFamily: 'Inter, sans-serif' }}
                    className={`text-sm tracking-wide uppercase transition-all duration-500 hover:opacity-50 ${
                      isDarkBackground ? 'text-white' : 'text-foreground'
                    }`}
                  >
                    {link.label}
                  </span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}