import React from "react";
import { useNavigate } from "react-router-dom";

function PageWrapper({ title, subtitle, children }) {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-brand-dark">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-500 dark:text-brand-muted hover:text-brand-cyan transition-colors mb-8 font-body text-sm"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back
        </button>
        <p className="text-brand-cyan text-xs font-mono uppercase tracking-widest mb-2">{subtitle}</p>
        <h1 className="font-display text-5xl text-gray-900 dark:text-white tracking-wider mb-10">{title}</h1>
        <div className="prose prose-invert max-w-none font-body text-gray-500 dark:text-brand-muted space-y-6">
          {children}
        </div>
      </div>
    </div>
  );
}

export function AboutPage() {
  return (
    <PageWrapper title="ABOUT US" subtitle="Who We Are">
      <div className="bg-white dark:bg-brand-card border border-gray-200 dark:border-brand-border rounded-2xl p-8 space-y-4 text-gray-500 dark:text-brand-muted">
        <p className="text-gray-800 dark:text-brand-light text-lg font-body leading-relaxed">
          Franco Gadgets is Nigeria's trusted online marketplace for premium laptops, smartphones, and tech accessories.
        </p>
        <p>We specialize in sourcing original products including UK used laptops and brand-new smartphones, making quality technology accessible to students, professionals, gamers, and tech enthusiasts across Nigeria.</p>
        <p>Our mission is simple: provide genuine products at fair prices, with transparent specs and reliable after-sales support — all through a seamless shopping experience.</p>
        <div className="grid grid-cols-2 gap-4 mt-6">
          {[
            { n: "500+", l: "Products Sold" },
            { n: "98%", l: "Customer Satisfaction" },
            { n: "3+", l: "Years in Business" },
            { n: "36", l: "States We Deliver To" },
          ].map((stat) => (
            <div key={stat.l} className="bg-gray-50 dark:bg-brand-dark rounded-xl p-4 text-center">
              <p className="text-brand-cyan font-display text-4xl">{stat.n}</p>
              <p className="text-gray-500 dark:text-brand-muted text-sm mt-1">{stat.l}</p>
            </div>
          ))}
        </div>
      </div>
    </PageWrapper>
  );
}

export function FAQsPage() {
  const faqs = [
    { q: "Are your products original?", a: "Yes, 100%. We only sell authentic, original products. UK Used laptops are professionally graded and tested before listing." },
    { q: "What does 'UK Used' mean?", a: "UK Used means the laptop was previously used in the United Kingdom and imported to Nigeria. They are thoroughly tested, clean, and in excellent working condition with original specs." },
    { q: "How do I order?", a: "Add products to your cart, go to checkout, and click the WhatsApp button. Our team will receive your order and confirm payment and delivery details." },
    { q: "What payment methods do you accept?", a: "We accept bank transfers and mobile payments coordinated through WhatsApp. Our team will provide account details when you place your order." },
    { q: "Do you deliver nationwide?", a: "Yes, we deliver to all 36 states and FCT Abuja. Delivery times vary by location (1-3 days in Lagos, 3-7 days elsewhere)." },
    { q: "Can I return a product?", a: "We accept returns within 48 hours if the product is defective or misrepresented. Please contact us via WhatsApp immediately with your order details and photos." },
  ];
  return (
    <PageWrapper title="FAQS" subtitle="Common Questions">
      <div className="space-y-3">
        {faqs.map((faq) => (
          <div key={faq.q} className="bg-white dark:bg-brand-card border border-gray-200 dark:border-brand-border rounded-xl p-5">
            <p className="text-gray-900 dark:text-white font-semibold font-body mb-2">{faq.q}</p>
            <p className="text-gray-500 dark:text-brand-muted text-sm leading-relaxed">{faq.a}</p>
          </div>
        ))}
      </div>
    </PageWrapper>
  );
}

