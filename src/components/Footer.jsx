import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-brand-card border-t border-brand-border mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-brand-cyan rounded-lg flex items-center justify-center">
                <span className="text-brand-dark font-display text-lg">F</span>
              </div>
              <span className="font-display text-xl text-white tracking-wider">FRANCO <span className="text-brand-cyan">GADGETS</span></span>
            </div>
            <p className="text-brand-muted text-sm font-body leading-relaxed">Nigeria's trusted source for premium laptops, smartphones, and tech accessories. Original products. Real deals.</p>
          </div>
          <div>
            <h4 className="text-white font-display text-lg tracking-wider mb-4">QUICK LINKS</h4>
            <ul className="space-y-2">
              {[{ label: "Home", to: "/" }, { label: "Explore Products", to: "/explore" }, { label: "About Us", to: "/about" }, { label: "Contact Us", to: "/contact" }].map((link) => (
                <li key={link.to}><Link to={link.to} className="text-brand-muted text-sm hover:text-brand-cyan transition-colors font-body">{link.label}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-white font-display text-lg tracking-wider mb-4">POLICIES</h4>
            <ul className="space-y-2">
              {[{ label: "Warranty Policy", to: "/warranty" }, { label: "Delivery Information", to: "/delivery" }, { label: "FAQs", to: "/faqs" }].map((link) => (
                <li key={link.to}><Link to={link.to} className="text-brand-muted text-sm hover:text-brand-cyan transition-colors font-body">{link.label}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-white font-display text-lg tracking-wider mb-4">WHY FRANCO?</h4>
            <ul className="space-y-3">
              {[{ icon: "✅", text: "Original Products Only" }, { icon: "🛡️", text: "Warranty on All Items" }, { icon: "🚚", text: "Nationwide Delivery" }, { icon: "💬", text: "WhatsApp Support 24/7" }].map((badge) => (
                <li key={badge.text} className="flex items-center gap-2 text-sm text-brand-muted font-body"><span>{badge.icon}</span><span>{badge.text}</span></li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t border-brand-border mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-brand-muted text-xs font-mono">© {new Date().getFullYear()} Franco Gadgets. All rights reserved.</p>
          <p className="text-brand-muted text-xs font-mono">Built with ❤️ for Nigeria's tech community</p>
        </div>
      </div>
    </footer>
  );
}
