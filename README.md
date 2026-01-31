# TopBreeze - Premium Scandinavian Fragrances

A high-end fragrance e-commerce website featuring collections of fragrances, perfumery sets, and diffusers. Built with React, TypeScript, Tailwind CSS, and Motion (Framer Motion).

## ✨ Features

- **Multi-Currency Support**: USD, EUR, NGN (Nigeria), XAF (Cameroon), GHS (Ghana)
- **Product Collections**: Fragrances, Perfumery Sets, Home Fragrance
- **Shopping Cart**: Full cart functionality with quantity management
- **WhatsApp Checkout**: Orders are sent via WhatsApp for personalized service
- **Responsive Design**: Mobile-first, fully responsive across all devices
- **Intelligent Header**: Changes color based on scroll position and background
- **Smooth Animations**: Elegant interactions powered by Motion
- **Premium Design**: Warm Scandinavian luxury aesthetic

## 🚀 Deploy to Vercel

### One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/topbreeze)

### Manual Deployment

1. **Install Vercel CLI** (if not already installed):
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy**:
   ```bash
   vercel
   ```

4. **Deploy to Production**:
   ```bash
   vercel --prod
   ```

### GitHub Integration

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "Add New Project"
4. Import your GitHub repository
5. Vercel will automatically detect the configuration
6. Click "Deploy"

## 🛠️ Development

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm

### Local Setup

1. **Install dependencies**:
   ```bash
   pnpm install
   ```

2. **Start development server**:
   ```bash
   pnpm run dev
   ```

3. **Build for production**:
   ```bash
   pnpm run build
   ```

4. **Preview production build**:
   ```bash
   pnpm run preview
   ```

## 📦 Project Structure

```
├── src/
│   ├── app/
│   │   ├── components/        # React components
│   │   │   ├── Navigation.tsx
│   │   │   ├── HomePage.tsx
│   │   │   ├── CollectionPage.tsx
│   │   │   ├── ProductPage.tsx
│   │   │   ├── CartPage.tsx
│   │   │   ├── CheckoutPage.tsx
│   │   │   └── CurrencySwitcher.tsx
│   │   ├── data/
│   │   │   └── products.ts    # Product data
│   │   ├── utils/
│   │   │   └── currency.ts    # Currency utilities
│   │   └── App.tsx            # Main app component
│   ├── styles/
│   │   ├── index.css          # Main styles
│   │   ├── fonts.css          # Font imports
│   │   ├── tailwind.css       # Tailwind base
│   │   └── theme.css          # Theme variables
│   └── main.tsx               # Entry point
├── index.html                 # HTML template
├── vite.config.ts             # Vite configuration
├── vercel.json                # Vercel configuration
└── package.json
```

## ⚙️ Configuration

### WhatsApp Number

Update the WhatsApp number in `/src/app/components/CheckoutPage.tsx`:

```typescript
const whatsappNumber = '1234567890'; // Replace with your number
```

### Currency Rates

Update currency conversion rates in `/src/app/utils/currency.ts`:

```typescript
export const currencies: Record<Currency, CurrencyInfo> = {
  USD: { rate: 1 },
  EUR: { rate: 0.92 },
  NGN: { rate: 1550 },
  XAF: { rate: 605 },
  GHS: { rate: 15.5 },
};
```

### Product Data

Edit products in `/src/app/data/products.ts` to add, remove, or modify items.

## 🎨 Design System

- **Fonts**: 
  - Cormorant (Serif) - Headlines
  - Inter (Sans-serif) - Body text
- **Colors**: Warm neutral palette with sophisticated contrast
- **Motion**: Subtle, intentional animations
- **Layout**: Full-width sections with generous whitespace

## 📱 Responsive Breakpoints

- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📄 License

Private and proprietary. All rights reserved.

## 🙏 Acknowledgments

- Design inspired by Fantasy.co
- Images from Unsplash and Stocksy
- Built with React, Vite, Tailwind CSS, and Motion

---

**Ready to deploy!** 🚀

For support or questions, please contact the development team.
