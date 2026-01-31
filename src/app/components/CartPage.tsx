import { motion, AnimatePresence } from 'motion/react';
import { Product } from '@/app/data/products';
import { ChevronLeft, Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import { Currency, formatPrice } from '@/app/utils/currency';

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartPageProps {
  cartItems: CartItem[];
  onNavigate: (page: string) => void;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onCheckout: () => void;
  selectedCurrency: Currency;
}

export function CartPage({
  cartItems,
  onNavigate,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
  selectedCurrency,
}: CartPageProps) {
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const shipping = subtotal > 200 ? 0 : 15;
  const total = subtotal + shipping;

  const productImages = [
    'https://images.unsplash.com/photo-1758551038941-a67e29026bff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJmdW1lJTIwYm90dGxlJTIwZWxlZ2FudCUyMGdvbGQlMjBtaW5pbWFsfGVufDF8fHx8MTc2OTgzMDQ1Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    'https://images.unsplash.com/photo-1765031089460-0909ddc3835a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmVtaXVtJTIwZnJhZ3JhbmNlJTIwYm90dGxlJTIwZGFyayUyMGVsZWdhbnR8ZW58MXx8fHwxNzY5ODMwNDUzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    'https://images.unsplash.com/photo-1732928729959-2e8fdb5a5cd7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBmcmFncmFuY2UlMjBjb3NtZXRpY3MlMjBtaW5pbWFsfGVufDF8fHx8MTc2OTgzMDQ1Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  ];

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen pt-32 pb-24 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-md px-6"
        >
          <div className="mb-8 flex justify-center">
            <div className="w-24 h-24 rounded-full bg-secondary/50 flex items-center justify-center">
              <ShoppingBag className="w-10 h-10 text-foreground/40" />
            </div>
          </div>
          <h1
            style={{ fontFamily: 'Cormorant, serif' }}
            className="text-4xl md:text-5xl mb-6 tracking-tight"
          >
            Your Cart is Empty
          </h1>
          <p
            style={{ fontFamily: 'Inter, sans-serif' }}
            className="text-base text-foreground/60 mb-12 leading-relaxed"
          >
            Discover our collection of refined fragrances and home scents crafted with
            Scandinavian elegance.
          </p>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onNavigate('home')}
            className="px-10 py-5 bg-foreground text-background transition-all duration-300 hover:bg-foreground/90"
          >
            <span
              style={{ fontFamily: 'Inter, sans-serif' }}
              className="text-sm tracking-widest uppercase"
            >
              Continue Shopping
            </span>
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-24">
      {/* Header */}
      <div className="px-6 md:px-12 mb-12">
        <div>
          <motion.button
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            onClick={() => onNavigate('home')}
            className="group inline-flex items-center gap-2 text-sm hover:opacity-60 transition-opacity"
          >
            <ChevronLeft className="w-4 h-4" />
            <span style={{ fontFamily: 'Inter, sans-serif' }} className="tracking-wide uppercase">
              Continue Shopping
            </span>
          </motion.button>
        </div>
      </div>

      {/* Cart Content */}
      <div className="px-6 md:px-12">
        <div>
          <div className="grid lg:grid-cols-3 gap-16">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-8">
              <AnimatePresence mode="popLayout">
                {cartItems.map((item, index) => (
                  <motion.div
                    key={item.product.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.5 }}
                    className="flex gap-6 pb-8 border-b border-foreground/10"
                  >
                    {/* Product Image */}
                    <div className="w-32 h-32 flex-shrink-0 overflow-hidden bg-secondary/50">
                      <ImageWithFallback
                        src={productImages[index % productImages.length]}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h3
                          style={{ fontFamily: 'Cormorant, serif' }}
                          className="text-2xl tracking-tight mb-2"
                        >
                          {item.product.name}
                        </h3>
                        <p
                          style={{ fontFamily: 'Inter, sans-serif' }}
                          className="text-sm text-foreground/60 mb-3"
                        >
                          {item.product.shortDescription}
                        </p>
                        <div
                          style={{ fontFamily: 'Inter, sans-serif' }}
                          className="text-xs text-foreground/40"
                        >
                          {item.product.volume}
                        </div>
                      </div>

                      {/* Quantity & Price */}
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center border border-foreground/20">
                          <button
                            onClick={() =>
                              onUpdateQuantity(
                                item.product.id,
                                Math.max(1, item.quantity - 1)
                              )
                            }
                            className="px-3 py-2 hover:bg-foreground/5 transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <div
                            style={{ fontFamily: 'Inter, sans-serif' }}
                            className="px-4 py-2 min-w-[50px] text-center text-sm border-x border-foreground/20"
                          >
                            {item.quantity}
                          </div>
                          <button
                            onClick={() =>
                              onUpdateQuantity(item.product.id, item.quantity + 1)
                            }
                            className="px-3 py-2 hover:bg-foreground/5 transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <div className="flex items-center gap-6">
                          <div style={{ fontFamily: 'Inter, sans-serif' }} className="text-lg">
                            {formatPrice(item.product.price * item.quantity, selectedCurrency)}
                          </div>
                          <button
                            onClick={() => onRemoveItem(item.product.id)}
                            className="text-foreground/40 hover:text-destructive transition-colors"
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Order Summary */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="lg:sticky lg:top-32 lg:self-start"
            >
              <div className="border border-foreground/10 p-8 space-y-6">
                <h2
                  style={{ fontFamily: 'Cormorant, serif' }}
                  className="text-2xl tracking-tight mb-6"
                >
                  Order Summary
                </h2>

                <div className="space-y-4 pb-6 border-b border-foreground/10">
                  <div
                    style={{ fontFamily: 'Inter, sans-serif' }}
                    className="flex justify-between text-sm"
                  >
                    <span className="text-foreground/60">Subtotal</span>
                    <span>{formatPrice(subtotal, selectedCurrency)}</span>
                  </div>
                  <div
                    style={{ fontFamily: 'Inter, sans-serif' }}
                    className="flex justify-between text-sm"
                  >
                    <span className="text-foreground/60">Shipping</span>
                    <span>{shipping === 0 ? 'Free' : formatPrice(shipping, selectedCurrency)}</span>
                  </div>
                  {shipping > 0 && (
                    <p
                      style={{ fontFamily: 'Inter, sans-serif' }}
                      className="text-xs text-foreground/50"
                    >
                      Free shipping on orders over {formatPrice(200, selectedCurrency)}
                    </p>
                  )}
                </div>

                <div
                  style={{ fontFamily: 'Inter, sans-serif' }}
                  className="flex justify-between text-lg pt-2"
                >
                  <span>Total</span>
                  <span style={{ fontFamily: 'Cormorant, serif' }} className="text-2xl">
                    {formatPrice(total, selectedCurrency)}
                  </span>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onCheckout}
                  className="w-full px-10 py-5 bg-foreground text-background transition-all duration-300 hover:bg-foreground/90 mt-6"
                >
                  <span
                    style={{ fontFamily: 'Inter, sans-serif' }}
                    className="text-sm tracking-widest uppercase"
                  >
                    Proceed to Checkout
                  </span>
                </motion.button>

                <p
                  style={{ fontFamily: 'Inter, sans-serif' }}
                  className="text-xs text-foreground/50 text-center mt-4"
                >
                  Secure WhatsApp checkout
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}