import { motion, useScroll, useTransform } from 'motion/react';
import { ChevronRight, ArrowDown } from 'lucide-react';
import { Product } from '@/app/data/products';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import { useRef, useEffect } from 'react';

interface HomePageProps {
  featuredProducts: Product[];
  onNavigate: (page: string, productId?: string) => void;
  onHeaderThemeChange?: (isDark: boolean) => void;
}

export function HomePage({ featuredProducts, onNavigate, onHeaderThemeChange }: HomePageProps) {
  const heroRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.15]);

  // Detect scroll position to change header theme
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const heroHeight = window.innerHeight;
      
      // If we're in the hero section (dark background), header should be light
      // Otherwise (light background), header should be dark
      const isInHero = scrollPosition < heroHeight - 100;
      onHeaderThemeChange?.(isInHero);
    };

    handleScroll(); // Call on mount
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [onHeaderThemeChange]);

  return (
    <div className="min-h-screen">
      {/* Cinematic Hero Section */}
      <section ref={heroRef} className="relative h-screen overflow-hidden">
        <motion.div
          style={{ opacity: heroOpacity, scale: heroScale }}
          className="absolute inset-0 z-0"
        >
          <ImageWithFallback
            src="https://c.stocksy.com/a/JiCN00/z9/5530419.jpg"
            alt="Nordic luxury"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-background" />
        </motion.div>

        <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.3 }}
            className="text-center max-w-5xl"
          >
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.5 }}
              style={{ fontFamily: 'Inter, sans-serif' }}
              className="text-xs md:text-sm tracking-[0.3em] uppercase mb-8 text-white/70"
            >
              Est. 2024 — Scandinavia
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.7 }}
              style={{ fontFamily: 'Cormorant, serif' }}
              className="text-6xl md:text-8xl lg:text-9xl mb-12 tracking-[-0.02em] leading-[0.95] font-light text-white"
            >
              TopBreeze
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.9 }}
              style={{ fontFamily: 'Cormorant, serif' }}
              className="text-xl md:text-3xl lg:text-4xl mb-16 max-w-4xl mx-auto leading-[1.5] font-light text-white/90"
            >
              Olfactory artistry rooted in the pure,
              <br />
              minimal elegance of the North
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="absolute bottom-16"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="flex flex-col items-center gap-3"
            >
              <span
                style={{ fontFamily: 'Inter, sans-serif' }}
                className="text-xs tracking-[0.3em] uppercase text-white/60"
              >
                Scroll
              </span>
              <ArrowDown className="w-4 h-4 text-white/60" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Editorial Introduction */}
      <section className="py-32 md:py-48 px-6 md:px-12">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-150px' }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-4xl"
          >
            <h2
              style={{ fontFamily: 'Cormorant, serif' }}
              className="text-5xl md:text-7xl lg:text-8xl mb-12 tracking-[-0.02em] leading-[1.1] font-light"
            >
              Where nature's quiet power
              <br />
              meets refined intention
            </h2>
            <div className="w-24 h-[1px] bg-foreground/20 mb-12" />
            <p
              style={{ fontFamily: 'Inter, sans-serif' }}
              className="text-lg md:text-2xl leading-[1.8] text-foreground/60 font-light"
            >
              Each TopBreeze creation begins with silence—the kind found in Nordic forests,
              along windswept coastlines, beneath endless skies. We distill these moments
              into liquid form, crafting fragrances that speak softly yet leave lasting impressions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Product - Large Editorial */}
      <section className="mb-32 md:mb-48">
        <div className="px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-200px' }}
            transition={{ duration: 1.2 }}
            className="grid lg:grid-cols-2 gap-0"
          >
            {/* Large Image */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-150px' }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="relative h-[70vh] lg:h-[90vh] overflow-hidden group cursor-pointer"
              onClick={() => onNavigate('product', featuredProducts[0]?.id)}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="w-full h-full"
              >
                <ImageWithFallback
                  src="https://c.stocksy.com/a/MkLP00/z9/6041798.jpg"
                  alt={featuredProducts[0]?.name}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </motion.div>

            {/* Editorial Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-150px' }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="bg-secondary/30 p-12 md:p-20 flex flex-col justify-center"
            >
              <span
                style={{ fontFamily: 'Inter, sans-serif' }}
                className="text-xs tracking-[0.3em] uppercase mb-8 text-foreground/40"
              >
                Signature Fragrance
              </span>
              <h3
                style={{ fontFamily: 'Cormorant, serif' }}
                className="text-5xl md:text-6xl lg:text-7xl mb-8 tracking-[-0.02em] leading-[1.05] font-light"
              >
                {featuredProducts[0]?.name}
              </h3>
              <p
                style={{ fontFamily: 'Cormorant, serif' }}
                className="text-2xl md:text-3xl mb-10 leading-[1.5] text-foreground/70 font-light"
              >
                {featuredProducts[0]?.shortDescription}
              </p>
              <p
                style={{ fontFamily: 'Inter, sans-serif' }}
                className="text-base md:text-lg mb-12 leading-[1.8] text-foreground/60 font-light"
              >
                {featuredProducts[0]?.description}
              </p>

              <motion.button
                whileHover={{ x: 10 }}
                transition={{ duration: 0.3 }}
                onClick={() => onNavigate('product', featuredProducts[0]?.id)}
                className="group inline-flex items-center gap-4 self-start"
              >
                <span
                  style={{ fontFamily: 'Inter, sans-serif' }}
                  className="text-sm tracking-[0.2em] uppercase border-b border-foreground pb-2"
                >
                  Discover
                </span>
                <ChevronRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-2" />
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Philosophy Statement */}
      <section className="py-32 md:py-48 px-6 md:px-12 bg-secondary/20">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-150px' }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <p
              style={{ fontFamily: 'Cormorant, serif' }}
              className="text-3xl md:text-5xl lg:text-6xl leading-[1.5] font-light mb-16 text-foreground/80"
            >
              "We believe luxury is felt,
              <br />
              not seen. Quiet confidence
              <br />
              over loud statements."
            </p>
            <div className="flex items-center justify-center gap-4">
              <div className="w-12 h-[1px] bg-foreground/20" />
              <span
                style={{ fontFamily: 'Inter, sans-serif' }}
                className="text-xs tracking-[0.3em] uppercase text-foreground/40"
              >
                Philosophy
              </span>
              <div className="w-12 h-[1px] bg-foreground/20" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Collection Grid - Editorial Style */}
      <section className="py-32 md:py-48 px-6 md:px-12">
        <div className="max-w-[1800px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-150px' }}
            transition={{ duration: 1 }}
            className="mb-20"
          >
            <h2
              style={{ fontFamily: 'Cormorant, serif' }}
              className="text-5xl md:text-7xl tracking-[-0.02em] font-light mb-6"
            >
              The Collection
            </h2>
            <p
              style={{ fontFamily: 'Inter, sans-serif' }}
              className="text-lg md:text-xl text-foreground/60 font-light max-w-3xl"
            >
              Explore our complete range of fragrances, perfumery sets, and home scents.
              Each piece tells a story of Nordic craftsmanship.
            </p>
          </motion.div>

          {/* Editorial Grid */}
          <div className="grid md:grid-cols-12 gap-8">
            {/* Large featured item */}
            <EditorialProductCard
              product={featuredProducts[1]}
              onNavigate={onNavigate}
              className="md:col-span-8"
              large
              imageUrl="https://images.unsplash.com/photo-1758551038941-a67e29026bff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJmdW1lJTIwYm90dGxlJTIwZWxlZ2FudCUyMGdvbGQlMjBtaW5pbWFsfGVufDF8fHx8MTc2OTgzMDQ1Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            />

            {/* Smaller items */}
            <div className="md:col-span-4 space-y-8">
              <EditorialProductCard
                product={featuredProducts[2]}
                onNavigate={onNavigate}
                imageUrl="https://images.unsplash.com/photo-1765031089460-0909ddc3835a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmVtaXVtJTIwZnJhZ3JhbmNlJTIwYm90dGxlJTIwZGFyayUyMGVsZWdhbnR8ZW58MXx8fHwxNzY5ODMwNDUzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              />
              <EditorialProductCard
                product={featuredProducts[3]}
                onNavigate={onNavigate}
                imageUrl="https://images.unsplash.com/photo-1659440508785-c2783e46c384?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWVkJTIwZGlmZnVzZXIlMjBzdGlja3MlMjBsdXh1cnklMjBob21lfGVufDF8fHx8MTc2OTgzMDQ1Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Immersive Category Sections */}
      <section className="mb-32 md:mb-48">
        <CategoryShowcase
          title="Fragrances"
          description="Personal expressions of Nordic elegance"
          onNavigate={() => onNavigate('collection-fragrance')}
          imageUrl="https://c.stocksy.com/a/M8RJ00/z9/4632538.jpg"
        />
        <CategoryShowcase
          title="Home Fragrance"
          description="Transform spaces into sanctuaries"
          onNavigate={() => onNavigate('collection-diffuser')}
          imageUrl="https://c.stocksy.com/a/vCkE00/z9/3514217.jpg"
          reverse
        />
      </section>

      {/* Final CTA */}
      <section className="py-32 md:py-48 px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-150px' }}
          transition={{ duration: 1 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2
            style={{ fontFamily: 'Cormorant, serif' }}
            className="text-5xl md:text-7xl lg:text-8xl mb-12 tracking-[-0.02em] leading-[1.1] font-light"
          >
            Begin your
            <br />
            olfactory journey
          </h2>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onNavigate('collection-perfumery')}
            className="px-12 py-6 bg-foreground text-background transition-all duration-500 hover:bg-foreground/90"
          >
            <span
              style={{ fontFamily: 'Inter, sans-serif' }}
              className="text-sm tracking-[0.2em] uppercase"
            >
              Explore Discovery Sets
            </span>
          </motion.button>
        </motion.div>
      </section>
    </div>
  );
}

