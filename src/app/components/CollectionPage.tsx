import { motion } from 'motion/react';
import { Product } from '@/app/data/products';
import { useState } from 'react';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import { Currency, formatPrice } from '@/app/utils/currency';

interface CollectionPageProps {
  category: 'fragrance' | 'perfumery' | 'diffuser';
  products: Product[];
  onNavigate: (page: string, productId?: string) => void;
  selectedCurrency: Currency;
}

const categoryInfo = {
  fragrance: {
    title: 'Fragrances',
    subtitle: 'Signature scents that define your presence',
    description:
      'Our collection of fine fragrances represents the pinnacle of Nordic perfumery. Each composition is a carefully orchestrated symphony of notes, designed to evolve beautifully throughout the day.',
  },
  perfumery: {
    title: 'Perfumery Sets',
    subtitle: 'Curated collections for the discerning connoisseur',
    description:
      'Explore our expertly assembled sets, perfect for discovering your signature scent or gifting someone special. Each set is thoughtfully composed to offer a complete olfactory journey.',
  },
  diffuser: {
    title: 'Home Fragrance',
    subtitle: 'Transform your space into a sanctuary',
    description:
      'From reed diffusers to artisan candles, our home fragrance collection brings the essence of Scandinavian tranquility into your living spaces. Subtle, refined, and endlessly elegant.',
  },
};

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export function CollectionPage({ category, products, onNavigate, selectedCurrency }: CollectionPageProps) {
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high'>('featured');
  const info = categoryInfo[category];

  const sortedProducts = [...products].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    return b.featured ? 1 : -1;
  });

  const productImages = [
    'https://images.unsplash.com/photo-1758551038941-a67e29026bff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJmdW1lJTIwYm90dGxlJTIwZWxlZ2FudCUyMGdvbGQlMjBtaW5pbWFsfGVufDF8fHx8MTc2OTgzMDQ1Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    'https://images.unsplash.com/photo-1765031089460-0909ddc3835a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmVtaXVtJTIwZnJhZ3JhbmNlJTIwYm90dGxlJTIwZGFyayUyMGVsZWdhbnR8ZW58MXx8fHwxNzY5ODMwNDUzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    'https://images.unsplash.com/photo-1732928729959-2e8fdb5a5cd7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBmcmFncmFuY2UlMjBjb3NtZXRpY3MlMjBtaW5pbWFsfGVufDF8fHx8MTc2OTgzMDQ1Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    'https://images.unsplash.com/photo-1659440508785-c2783e46c384?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWVkJTIwZGlmZnVzZXIlMjBzdGlja3MlMjBsdXh1cnklMjBob21lfGVufDF8fHx8MTc2OTgzMDQ1Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    'https://images.unsplash.com/photo-1607713109008-d00372938c2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBjYW5kbGUlMjBkaWZmdXNlciUyMG1pbmltYWx8ZW58MXx8fHwxNzY5ODMwNDUyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    'https://images.unsplash.com/photo-1760804876250-605a3cd49ede?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmVtaXVtJTIwc2NlbnRlZCUyMGNhbmRsZSUyMGVsZWdhbnR8ZW58MXx8fHwxNzY5ODMwNDU3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  ];

  return (
    <div className="min-h-screen pt-32 pb-24">
      {/* Header */}
      <section className="px-6 md:px-12 mb-24 md:mb-32">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-4xl"
          >
            <div className="mb-8">
              <span
                style={{ fontFamily: 'Inter, sans-serif' }}
                className="text-xs tracking-[0.3em] uppercase text-foreground/40 mb-6 block"
              >
                Collection
              </span>
              <h1
                style={{ fontFamily: 'Cormorant, serif' }}
                className="text-6xl md:text-8xl lg:text-9xl mb-8 tracking-[-0.02em] leading-[0.95] font-light"
              >
                {info.title}
              </h1>
              <div className="w-24 h-[1px] bg-foreground/20 mb-10" />
            </div>

            <p
              style={{ fontFamily: 'Cormorant, serif' }}
              className="text-3xl md:text-4xl mb-8 text-foreground/70 leading-[1.4] font-light"
            >
              {info.subtitle}
            </p>

            <p
              style={{ fontFamily: 'Inter, sans-serif' }}
              className="text-base md:text-lg text-foreground/60 leading-[1.8] font-light max-w-2xl"
            >
              {info.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="px-6 md:px-12 mb-16">
        <div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 pb-8 border-b border-foreground/10"
          >
            <div
              style={{ fontFamily: 'Inter, sans-serif' }}
              className="text-sm text-foreground/60"
            >
              {sortedProducts.length} {sortedProducts.length === 1 ? 'Product' : 'Products'}
            </div>

            <div className="flex items-center gap-3">
              <span
                style={{ fontFamily: 'Inter, sans-serif' }}
                className="text-sm text-foreground/60"
              >
                Sort by:
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                style={{ fontFamily: 'Inter, sans-serif' }}
                className="text-sm bg-transparent border-b border-foreground/20 pb-1 cursor-pointer focus:outline-none focus:border-foreground/40 transition-colors"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="px-6 md:px-12">
        <div>
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16"
          >
            {sortedProducts.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                onNavigate={onNavigate}
                imageUrl={productImages[index % productImages.length]}
                selectedCurrency={selectedCurrency}
              />
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}

interface ProductCardProps {
  product: Product;
  onNavigate: (page: string, productId?: string) => void;
  imageUrl: string;
  selectedCurrency: Currency;
}

function ProductCard({ product, onNavigate, imageUrl, selectedCurrency }: ProductCardProps) {
  return (
    <motion.div
      variants={fadeInUp}
      className="group cursor-pointer"
      onClick={() => onNavigate('product', product.id)}
    >
      <div className="relative overflow-hidden mb-6 bg-secondary/50">
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <ImageWithFallback
            src={imageUrl}
            alt={product.name}
            className="w-full h-[500px] object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 transition-colors duration-500" />

        {product.featured && (
          <div className="absolute top-6 left-6">
            <div
              style={{ fontFamily: 'Inter, sans-serif' }}
              className="text-xs tracking-widest uppercase bg-background/90 backdrop-blur-sm px-4 py-2"
            >
              Featured
            </div>
          </div>
        )}
      </div>

      <div className="space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <h3
              style={{ fontFamily: 'Cormorant, serif' }}
              className="text-2xl md:text-3xl tracking-tight mb-2 group-hover:opacity-70 transition-opacity duration-300"
            >
              {product.name}
            </h3>
            <p
              style={{ fontFamily: 'Inter, sans-serif' }}
              className="text-sm text-foreground/60 leading-relaxed"
            >
              {product.shortDescription}
            </p>
          </div>
          <div className="text-right">
            <div
              style={{ fontFamily: 'Inter, sans-serif' }}
              className="text-lg mb-1"
            >
              {formatPrice(product.price, selectedCurrency)}
            </div>
            <div
              style={{ fontFamily: 'Inter, sans-serif' }}
              className="text-xs text-foreground/40"
            >
              {product.volume}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div
            style={{ fontFamily: 'Inter, sans-serif' }}
            className="text-xs tracking-wider uppercase text-foreground/40"
          >
            {product.intensity}
          </div>
          <div className="w-1 h-1 rounded-full bg-foreground/20" />
          <div
            style={{ fontFamily: 'Inter, sans-serif' }}
            className="text-xs text-foreground/40"
          >
            {product.notes.top.slice(0, 2).join(', ')}
          </div>
        </div>
      </div>
    </motion.div>
  );
}