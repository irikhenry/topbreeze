import { useState, useEffect } from 'react';
import { Navigation } from '@/app/components/Navigation';
import { HomePage } from '@/app/components/HomePage';
import { CollectionPage } from '@/app/components/CollectionPage';
import { ProductPage } from '@/app/components/ProductPage';
import { CartPage, CartItem } from '@/app/components/CartPage';
import { CheckoutPage } from '@/app/components/CheckoutPage';
import { products } from '@/app/data/products';
import { motion } from 'motion/react';
import { Currency } from '@/app/utils/currency';

type Page =
  | 'home'
  | 'collection-fragrance'
  | 'collection-perfumery'
  | 'collection-diffuser'
  | 'product'
  | 'cart'
  | 'checkout';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isDarkBackground, setIsDarkBackground] = useState(true);
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>('USD');

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // Reset to light background (dark text) for non-home pages
    if (currentPage !== 'home') {
      setIsDarkBackground(false);
    }
  }, [currentPage, selectedProductId]);

  const handleNavigate = (page: string, productId?: string) => {
    setCurrentPage(page as Page);
    if (productId) {
      setSelectedProductId(productId);
    }
  };

  const handleAddToCart = (productId: string, quantity: number) => {
    const product = products.find((p) => p.id === productId);
    if (!product) return;

    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.product.id === productId);
      if (existingItem) {
        return prev.map((item) =>
          item.product.id === productId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleCheckout = () => {
    setCurrentPage('checkout');
  };

  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const featuredProducts = products.filter((p) => p.featured);

  const fragrances = products.filter((p) => p.category === 'fragrance');
  const perfumery = products.filter((p) => p.category === 'perfumery');
  const diffusers = products.filter((p) => p.category === 'diffuser');

  const selectedProduct = products.find((p) => p.id === selectedProductId);
  const relatedProducts =
    selectedProduct
      ? products
          .filter(
            (p) =>
              p.category === selectedProduct.category && p.id !== selectedProduct.id
          )
          .slice(0, 3)
      : [];

  return (
    <div
      style={{ fontFamily: 'Inter, sans-serif' }}
      className="min-h-screen bg-background text-foreground antialiased"
    >
      <Navigation
        currentPage={currentPage}
        onNavigate={handleNavigate}
        cartItemCount={cartItemCount}
        isDarkBackground={isDarkBackground}
        selectedCurrency={selectedCurrency}
        onCurrencyChange={setSelectedCurrency}
      />

      <motion.main
        key={currentPage + selectedProductId}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
      >
        {currentPage === 'home' && (
          <HomePage
            featuredProducts={featuredProducts}
            onNavigate={handleNavigate}
            onHeaderThemeChange={setIsDarkBackground}
          />
        )}

        {currentPage === 'collection-fragrance' && (
          <CollectionPage
            category="fragrance"
            products={fragrances}
            onNavigate={handleNavigate}
            selectedCurrency={selectedCurrency}
          />
        )}

        {currentPage === 'collection-perfumery' && (
          <CollectionPage
            category="perfumery"
            products={perfumery}
            onNavigate={handleNavigate}
            selectedCurrency={selectedCurrency}
          />
        )}

        {currentPage === 'collection-diffuser' && (
          <CollectionPage
            category="diffuser"
            products={diffusers}
            onNavigate={handleNavigate}
            selectedCurrency={selectedCurrency}
          />
        )}

        {currentPage === 'product' && selectedProduct && (
          <ProductPage
            product={selectedProduct}
            onNavigate={handleNavigate}
            onAddToCart={handleAddToCart}
            relatedProducts={relatedProducts}
            selectedCurrency={selectedCurrency}
          />
        )}

        {currentPage === 'cart' && (
          <CartPage
            cartItems={cartItems}
            onNavigate={handleNavigate}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
            onCheckout={handleCheckout}
            selectedCurrency={selectedCurrency}
          />
        )}

        {currentPage === 'checkout' && (
          <CheckoutPage
            cartItems={cartItems}
            onNavigate={handleNavigate}
            selectedCurrency={selectedCurrency}
          />
        )}
      </motion.main>

      {/* Footer */}
      <footer className="border-t border-foreground/10 mt-32">
        <div className="px-6 md:px-12 py-16 md:py-24">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div>
              <h3
                style={{ fontFamily: 'Cormorant, serif' }}
                className="text-2xl mb-6 tracking-tight"
              >
                TopBreeze
              </h3>
              <p
                style={{ fontFamily: 'Inter, sans-serif' }}
                className="text-sm text-foreground/60 leading-relaxed"
              >
                Scandinavian luxury fragrances crafted with precision and elegance.
              </p>
            </div>

            <div>
              <h4
                style={{ fontFamily: 'Inter, sans-serif' }}
                className="text-sm tracking-widest uppercase mb-6"
              >
                Shop
              </h4>
              <nav className="space-y-3">
                <button
                  onClick={() => handleNavigate('collection-fragrance')}
                  className="block text-sm text-foreground/60 hover:text-foreground transition-colors"
                >
                  Fragrances
                </button>
                <button
                  onClick={() => handleNavigate('collection-perfumery')}
                  className="block text-sm text-foreground/60 hover:text-foreground transition-colors"
                >
                  Perfumery Sets
                </button>
                <button
                  onClick={() => handleNavigate('collection-diffuser')}
                  className="block text-sm text-foreground/60 hover:text-foreground transition-colors"
                >
                  Home Fragrance
                </button>
              </nav>
            </div>

            <div>
              <h4
                style={{ fontFamily: 'Inter, sans-serif' }}
                className="text-sm tracking-widest uppercase mb-6"
              >
                About
              </h4>
              <nav className="space-y-3">
                <a
                  href="#"
                  className="block text-sm text-foreground/60 hover:text-foreground transition-colors"
                >
                  Our Story
                </a>
                <a
                  href="#"
                  className="block text-sm text-foreground/60 hover:text-foreground transition-colors"
                >
                  Sustainability
                </a>
                <a
                  href="#"
                  className="block text-sm text-foreground/60 hover:text-foreground transition-colors"
                >
                  Contact
                </a>
              </nav>
            </div>

            <div>
              <h4
                style={{ fontFamily: 'Inter, sans-serif' }}
                className="text-sm tracking-widest uppercase mb-6"
              >
                Customer Care
              </h4>
              <nav className="space-y-3">
                <a
                  href="#"
                  className="block text-sm text-foreground/60 hover:text-foreground transition-colors"
                >
                  Shipping & Returns
                </a>
                <a
                  href="#"
                  className="block text-sm text-foreground/60 hover:text-foreground transition-colors"
                >
                  FAQ
                </a>
                <a
                  href="#"
                  className="block text-sm text-foreground/60 hover:text-foreground transition-colors"
                >
                  Privacy Policy
                </a>
              </nav>
            </div>
          </div>

          <div className="pt-8 border-t border-foreground/10">
            <p
              style={{ fontFamily: 'Inter, sans-serif' }}
              className="text-xs text-foreground/40 text-center"
            >
              © 2026 TopBreeze. All rights reserved. Crafted with care in Scandinavia.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}