interface EditorialProductCardProps {
  product?: Product;
  onNavigate: (page: string, productId?: string) => void;
  className?: string;
  large?: boolean;
  imageUrl: string;
}

function EditorialProductCard({
  product,
  onNavigate,
  className = '',
  large = false,
  imageUrl,
}: EditorialProductCardProps) {
  if (!product) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className={`group cursor-pointer ${className}`}
      onClick={() => onNavigate('product', product.id)}
    >
      <div className={`relative overflow-hidden mb-6 ${large ? 'h-[70vh]' : 'h-[45vh]'}`}>
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="w-full h-full"
        >
          <ImageWithFallback
            src={imageUrl}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 transition-all duration-700" />
      </div>

      <div className="space-y-4">
        <span
          style={{ fontFamily: 'Inter, sans-serif' }}
          className="text-xs tracking-[0.3em] uppercase text-foreground/40"
        >
          {product.category}
        </span>
        <h3
          style={{ fontFamily: 'Cormorant, serif' }}
          className={`${
            large ? 'text-4xl md:text-5xl' : 'text-3xl md:text-4xl'
          } tracking-[-0.02em] leading-[1.1] font-light group-hover:opacity-70 transition-opacity duration-500`}
        >
          {product.name}
        </h3>
        <p
          style={{ fontFamily: 'Inter, sans-serif' }}
          className="text-sm md:text-base text-foreground/60 leading-relaxed font-light"
        >
          {product.shortDescription}
        </p>
      </div>
    </motion.div>
  );
}

