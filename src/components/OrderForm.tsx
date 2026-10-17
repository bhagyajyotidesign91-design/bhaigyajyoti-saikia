import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { ProductCategory, DesignStyle, TargetAudience, AdPlatform, UploadedPhoto, OrderSubmission } from '../types';
import {
  Upload,
  X,
  FileImage,
  AlertCircle,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowRight,
  Send,
  Info,
  Layers,
} from 'lucide-react';

export const OrderForm: React.FC = () => {
  const { settings, submitOrder, orderPrefill, setOrderPrefill } = useApp();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 11 Fields State
  const [customerName, setCustomerName] = useState('');
  const [category, setCategory] = useState<ProductCategory>('Fashion');
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [offerDiscount, setOfferDiscount] = useState('');
  const [designStyle, setDesignStyle] = useState<DesignStyle>('Modern & Creative');
  const [targetAudience, setTargetAudience] = useState<TargetAudience>('Everyone');
  const [adPlatform, setAdPlatform] = useState<AdPlatform>('Instagram');
  const [photos, setPhotos] = useState<UploadedPhoto[]>([]);
  const [additionalRequirements, setAdditionalRequirements] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('');

  // Validation & Handoff State
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [pendingOrder, setPendingOrder] = useState<OrderSubmission | null>(null);

  // Apply prefill from Portfolio "Order a Similar Design" CTA
  useEffect(() => {
    if (orderPrefill) {
      if (orderPrefill.category) setCategory(orderPrefill.category);
      if (orderPrefill.designStyle) setDesignStyle(orderPrefill.designStyle);
      if (orderPrefill.productName) setProductName(orderPrefill.productName);
      setOrderPrefill(null);
    }
  }, [orderPrefill, setOrderPrefill]);

  const categories: ProductCategory[] = [
    'Fashion',
    'Food',
    'Beauty',
    'Electronics',
    'Other Products',
  ];

  const designStyles: DesignStyle[] = [
    'Premium & Luxury',
    'Modern & Creative',
    'Minimal & Clean',
    'Bold Sale/Offer',
  ];

  const targetAudiences: TargetAudience[] = [
    'Everyone',
    'Men',
    'Women',
    'Young Adults',
    'Business Customers',
  ];

  const platforms: AdPlatform[] = ['Instagram', 'Facebook', 'Both'];

  // Handle Photo Upload Validation (Max 3, Max 5MB, JPG/PNG/WebP)
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMessage(null);
    const files = e.target.files;
    if (!files || files.length === 0) return;

    if (photos.length + files.length > 3) {
      setErrorMessage('You can upload a maximum of 3 product photos per order.');
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }

    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    const maxSizeBytes = 5 * 1024 * 1024; // 5 MB

    Array.from(files).forEach((file) => {
      if (!allowedTypes.includes(file.type.toLowerCase())) {
        setErrorMessage(`Invalid format for ${file.name}. Only JPG, JPEG, PNG, and WebP are supported.`);
        return;
      }
      if (file.size > maxSizeBytes) {
        setErrorMessage(`File ${file.name} exceeds 5 MB limit (${(file.size / (1024 * 1024)).toFixed(1)} MB).`);
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        const dataUrl = reader.result as string;
        setPhotos((prev) => [
          ...prev,
          {
            id: `photo-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
            name: file.name,
            size: file.size,
            dataUrl,
            type: file.type,
          },
        ]);
      };
      reader.readAsDataURL(file);
    });

    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleRemovePhoto = (id: string) => {
    setPhotos((prev) => prev.filter((p) => p.id !== id));
    setErrorMessage(null);
  };

  const validateAndProceed = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!customerName.trim()) {
      setErrorMessage('Please enter your name or business name.');
      return;
    }
    if (!productName.trim()) {
      setErrorMessage('Please provide the name of the product you want an ad for.');
      return;
    }
    if (!whatsappNumber.trim()) {
      setErrorMessage('Please enter your WhatsApp phone number.');
      return;
    }

    // Save order in local storage queue
    const orderData = {
      customerName: customerName.trim(),
      whatsappNumber: whatsappNumber.trim(),
      category,
      productName: productName.trim(),
      productPrice: productPrice.trim() || 'Not specified',
      offerDiscount: offerDiscount.trim() || 'None',
      designStyle,
      targetAudience,
      adPlatform,
      additionalRequirements: additionalRequirements.trim() || 'Standard professional execution',
      photos,
      totalPrice: settings.adPrice,
    };

    const created = submitOrder(orderData);
    setPendingOrder(created);
    setShowReviewModal(true);
  };

  const handleSendOnWhatsApp = () => {
    if (!pendingOrder) return;

    const cleanDestNumber = settings.whatsappNumber.replace(/[^0-9]/g, '');

    const messageText = `*NEW AD DESIGN ORDER (#${pendingOrder.id})*
---------------------------------------
👤 *Client / Brand:* ${pendingOrder.customerName}
📱 *Client WhatsApp:* ${pendingOrder.whatsappNumber}
📦 *Product Name:* ${pendingOrder.productName}
🏷️ *Category:* ${pendingOrder.category}
💰 *Product Price:* ${pendingOrder.productPrice}
🎁 *Offer / Discount:* ${pendingOrder.offerDiscount}
🎨 *Preferred Style:* ${pendingOrder.designStyle}
🎯 *Target Audience:* ${pendingOrder.targetAudience}
📱 *Ad Platform:* ${pendingOrder.adPlatform}
📝 *Requirements:* ${pendingOrder.additionalRequirements}
📸 *Photos Uploaded in Form:* ${pendingOrder.photos.length} photo(s)
---------------------------------------
💵 *Design Price:* ₹${pendingOrder.totalPrice}
⏱️ *Delivery Timeframe:* Within ${settings.deliveryTimeHours} Hours
---------------------------------------
*(I will attach the high-resolution product photos directly in this chat)*`;

    const encodedUri = `https://wa.me/${cleanDestNumber}?text=${encodeURIComponent(messageText)}`;
    window.open(encodedUri, '_blank');
  };

  return (
    <section id="order" className="py-20 md:py-28 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold tracking-widest text-[#8B5CF6] uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Creative Brief</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Order Your Advertisement
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            Fill the 11 design details below to specify your product, offer, style, and platform. Guaranteed ₹{settings.adPrice} rate with {settings.deliveryTimeHours}-hour turnaround.
          </p>
        </div>

        {/* The 11-Field Order Form Card */}
        <div className="bg-[#16131F] border border-[#272233] rounded-3xl p-6 sm:p-10 shadow-2xl relative">
          {errorMessage && (
            <div className="mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={validateAndProceed} className="space-y-6">
            {/* Field 1 & 11: Customer/Business Name & WhatsApp Number */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">
                  1. Customer / Business Name <span className="text-[#8B5CF6]">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="e.g. Apex Apparel / SneakerLab"
                  className="w-full px-4 py-3 bg-[#0D0B12] border border-[#272233] rounded-xl text-sm text-white placeholder-slate-600 focus:outline-none focus:border-[#8B5CF6] focus:ring-1 focus:ring-[#8B5CF6]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">
                  11. Your WhatsApp Number <span className="text-[#8B5CF6]">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={whatsappNumber}
                  onChange={(e) => setWhatsappNumber(e.target.value)}
                  placeholder="e.g. +91 98765 43210"
                  className="w-full px-4 py-3 bg-[#0D0B12] border border-[#272233] rounded-xl text-sm text-white placeholder-slate-600 focus:outline-none focus:border-[#8B5CF6] focus:ring-1 focus:ring-[#8B5CF6]"
                />
              </div>
            </div>

            {/* Field 2 & 3: Product Category & Product Name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">
                  2. Product Category <span className="text-[#8B5CF6]">*</span>
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as ProductCategory)}
                  className="w-full px-4 py-3 bg-[#0D0B12] border border-[#272233] rounded-xl text-sm text-white focus:outline-none focus:border-[#8B5CF6] focus:ring-1 focus:ring-[#8B5CF6]"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat === 'Fashion' ? 'Shoes & Fashion' : cat === 'Food' ? 'Food & Restaurant' : cat === 'Beauty' ? 'Beauty & Cosmetics' : cat}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">
                  3. Product Name <span className="text-[#8B5CF6]">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  placeholder="e.g. Air Cushion Runner 3 / Truffle Wagyu Burger"
                  className="w-full px-4 py-3 bg-[#0D0B12] border border-[#272233] rounded-xl text-sm text-white placeholder-slate-600 focus:outline-none focus:border-[#8B5CF6] focus:ring-1 focus:ring-[#8B5CF6]"
                />
              </div>
            </div>

            {/* Field 4 & 5: Product Price & Offer/Discount */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">
                  4. Product Selling Price
                </label>
                <input
                  type="text"
                  value={productPrice}
                  onChange={(e) => setProductPrice(e.target.value)}
                  placeholder="e.g. ₹2,499 or $49"
                  className="w-full px-4 py-3 bg-[#0D0B12] border border-[#272233] rounded-xl text-sm text-white placeholder-slate-600 focus:outline-none focus:border-[#8B5CF6] focus:ring-1 focus:ring-[#8B5CF6]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">
                  5. Offer or Discount Text
                </label>
                <input
                  type="text"
                  value={offerDiscount}
                  onChange={(e) => setOfferDiscount(e.target.value)}
                  placeholder="e.g. Flat 30% Off / Buy 1 Get 1 Free"
                  className="w-full px-4 py-3 bg-[#0D0B12] border border-[#272233] rounded-xl text-sm text-white placeholder-slate-600 focus:outline-none focus:border-[#8B5CF6] focus:ring-1 focus:ring-[#8B5CF6]"
                />
              </div>
            </div>

            {/* Field 6 & 7: Preferred Design Style & Target Audience */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">
                  6. Preferred Design Style <span className="text-[#8B5CF6]">*</span>
                </label>
                <select
                  value={designStyle}
                  onChange={(e) => setDesignStyle(e.target.value as DesignStyle)}
                  className="w-full px-4 py-3 bg-[#0D0B12] border border-[#272233] rounded-xl text-sm text-white focus:outline-none focus:border-[#8B5CF6] focus:ring-1 focus:ring-[#8B5CF6]"
                >
                  {designStyles.map((style) => (
                    <option key={style} value={style}>
                      {style}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">
                  7. Target Audience <span className="text-[#8B5CF6]">*</span>
                </label>
                <select
                  value={targetAudience}
                  onChange={(e) => setTargetAudience(e.target.value as TargetAudience)}
                  className="w-full px-4 py-3 bg-[#0D0B12] border border-[#272233] rounded-xl text-sm text-white focus:outline-none focus:border-[#8B5CF6] focus:ring-1 focus:ring-[#8B5CF6]"
                >
                  {targetAudiences.map((aud) => (
                    <option key={aud} value={aud}>
                      {aud}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Field 8: Advertising Platform */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300">
                8. Advertising Platform <span className="text-[#8B5CF6]">*</span>
              </label>
              <div className="grid grid-cols-3 gap-3">
                {platforms.map((plat) => (
                  <button
                    key={plat}
                    type="button"
                    onClick={() => setAdPlatform(plat)}
                    className={`py-3 px-4 text-xs font-bold rounded-xl border transition-all text-center ${
                      adPlatform === plat
                        ? 'bg-[#8B5CF6]/20 border-[#8B5CF6] text-white shadow-sm'
                        : 'bg-[#0D0B12] border-[#272233] text-slate-400 hover:text-white hover:border-white/20'
                    }`}
                  >
                    {plat === 'Both' ? 'Instagram & Facebook' : plat}
                  </button>
                ))}
              </div>
            </div>

            {/* Field 9: Product Photo Upload (Max 3, Max 5MB, JPG/PNG/WebP) */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-300">
                  9. Product Photos ({photos.length}/3)
                </label>
                <span className="text-[11px] text-slate-500">
                  Max 3 photos · Up to 5 MB each · JPG, PNG, WebP
                </span>
              </div>

              {/* Upload Drop Area */}
              {photos.length < 3 && (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-[#272233] hover:border-[#8B5CF6] rounded-2xl p-6 text-center cursor-pointer bg-[#0D0B12] hover:bg-[#120F1D] transition-colors group"
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept=".jpg,.jpeg,.png,.webp"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <Upload className="w-8 h-8 text-slate-500 group-hover:text-[#8B5CF6] mx-auto mb-2 transition-colors" />
                  <p className="text-xs font-semibold text-slate-300">
                    Click to browse or drag & drop product photos
                  </p>
                  <p className="text-[10px] text-slate-500 mt-1">
                    Keep high-resolution photos for optimal sharpness in the design
                  </p>
                </div>
              )}

              {/* Photo Previews with Remove & Size Details */}
              {photos.length > 0 && (
                <div className="grid grid-cols-3 gap-3 pt-2">
                  {photos.map((photo) => (
                    <div
                      key={photo.id}
                      className="relative rounded-xl overflow-hidden border border-[#272233] bg-[#0D0B12] group aspect-square flex items-center justify-center"
                    >
                      <img
                        src={photo.dataUrl}
                        alt={photo.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-2 text-center">
                        <span className="text-[10px] text-white font-medium truncate max-w-full">
                          {photo.name}
                        </span>
                        <span className="text-[9px] text-slate-400">
                          {(photo.size / (1024 * 1024)).toFixed(2)} MB
                        </span>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemovePhoto(photo.id);
                          }}
                          className="mt-2 p-1.5 rounded-full bg-rose-500/80 hover:bg-rose-600 text-white transition-colors"
                          aria-label="Remove photo"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Field 10: Additional Requirements */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">
                10. Additional Requirements / Brand Notes
              </label>
              <textarea
                rows={3}
                value={additionalRequirements}
                onChange={(e) => setAdditionalRequirements(e.target.value)}
                placeholder="Mention any specific colors, brand slogans, key features to emphasize, or competitor style references..."
                className="w-full px-4 py-3 bg-[#0D0B12] border border-[#272233] rounded-xl text-sm text-white placeholder-slate-600 focus:outline-none focus:border-[#8B5CF6] focus:ring-1 focus:ring-[#8B5CF6] resize-none"
              />
            </div>

            {/* Price Summary Strip */}
            <div className="p-4 rounded-xl bg-[#0D0B12] border border-[#272233] flex items-center justify-between">
              <div>
                <div className="text-xs text-slate-400">Total Price</div>
                <div className="text-xl font-bold text-white">₹{settings.adPrice}</div>
              </div>
              <div className="text-right">
                <div className="text-xs text-slate-400">Turnaround Guarantee</div>
                <div className="text-xs font-semibold text-[#A78BFA] flex items-center gap-1 justify-end">
                  <Clock className="w-3.5 h-3.5" /> Within {settings.deliveryTimeHours} Hours
                </div>
              </div>
            </div>

            {/* Submit Button to Review Step */}
            <button
              type="submit"
              className="w-full py-4 px-6 text-sm font-bold uppercase tracking-wider text-white bg-[#8B5CF6] hover:bg-[#7C3AED] rounded-xl shadow-xl shadow-[#8B5CF6]/30 transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2"
            >
              Review Order Summary
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>

      {/* Order Review & WhatsApp Handoff Modal */}
      {showReviewModal && pendingOrder && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200"
        >
          <div className="relative w-full max-w-lg bg-[#16131F] border border-[#272233] rounded-2xl shadow-2xl p-6 sm:p-8 space-y-6 my-auto">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[#272233] pb-4">
              <div>
                <span className="text-xs font-mono text-[#8B5CF6] uppercase tracking-wider">
                  Order #{pendingOrder.id}
                </span>
                <h3 className="text-xl font-bold text-white">Review Order Summary</h3>
              </div>
              <button
                onClick={() => setShowReviewModal(false)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Order Summary Details */}
            <div className="space-y-3 text-xs bg-[#0D0B12] p-4 rounded-xl border border-[#272233]">
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-slate-400">Client / Brand:</span>
                <span className="font-semibold text-white">{pendingOrder.customerName}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-slate-400">Product Name:</span>
                <span className="font-semibold text-white">{pendingOrder.productName}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-slate-400">Category:</span>
                <span className="font-semibold text-white">{pendingOrder.category}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-slate-400">Design Style:</span>
                <span className="font-semibold text-[#A78BFA]">{pendingOrder.designStyle}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-slate-400">Target Audience:</span>
                <span className="font-semibold text-white">{pendingOrder.targetAudience}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-slate-400">Ad Platform:</span>
                <span className="font-semibold text-white">{pendingOrder.adPlatform}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-slate-400">Photos Uploaded:</span>
                <span className="font-semibold text-white">{pendingOrder.photos.length} item(s)</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-slate-400">Turnaround:</span>
                <span className="font-semibold text-white">Within {settings.deliveryTimeHours} Hours</span>
              </div>
              <div className="flex justify-between pt-2 text-sm font-bold">
                <span className="text-slate-200">Total Price:</span>
                <span className="text-emerald-400">₹{pendingOrder.totalPrice}</span>
              </div>
            </div>

            {/* Photo Attachment Guidance Notice (Crucial requirement from spec) */}
            <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-200/90 space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-amber-300">
                <Info className="w-4 h-4 shrink-0" />
                <span>Photo Sharing on WhatsApp</span>
              </div>
              <p className="leading-relaxed">
                WhatsApp web links cannot automatically transfer image files. When WhatsApp opens, please attach your {pendingOrder.photos.length > 0 ? `${pendingOrder.photos.length} selected product photo(s)` : 'product photos'} directly in the WhatsApp chat.
              </p>
            </div>

            {/* Send on WhatsApp CTA Button */}
            <div className="space-y-3 pt-2">
              <button
                onClick={handleSendOnWhatsApp}
                className="w-full py-4 px-6 text-sm font-bold uppercase tracking-wider text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl shadow-lg shadow-emerald-600/30 transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                Send Order on WhatsApp
              </button>
              <p className="text-[11px] text-center text-slate-500">
                You will review the prefilled message in WhatsApp before tapping Send.
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
