import { motion, AnimatePresence } from 'motion/react';
import { Product } from '@/app/data/products';
import { ChevronLeft, Plus, Minus, Check } from 'lucide-react';
import { useState } from 'react';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import { Currency, formatPrice } from '@/app/utils/currency';

interface ProductPageProps {
  product: Product;
  onNavigate: (page: string) => void;
  onAddToCart: (productId: string, quantity: number) => void;
  relatedProducts: Product[];
  selectedCurrency: Currency;
}

export function ProductPage({
  product,
  onNavigate,
  onAddToCart,
  relatedProducts,
  selectedCurrency,
}: ProductPageProps) {
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  const handleAddToCart = () => {
    onAddToCart(product.id, quantity);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const productImages = [
    'https://images.unsplash.com/photo-1758551038941-a67e29026bff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJmdW1lJTIwYm90dGxlJTIwZWxlZ2FudCUyMGdvbGQlMjBtaW5pbWFsfGVufDF8fHx8MTc2OTgzMDQ1Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    'https://images.unsplash.com/photo-1765031089460-0909ddc3835a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmVtaXVtJTIwZnJhZ3JhbmNlJTIwYm90dGxlJTIwZGFyayUyMGVsZWdhbnR8ZW58MXx8fHwxNzY5ODMwNDUzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  ];

  const relatedImages = [
    'https://images.unsplash.com/photo-1732928729959-2e8fdb5a5cd7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBmcmFncmFuY2UlMjBjb3NtZXRpY3MlMjBtaW5pbWFsfGVufDF8fHx8MTc2OTgzMDQ1Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    'https://images.unsplash.com/photo-1659440508785-c2783e46c384?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWVkJTIwZGlmZnVzZXIlMjBzdGlja3MlMjBsdXh1cnklMjBob21lfGVufDF8fHx8MTc2OTgzMDQ1Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    'https://images.unsplash.com/photo-1607713109008-d00372938c2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBjYW5kbGUlMjBkaWZmdXNlciUyMG1pbmltYWx8ZW58MXx8fHwxNzY5ODMwNDUyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  ];

  return (
    <div className="min-h-screen pt-32 pb-24">
      {/* Back Button */}
      <div className="px-6 md:px-12 mb-12">
        <div>
          <motion.button
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            onClick={() => onNavigate(`collection-${product.category}`)}
            className="group inline-flex items-center gap-2 text-sm hover:opacity-60 transition-opacity"
          >
            <ChevronLeft className="w-4 h-4" />
            <span style={{ fontFamily: 'Inter, sans-serif' }} className="tracking-wide uppercase">
              Back to {product.category}
            </span>
          </motion.button>
        </div>
      </div>

      {/* Product Details */}
      <section className="px-6 md:px-12 mb-32">
        <div>
          <div className="grid lg:grid-cols-2 gap-16 md:gap-24">
            {/* Images */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-8"
            >
              <div className="relative overflow-hidden bg-secondary/50">
                <ImageWithFallback
                  src={productImages[0]}
                  alt={product.name}
                  className="w-full h-[700px] object-cover"
                />
              </div>
              <div className="relative overflow-hidden bg-secondary/50">
                <ImageWithFallback
                  src={productImages[1]}
                  alt={`${product.name} detail`}
                  className="w-full h-[500px] object-cover"
                />
              </div>
            </motion.div>

            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="lg:sticky lg:top-32 lg:self-start"
            >
              <div className="space-y-8">
                <div>
                  <span
                    style={{ fontFamily: 'Inter, sans-serif' }}
                    className="text-xs tracking-widest uppercase text-foreground/50 mb-4 block"
                  >
                    {product.category}
                  </span>
                  <h1
                    style={{ fontFamily: 'Cormorant, serif' }}
                    className="text-4xl md:text-6xl mb-6 tracking-tight leading-[1.1]"
                  >
                    {product.name}
                  </h1>
                  <div className="w-16 h-[1px] bg-foreground/20 mb-8" />
                  <p
                    style={{ fontFamily: 'Cormorant, serif' }}
                    className="text-xl md:text-2xl text-foreground/80 leading-[1.5] mb-8"
                  >
                    {product.shortDescription}
                  </p>
                  <p
                    style={{ fontFamily: 'Inter, sans-serif' }}
                    className="text-base leading-relaxed text-foreground/60"
                  >
                    {product.description}
                  </p>
                </div>

                {/* Mood & Story */}
                <div className="border-t border-foreground/10 pt-8 space-y-6">
                  <div>
                    <h3
                      style={{ fontFamily: 'Inter, sans-serif' }}
                      className="text-xs tracking-widest uppercase text-foreground/50 mb-3"
                    >
                      Mood
                    </h3>
                    <p
                      style={{ fontFamily: 'Cormorant, serif' }}
                      className="text-xl text-foreground/70 font-light"
                    >
                      {product.mood}
                    </p>
                  </div>
                  <div>
                    <h3
                      style={{ fontFamily: 'Inter, sans-serif' }}
                      className="text-xs tracking-widest uppercase text-foreground/50 mb-3"
                    >
                      Story
                    </h3>
                    <p
                      style={{ fontFamily: 'Inter, sans-serif' }}
                      className="text-base leading-relaxed text-foreground/60 font-light"
                    >
                      {product.story}
                    </p>
                  </div>
                </div>

                {/* Fragrance Notes */}
                <div className="border-t border-b border-foreground/10 py-8 space-y-6">
                  <h3
                    style={{ fontFamily: 'Inter, sans-serif' }}
                    className="text-sm tracking-widest uppercase text-foreground/50"
                  >
                    Fragrance Profile
                  </h3>

                  <div className="grid gap-6">
                    <NoteSection label="Top Notes" notes={product.notes.top} />
                    <NoteSection label="Heart Notes" notes={product.notes.heart} />
                    <NoteSection label="Base Notes" notes={product.notes.base} />
                  </div>

                  <div className="flex items-center gap-8 pt-4">
                    <div>
                      <div
                        style={{ fontFamily: 'Inter, sans-serif' }}
                        className="text-xs text-foreground/50 mb-1"
                      >
                        Volume
                      </div>
                      <div style={{ fontFamily: 'Inter, sans-serif' }} className="text-sm">
                        {product.volume}
                      </div>
                    </div>
                    <div>
                      <div
                        style={{ fontFamily: 'Inter, sans-serif' }}
                        className="text-xs text-foreground/50 mb-1"
                      >
                        Intensity
                      </div>
                      <div style={{ fontFamily: 'Inter, sans-serif' }} className="text-sm">
                        {product.intensity}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Ingredients & Usage */}
                <div className="border-b border-foreground/10 pb-8 space-y-6">
                  <div>
                    <h3
                      style={{ fontFamily: 'Inter, sans-serif' }}
                      className="text-xs tracking-widest uppercase text-foreground/50 mb-3"
                    >
                      Key Ingredients
                    </h3>
                    <p
                      style={{ fontFamily: 'Inter, sans-serif' }}
                      className="text-sm text-foreground/60 font-light"
                    >
                      {product.ingredients.join(', ')}
                    </p>
                  </div>
                  <div>
                    <h3
                      style={{ fontFamily: 'Inter, sans-serif' }}
                      className="text-xs tracking-widest uppercase text-foreground/50 mb-3"
                    >
                      Usage
                    </h3>
                    <p
                      style={{ fontFamily: 'Inter, sans-serif' }}
                      className="text-sm text-foreground/60 font-light"
                    >
                      {product.usage}
                    </p>
                  </div>
                </div>

                {/* Price & Add to Cart */}
                <div className="space-y-6">
                  <div
                    style={{ fontFamily: 'Cormorant, serif' }}
                    className="text-3xl md:text-4xl tracking-tight"
                  >
                    {formatPrice(product.price, selectedCurrency)}
                  </div>

                  {/* Quantity Selector */}
                  <div className="flex items-center gap-4">
                    <span
                      style={{ fontFamily: 'Inter, sans-serif' }}
                      className="text-sm text-foreground/60"
                    >
                      Quantity:
                    </span>
                    <div className="flex items-center border border-foreground/20">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="px-4 py-3 hover:bg-foreground/5 transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <div
                        style={{ fontFamily: 'Inter, sans-serif' }}
                        className="px-6 py-3 min-w-[60px] text-center border-x border-foreground/20"
                      >
                        {quantity}
                      </div>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="px-4 py-3 hover:bg-foreground/5 transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Add to Cart Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleAddToCart}
                    className="w-full px-10 py-5 bg-foreground text-background transition-all duration-300 hover:bg-foreground/90 relative overflow-hidden"
                  >
                    <AnimatePresence mode="wait">
                      {addedToCart ? (
                        <motion.span
                          key="added"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          className="inline-flex items-center gap-2"
                        >
                          <Check className="w-5 h-5" />
                          <span
                            style={{ fontFamily: 'Inter, sans-serif' }}
                            className="text-sm tracking-widest uppercase"
                          >
                            Added to Cart
                          </span>
                        </motion.span>
                      ) : (
                        <motion.span
                          key="add"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          style={{ fontFamily: 'Inter, sans-serif' }}
                          className="text-sm tracking-widest uppercase"
                        >
                          Add to Cart
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.button>

                  <p
                    style={{ fontFamily: 'Inter, sans-serif' }}
                    className="text-xs text-foreground/50 text-center"
                  >
                    Free shipping on orders over $200
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="px-6 md:px-12 py-24 border-t border-foreground/10">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              style={{ fontFamily: 'Cormorant, serif' }}
              className="text-3xl md:text-5xl mb-16 tracking-tight"
            >
              You May Also Like
            </motion.h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedProducts.map((relatedProduct, index) => (
                <motion.div
                  key={relatedProduct.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: index * 0.1 }}
                  className="group cursor-pointer"
                  onClick={() => onNavigate('product', relatedProduct.id)}
                >
                  <div className="relative overflow-hidden mb-6 bg-secondary/50">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <ImageWithFallback
                        src={relatedImages[index % relatedImages.length]}
                        alt={relatedProduct.name}
                        className="w-full h-[400px] object-cover"
                      />
                    </motion.div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-4">
                      <h3
                        style={{ fontFamily: 'Cormorant, serif' }}
                        className="text-2xl tracking-tight group-hover:opacity-70 transition-opacity"
                      >
                        {relatedProduct.name}
                      </h3>
                      <span style={{ fontFamily: 'Inter, sans-serif' }} className="text-sm">
                        {formatPrice(relatedProduct.price, selectedCurrency)}
                      </span>
                    </div>
                    <p
                      style={{ fontFamily: 'Inter, sans-serif' }}
                      className="text-sm text-foreground/60"
                    >
                      {relatedProduct.shortDescription}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

interface NoteSectionProps {
  label: string;
  notes: string[];
}

function NoteSection({ label, notes }: NoteSectionProps) {
  return (
    <div>
      <div
        style={{ fontFamily: 'Inter, sans-serif' }}
        className="text-xs text-foreground/50 mb-2"
      >
        {label}
      </div>
      <div style={{ fontFamily: 'Inter, sans-serif' }} className="text-sm">
        {notes.join(', ')}
      </div>
    </div>
  );
}