interface CategoryShowcaseProps {
  title: string;
  description: string;
  onNavigate: () => void;
  imageUrl: string;
  reverse?: boolean;
}

function CategoryShowcase({
  title,
  description,
  onNavigate,
  imageUrl,
  reverse = false,
}: CategoryShowcaseProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-200px' }}
      transition={{ duration: 1.2 }}
      className={`grid lg:grid-cols-2 gap-0 mb-16 ${reverse ? 'lg:grid-flow-dense' : ''}`}
    >
      <motion.div
        initial={{ opacity: 0, x: reverse ? 50 : -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-150px' }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className={`relative h-[60vh] lg:h-[80vh] overflow-hidden group cursor-pointer ${
          reverse ? 'lg:col-start-2' : ''
        }`}
        onClick={onNavigate}
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="w-full h-full"
        >
          <ImageWithFallback
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-all duration-700" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: reverse ? -50 : 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-150px' }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="bg-background p-12 md:p-20 flex flex-col justify-center"
      >
        <h3
          style={{ fontFamily: 'Cormorant, serif' }}
          className="text-5xl md:text-6xl lg:text-7xl mb-8 tracking-[-0.02em] leading-[1.05] font-light"
        >
          {title}
        </h3>
        <p
          style={{ fontFamily: 'Inter, sans-serif' }}
          className="text-xl md:text-2xl mb-12 leading-[1.6] text-foreground/60 font-light"
        >
          {description}
        </p>

        <motion.button
          whileHover={{ x: 10 }}
          transition={{ duration: 0.3 }}
          onClick={onNavigate}
          className="group inline-flex items-center gap-4 self-start"
        >
          <span
            style={{ fontFamily: 'Inter, sans-serif' }}
            className="text-sm tracking-[0.2em] uppercase border-b border-foreground pb-2"
          >
            View Collection
          </span>
          <ChevronRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-2" />
        </motion.button>
      </motion.div>
    </motion.div>
  );
}