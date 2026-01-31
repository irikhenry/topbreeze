# 📝 Pre-Deployment Checklist for TopBreeze

Use this checklist before deploying to ensure everything is configured correctly.

## ✅ Required Before Deployment

### 1. Content & Configuration

- [ ] **WhatsApp Number**: Updated in `/src/app/components/CheckoutPage.tsx`
  - Current: `1234567890` (placeholder)
  - Update to your actual business WhatsApp number

- [ ] **Currency Rates**: Verify rates are current in `/src/app/utils/currency.ts`
  - USD: 1 (base)
  - EUR: 0.92
  - NGN: 1550
  - XAF: 605
  - GHS: 15.5

- [ ] **Product Data**: Review and update products in `/src/app/data/products.ts`
  - Product names and descriptions
  - Prices (in USD - will auto-convert)
  - Product images
  - Inventory/featured status

### 2. SEO & Meta Tags

- [ ] **Page Title**: Update in `/index.html` (line 19)
  - Current: "TopBreeze - Premium Scandinavian Fragrances"

- [ ] **Meta Description**: Update in `/index.html` (line 7)
  - Current: "TopBreeze - Premium Scandinavian fragrances..."

- [ ] **Open Graph Image**: Add your image at `/public/og-image.jpg`
  - Recommended size: 1200x630px

- [ ] **Favicon**: Replace `/public/favicon.svg` with your brand icon

### 3. Brand Customization

- [ ] **Company Name**: Update "TopBreeze" throughout the site if needed

- [ ] **Brand Colors**: Verify color scheme in `/src/styles/theme.css`

- [ ] **Typography**: Confirm Cormorant + Inter fonts work for your brand

### 4. Legal & Privacy

- [ ] Add Privacy Policy page (optional)
- [ ] Add Terms of Service page (optional)
- [ ] Add Refund/Return Policy (optional)
- [ ] GDPR compliance if serving EU customers

## ✅ Technical Setup

### 5. Repository & Version Control

- [ ] Code is in a Git repository
- [ ] Repository is pushed to GitHub/GitLab/Bitbucket
- [ ] `.gitignore` is configured (already included)
- [ ] No sensitive data in repository

### 6. Dependencies & Build

- [ ] Run `pnpm install` successfully
- [ ] Run `pnpm run build` successfully
- [ ] Test with `pnpm run preview` 
- [ ] No console errors in browser
- [ ] All pages load correctly

### 7. Testing

- [ ] **Homepage**: Loads with hero, collections, and featured products
- [ ] **Collection Pages**: All three categories display correctly
- [ ] **Product Pages**: Individual products show all details
- [ ] **Shopping Cart**: Add/remove items, update quantities
- [ ] **Checkout**: Form validation works
- [ ] **WhatsApp Integration**: Opens WhatsApp with order details
- [ ] **Currency Switcher**: All currencies convert correctly
- [ ] **Mobile Responsive**: Test on mobile devices
- [ ] **Browser Testing**: Chrome, Firefox, Safari, Edge

### 8. Performance

- [ ] Images load efficiently
- [ ] No layout shift on page load
- [ ] Smooth animations (not janky)
- [ ] Fast page transitions

## ✅ Vercel Configuration

### 9. Vercel Setup

- [ ] Vercel account created
- [ ] GitHub/GitLab connected to Vercel
- [ ] Repository imported to Vercel
- [ ] Build settings verified:
  - Framework: Vite
  - Build Command: `pnpm run build`
  - Output Directory: `dist`
  - Install Command: `pnpm install`

### 10. Environment Variables

- [ ] WhatsApp number added to Vercel environment variables (optional)
- [ ] Any API keys added securely
- [ ] Analytics IDs configured (if using)

### 11. Domain & SSL

- [ ] Custom domain configured (optional)
- [ ] DNS records updated (if custom domain)
- [ ] SSL certificate active (automatic with Vercel)

## ✅ Post-Deployment

### 12. Verification

- [ ] Production URL loads correctly
- [ ] All navigation works
- [ ] Currency switcher functions
- [ ] Cart operations work
- [ ] WhatsApp checkout works with real number
- [ ] Mobile view is perfect
- [ ] No 404 errors

### 13. Monitoring & Analytics

- [ ] Vercel Analytics enabled (optional)
- [ ] Google Analytics configured (optional)
- [ ] Error tracking setup (optional)

### 14. Marketing & Launch

- [ ] Social media accounts linked
- [ ] Share production URL
- [ ] Monitor initial traffic
- [ ] Gather user feedback

## 🚨 Common Issues to Check

- [ ] **Images not loading?** 
  - Check that external image URLs are accessible
  - Verify Unsplash/Stocksy URLs are valid

- [ ] **404 on page refresh?**
  - Already fixed in `vercel.json` with rewrites

- [ ] **Currency not converting?**
  - Verify currency state is being passed to all components
  - Check conversion rates in `/src/app/utils/currency.ts`

- [ ] **WhatsApp not opening?**
  - Ensure WhatsApp number is in correct format (no spaces, +, or dashes)
  - Test on mobile device with WhatsApp installed

- [ ] **Build failing?**
  - Check Vercel build logs
  - Test `pnpm run build` locally
  - Ensure all dependencies are in `package.json`

## 📊 Success Metrics to Track

After deployment, monitor:

- [ ] Page load speed (< 3 seconds)
- [ ] Conversion rate (visitors → cart → checkout)
- [ ] Most popular products
- [ ] Most used currency
- [ ] Mobile vs desktop traffic
- [ ] Bounce rate
- [ ] Average session duration

## 🎯 Final Check

- [ ] Everything above is checked
- [ ] You're confident the site represents your brand
- [ ] Customer support is ready for orders
- [ ] Payment processing method is confirmed
- [ ] Shipping/delivery process is set up

## 🚀 Ready to Deploy!

Once all items are checked:

```bash
# Final commit
git add .
git commit -m "Ready for production deployment"
git push

# Deploy via Vercel CLI (or use dashboard)
vercel --prod
```

---

**Congratulations! Your TopBreeze fragrance website is ready to launch! 🎉**

Good luck with your premium fragrance business! 🌸✨
