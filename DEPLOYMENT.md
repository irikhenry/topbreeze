# 🚀 TopBreeze - Vercel Deployment Guide

This guide will walk you through deploying your TopBreeze fragrance website to Vercel.

## 📋 Prerequisites

Before deploying, ensure you have:

- ✅ A GitHub account
- ✅ A Vercel account (free tier works perfectly)
- ✅ Your code pushed to a GitHub repository

## 🎯 Deployment Methods

### Method 1: Deploy via Vercel Dashboard (Recommended for beginners)

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit - TopBreeze website"
   git branch -M main
   git remote add origin https://github.com/yourusername/topbreeze.git
   git push -u origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Click "Import Git Repository"
   - Select your TopBreeze repository

3. **Configure Project**
   - **Framework Preset**: Vite
   - **Build Command**: `pnpm run build` (auto-detected)
   - **Output Directory**: `dist` (auto-detected)
   - **Install Command**: `pnpm install` (auto-detected)

4. **Deploy**
   - Click "Deploy"
   - Wait 2-3 minutes for the build to complete
   - Your site will be live at `https://your-project.vercel.app`

### Method 2: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy to Preview**
   ```bash
   vercel
   ```

4. **Deploy to Production**
   ```bash
   vercel --prod
   ```

### Method 3: Deploy with GitHub Integration (Auto-deployment)

1. **Push to GitHub** (as shown in Method 1)

2. **Connect Repository**
   - Go to Vercel Dashboard
   - Import your GitHub repository
   - Vercel will automatically deploy on every push to `main` branch

3. **Automatic Deployments**
   - Every push to `main` → Production deployment
   - Every pull request → Preview deployment

## ⚙️ Configuration

### Environment Variables (Optional)

If you need to add environment variables:

1. Go to your project in Vercel Dashboard
2. Navigate to "Settings" → "Environment Variables"
3. Add variables like:
   - `VITE_WHATSAPP_NUMBER` - Your WhatsApp business number
   - `VITE_ANALYTICS_ID` - Analytics tracking ID
   - etc.

### Custom Domain

1. Go to "Settings" → "Domains"
2. Add your custom domain (e.g., `topbreeze.com`)
3. Follow Vercel's instructions to configure DNS
4. SSL certificate is automatically provided

## 🔧 Post-Deployment Configuration

### 1. Update WhatsApp Number

Edit `/src/app/components/CheckoutPage.tsx`:
```typescript
const whatsappNumber = 'YOUR_ACTUAL_NUMBER'; // e.g., '1234567890'
```

Then commit and push:
```bash
git add .
git commit -m "Update WhatsApp number"
git push
```

### 2. Update Currency Rates

Edit `/src/app/utils/currency.ts` to update exchange rates regularly.

### 3. Update Product Data

Edit `/src/app/data/products.ts` to manage your product catalog.

## 🎨 Customization After Deployment

### Analytics Setup

Add Google Analytics, Plausible, or other analytics:

1. Add script to `/index.html`
2. Or use Vercel Analytics (Settings → Analytics → Enable)

### SEO Optimization

The site includes basic SEO meta tags in `/index.html`:
- Update title and description
- Add your Open Graph image
- Customize Twitter Card details

## 🐛 Troubleshooting

### Build Fails

**Issue**: "Build failed" error

**Solution**:
```bash
# Test build locally first
pnpm run build

# If successful, check Vercel build logs for specific errors
```

### 404 Errors on Refresh

**Issue**: Page refreshes result in 404

**Solution**: Already configured in `vercel.json` with rewrites:
```json
"rewrites": [
  { "source": "/(.*)", "destination": "/index.html" }
]
```

### Missing Dependencies

**Issue**: "Module not found" errors

**Solution**:
```bash
# Ensure all dependencies are in package.json
pnpm install
git add package.json
git commit -m "Update dependencies"
git push
```

### Images Not Loading

**Issue**: External images fail to load

**Solution**: Check that image URLs are accessible. Images from Unsplash and Stocksy should work fine.

## 📊 Performance Optimization

### Already Implemented

✅ **Asset Caching**: Configured in `vercel.json`
✅ **Code Splitting**: Via Vite
✅ **Lazy Loading**: Images load on demand
✅ **Minification**: Automatic in production build

### Additional Optimizations

1. **Enable Vercel Speed Insights**
   - Go to project settings
   - Enable Speed Insights
   - Monitor Core Web Vitals

2. **Image Optimization**
   - Consider using Vercel Image Optimization
   - Or implement responsive images

3. **Bundle Analysis**
   ```bash
   # Install analyzer
   pnpm add -D rollup-plugin-visualizer
   
   # Add to vite.config.ts and run build
   pnpm run build
   ```

## 🔒 Security

### Best Practices

- ✅ Never commit API keys or secrets
- ✅ Use environment variables for sensitive data
- ✅ Keep dependencies updated
- ✅ Enable Vercel's automatic security headers

### Security Headers

Already configured basic security. For additional headers, add to `vercel.json`:
```json
"headers": [
  {
    "source": "/(.*)",
    "headers": [
      { "key": "X-Frame-Options", "value": "DENY" },
      { "key": "X-Content-Type-Options", "value": "nosniff" }
    ]
  }
]
```

## 📱 Testing Your Deployment

### Pre-flight Checklist

- [ ] All pages load correctly
- [ ] Navigation works on all pages
- [ ] Currency switcher functions properly
- [ ] Cart operations work
- [ ] WhatsApp checkout opens correctly
- [ ] Mobile responsive on all devices
- [ ] Images load properly
- [ ] Animations are smooth

### Test URLs

After deployment, test these paths:
- `/` - Homepage
- `/collection-fragrance` - Fragrances collection (via SPA routing)
- `/collection-perfumery` - Perfumery sets (via SPA routing)
- `/collection-diffuser` - Home fragrance (via SPA routing)
- `/cart` - Shopping cart (via SPA routing)
- `/checkout` - Checkout page (via SPA routing)

Note: This is a SPA (Single Page Application), so all navigation is handled client-side. Direct URL access will always load the app, and React Router handles the routing internally.

## 🎉 You're Live!

Your TopBreeze website is now deployed and accessible worldwide!

### Next Steps

1. Share your live URL: `https://your-project.vercel.app`
2. Add a custom domain
3. Monitor performance with Vercel Analytics
4. Update products and content as needed
5. Market your premium fragrance brand! 🌸

## 📞 Support

- **Vercel Docs**: [vercel.com/docs](https://vercel.com/docs)
- **Vite Docs**: [vitejs.dev](https://vitejs.dev)
- **React Docs**: [react.dev](https://react.dev)

---

**Happy Deploying! 🚀✨**
