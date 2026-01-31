import { motion } from 'motion/react';
import { useState } from 'react';
import { CartItem } from './CartPage';
import { ChevronLeft, MessageCircle, Check } from 'lucide-react';
import { Currency, formatPrice } from '@/app/utils/currency';

interface CheckoutPageProps {
  cartItems: CartItem[];
  onNavigate: (page: string) => void;
  selectedCurrency: Currency;
}

export function CheckoutPage({ cartItems, onNavigate, selectedCurrency }: CheckoutPageProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
    notes: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const shipping = subtotal > 200 ? 0 : 15;
  const total = subtotal + shipping;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Prepare order details for WhatsApp
    const orderDetails = cartItems
      .map(
        (item) =>
          `• ${item.product.name} x${item.quantity} - ${formatPrice(
            item.product.price * item.quantity,
            selectedCurrency
          )}`
      )
      .join('\n');

    const message = `
*New Order from TopBreeze Website*

*Customer Details:*
Name: ${formData.fullName}
Email: ${formData.email}
Phone: ${formData.phone}

*Shipping Address:*
${formData.address}
${formData.city}, ${formData.postalCode}
${formData.country}

*Order Items:*
${orderDetails}

*Order Summary:*
Subtotal: ${formatPrice(subtotal, selectedCurrency)}
Shipping: ${shipping === 0 ? 'Free' : formatPrice(shipping, selectedCurrency)}
Total: ${formatPrice(total, selectedCurrency)}

${formData.notes ? `*Additional Notes:*\n${formData.notes}` : ''}
    `.trim();

    // Encode message for WhatsApp URL
    const encodedMessage = encodeURIComponent(message);
    const whatsappNumber = '2348035771482';
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    // Open WhatsApp
    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
      setIsSubmitting(false);
    }, 1000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen pt-32 pb-24">
      {/* Header */}
      <div className="px-6 md:px-12 mb-12">
        <div>
          <motion.button
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            onClick={() => onNavigate('cart')}
            className="group inline-flex items-center gap-2 text-sm hover:opacity-60 transition-opacity"
          >
            <ChevronLeft className="w-4 h-4" />
            <span style={{ fontFamily: 'Inter, sans-serif' }} className="tracking-wide uppercase">
              Back to Cart
            </span>
          </motion.button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-12"
          >
            <h1
              style={{ fontFamily: 'Cormorant, serif' }}
              className="text-5xl md:text-7xl tracking-tight mb-6"
            >
              Checkout
            </h1>
            <p
              style={{ fontFamily: 'Inter, sans-serif' }}
              className="text-base text-foreground/60 leading-relaxed"
            >
              Complete your order via WhatsApp. Your information will be sent securely.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Checkout Form */}
      <div className="px-6 md:px-12">
        <div>
          <div className="grid lg:grid-cols-3 gap-16">
            {/* Form */}
            <motion.form
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              onSubmit={handleSubmit}
              className="lg:col-span-2 space-y-10"
            >
              {/* Contact Information */}
              <div>
                <h2
                  style={{ fontFamily: 'Cormorant, serif' }}
                  className="text-2xl tracking-tight mb-6"
                >
                  Contact Information
                </h2>
                <div className="space-y-6">
                  <InputField
                    label="Full Name"
                    name="fullName"
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                  />
                  <div className="grid sm:grid-cols-2 gap-6">
                    <InputField
                      label="Email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                    />
                    <InputField
                      label="Phone Number"
                      name="phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div>
                <h2
                  style={{ fontFamily: 'Cormorant, serif' }}
                  className="text-2xl tracking-tight mb-6"
                >
                  Shipping Address
                </h2>
                <div className="space-y-6">
                  <InputField
                    label="Address"
                    name="address"
                    type="text"
                    required
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Street address, apartment, suite, etc."
                  />
                  <div className="grid sm:grid-cols-2 gap-6">
                    <InputField
                      label="City"
                      name="city"
                      type="text"
                      required
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="City"
                    />
                    <InputField
                      label="Postal Code"
                      name="postalCode"
                      type="text"
                      required
                      value={formData.postalCode}
                      onChange={handleChange}
                      placeholder="Postal code"
                    />
                  </div>
                  <InputField
                    label="Country"
                    name="country"
                    type="text"
                    required
                    value={formData.country}
                    onChange={handleChange}
                    placeholder="Country"
                  />
                </div>
              </div>

              {/* Additional Notes */}
              <div>
                <h2
                  style={{ fontFamily: 'Cormorant, serif' }}
                  className="text-2xl tracking-tight mb-6"
                >
                  Additional Notes
                </h2>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="Any special instructions or requests? (optional)"
                  rows={4}
                  style={{ fontFamily: 'Inter, sans-serif' }}
                  className="w-full px-5 py-4 bg-transparent border border-foreground/20 focus:border-foreground/40 outline-none transition-colors text-sm resize-none"
                />
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                className="w-full px-10 py-5 bg-foreground text-background transition-all duration-300 hover:bg-foreground/90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-background/30 border-t-background rounded-full animate-spin" />
                    <span
                      style={{ fontFamily: 'Inter, sans-serif' }}
                      className="text-sm tracking-widest uppercase"
                    >
                      Opening WhatsApp...
                    </span>
                  </>
                ) : (
                  <>
                    <MessageCircle className="w-5 h-5" />
                    <span
                      style={{ fontFamily: 'Inter, sans-serif' }}
                      className="text-sm tracking-widest uppercase"
                    >
                      Complete Order via WhatsApp
                    </span>
                  </>
                )}
              </motion.button>
            </motion.form>

            {/* Order Summary */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="lg:sticky lg:top-32 lg:self-start"
            >
              <div className="border border-foreground/10 p-8">
                <h2
                  style={{ fontFamily: 'Cormorant, serif' }}
                  className="text-2xl tracking-tight mb-6"
                >
                  Order Summary
                </h2>

                <div className="space-y-4 mb-6 pb-6 border-b border-foreground/10">
                  {cartItems.map((item) => (
                    <div
                      key={item.product.id}
                      style={{ fontFamily: 'Inter, sans-serif' }}
                      className="flex justify-between text-sm"
                    >
                      <span className="text-foreground/70">
                        {item.product.name} ×{item.quantity}
                      </span>
                      <span>{formatPrice(item.product.price * item.quantity, selectedCurrency)}</span>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 pb-6 border-b border-foreground/10">
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
                </div>

                <div
                  style={{ fontFamily: 'Inter, sans-serif' }}
                  className="flex justify-between text-lg pt-6"
                >
                  <span>Total</span>
                  <span style={{ fontFamily: 'Cormorant, serif' }} className="text-2xl">
                    {formatPrice(total, selectedCurrency)}
                  </span>
                </div>

                <div className="mt-8 pt-8 border-t border-foreground/10 space-y-4">
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-foreground/40 flex-shrink-0 mt-0.5" />
                    <p
                      style={{ fontFamily: 'Inter, sans-serif' }}
                      className="text-xs text-foreground/60 leading-relaxed"
                    >
                      Secure checkout via WhatsApp
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-foreground/40 flex-shrink-0 mt-0.5" />
                    <p
                      style={{ fontFamily: 'Inter, sans-serif' }}
                      className="text-xs text-foreground/60 leading-relaxed"
                    >
                      Personalized customer service
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-foreground/40 flex-shrink-0 mt-0.5" />
                    <p
                      style={{ fontFamily: 'Inter, sans-serif' }}
                      className="text-xs text-foreground/60 leading-relaxed"
                    >
                      Free shipping on orders over {formatPrice(200, selectedCurrency)}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface InputFieldProps {
  label: string;
  name: string;
  type: string;
  required?: boolean;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

function InputField({
  label,
  name,
  type,
  required,
  value,
  onChange,
  placeholder,
}: InputFieldProps) {
  return (
    <div className="space-y-2">
      <label
        htmlFor={name}
        style={{ fontFamily: 'Inter, sans-serif' }}
        className="text-sm text-foreground/70"
      >
        {label} {required && <span className="text-destructive">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        style={{ fontFamily: 'Inter, sans-serif' }}
        className="w-full px-5 py-4 bg-transparent border border-foreground/20 focus:border-foreground/40 outline-none transition-colors text-sm"
      />
    </div>
  );
}