export function WarrantyPage() {
  return (
    <PageWrapper title="WARRANTY" subtitle="Our Promise">
      <div className="space-y-4">
        {[
          { title: "Laptops (UK Used)", period: "3 Months", details: "Covers hardware defects and component failures. Does not cover physical damage, water damage, or software issues caused by the user." },
          { title: "New Smartphones", period: "1 Year", details: "Full manufacturer warranty. We coordinate warranty claims on your behalf where applicable." },
          { title: "Accessories", period: "3-12 Months", details: "Warranty varies by brand. Details are specified on each product listing." },
        ].map((w) => (
          <div key={w.title} className="bg-white dark:bg-brand-card border border-gray-200 dark:border-brand-border rounded-xl p-5">
            <div className="flex justify-between items-start mb-2">
              <p className="text-gray-900 dark:text-white font-semibold font-body">{w.title}</p>
              <span className="bg-brand-cyan/10 text-brand-cyan text-xs font-mono px-2 py-1 rounded-full">{w.period}</span>
            </div>
            <p className="text-gray-500 dark:text-brand-muted text-sm">{w.details}</p>
          </div>
        ))}
        <div className="bg-white dark:bg-brand-card border border-gray-200 dark:border-brand-border rounded-xl p-5 mt-4">
          <p className="text-gray-900 dark:text-white font-semibold mb-2">How to Claim Warranty</p>
          <p className="text-gray-500 dark:text-brand-muted text-sm">Contact us on WhatsApp with your order number and a description of the issue. We'll guide you through the process. Always keep your purchase invoice.</p>
        </div>
      </div>
    </PageWrapper>
  );
}

export function DeliveryPage() {
  return (
    <PageWrapper title="DELIVERY" subtitle="Shipping Info">
      <div className="space-y-4">
        <div className="bg-white dark:bg-brand-card border border-gray-200 dark:border-brand-border rounded-xl p-5">
          <p className="text-gray-900 dark:text-white font-semibold font-body mb-3">Delivery Zones & Timelines</p>
          <div className="space-y-2">
            {[
              { zone: "Lagos", time: "Same Day – Next Day", fee: "₦1,500 – ₦3,000" },
              { zone: "Abuja, Port Harcourt", time: "2-3 Business Days", fee: "₦3,000 – ₦4,500" },
              { zone: "Other States", time: "3-7 Business Days", fee: "₦3,500 – ₦6,000" },
            ].map((row) => (
              <div key={row.zone} className="flex items-center justify-between text-sm py-2 border-b border-gray-200 dark:border-brand-border last:border-0">
                <div>
                  <p className="text-gray-800 dark:text-brand-light">{row.zone}</p>
                  <p className="text-gray-500 dark:text-brand-muted text-xs">{row.time}</p>
                </div>
                <span className="text-brand-cyan font-mono text-xs">{row.fee}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white dark:bg-brand-card border border-gray-200 dark:border-brand-border rounded-xl p-5">
          <p className="text-gray-900 dark:text-white font-semibold mb-2">Important Notes</p>
          <ul className="text-gray-500 dark:text-brand-muted text-sm space-y-1.5">
            <li>• All items are packaged securely to prevent damage during transit.</li>
            <li>• You'll receive tracking information via WhatsApp once your order ships.</li>
            <li>• Delivery to remote areas may take longer. Contact us to confirm.</li>
            <li>• Inspect your package before signing for it.</li>
          </ul>
        </div>
      </div>
    </PageWrapper>
  );
}

export function ContactPage() {
  return (
    <PageWrapper title="CONTACT US" subtitle="Get In Touch">
      <div className="space-y-4">
        {[
          { icon: "💬", title: "WhatsApp (Primary)", info: "+234 801 234 5678", sub: "Click to chat — fastest response", link: "https://wa.me/2348012345678" },
          { icon: "📧", title: "Email", info: "hello@francogadgets.com", sub: "We reply within 24 hours" },
          { icon: "📍", title: "Location", info: "Lagos, Nigeria", sub: "Walk-in by appointment only" },
        ].map((c) => (
          <div key={c.title} className="bg-white dark:bg-brand-card border border-gray-200 dark:border-brand-border rounded-xl p-5 flex items-start gap-4">
            <span className="text-3xl">{c.icon}</span>
            <div>
              <p className="text-gray-500 dark:text-brand-muted text-xs font-mono mb-1">{c.title}</p>
              {c.link ? (
                <a href={c.link} target="_blank" rel="noopener noreferrer" className="text-brand-cyan font-body font-semibold hover:underline">
                  {c.info}
                </a>
              ) : (
                <p className="text-gray-800 dark:text-brand-light font-body font-semibold">{c.info}</p>
              )}
              <p className="text-gray-500 dark:text-brand-muted text-xs mt-0.5">{c.sub}</p>
            </div>
          </div>
        ))}
        <div className="bg-white dark:bg-brand-card border border-brand-cyan/20 rounded-xl p-5 text-center">
          <p className="text-gray-900 dark:text-white font-body mb-3">Ready to order? Chat with us directly!</p>
          <a
            href="https://wa.me/2348012345678"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-gray-900 dark:text-white px-6 py-3 rounded-xl font-display text-lg tracking-wider transition-all"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            OPEN WHATSAPP
          </a>
        </div>
      </div>
    </PageWrapper>
  );
}
