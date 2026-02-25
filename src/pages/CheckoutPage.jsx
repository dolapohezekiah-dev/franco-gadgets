import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { formatPrice, openWhatsApp } from "../utils/helpers";
import { DELIVERY_FEE, STORE_NAME } from "../data/products";

export default function CheckoutPage() {
  const { cartItems, subtotal, removeFromCart } = useCart();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const total = subtotal + DELIVERY_FEE;

  const handleWhatsAppOrder = () => {
    if (cartItems.length === 0) return;
    openWhatsApp(cartItems, subtotal, name);
  };

  const handleDownloadInvoice = async () => {
    const { jsPDF } = await import("jspdf");
    const autoTable = (await import("jspdf-autotable")).default;

    const doc = new jsPDF();
    const dateStr = new Date().toLocaleDateString("en-NG", {
      day: "numeric", month: "long", year: "numeric",
    });

    // Header
    doc.setFillColor(8, 12, 20);
    doc.rect(0, 0, 210, 40, "F");
    doc.setTextColor(0, 212, 255);
    doc.setFontSize(24);
    doc.setFont("helvetica", "bold");
    doc.text("FRANCO GADGETS", 14, 20);
    doc.setFontSize(10);
    doc.setTextColor(107, 127, 163);
    doc.text("Premium Gadgets. Real Deals.", 14, 28);
    doc.text(`Invoice Date: ${dateStr}`, 14, 36);

    // Customer info
    if (name || phone || address) {
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.text("Customer Information", 14, 55);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.setTextColor(80, 80, 80);
      if (name) doc.text(`Name: ${name}`, 14, 63);
      if (phone) doc.text(`Phone: ${phone}`, 14, 70);
      if (address) doc.text(`Address: ${address}`, 14, 77);
    }

    // Table
    const tableData = cartItems.map((item) => [
      item.product.name,
      item.variant?.label || "Standard",
      item.quantity,
      formatPrice(item.price),
      formatPrice(item.price * item.quantity),
    ]);

    autoTable(doc, {
      startY: name || phone || address ? 90 : 55,
      head: [["Product", "Configuration", "Qty", "Unit Price", "Subtotal"]],
      body: tableData,
      styles: { font: "helvetica", fontSize: 9, textColor: [30, 30, 30] },
      headStyles: { fillColor: [0, 212, 255], textColor: [8, 12, 20], fontStyle: "bold" },
      alternateRowStyles: { fillColor: [245, 248, 255] },
    });

    const finalY = doc.lastAutoTable.finalY + 10;
    doc.setFontSize(10);
    doc.setTextColor(80, 80, 80);
    doc.text(`Subtotal: ${formatPrice(subtotal)}`, 130, finalY);
    doc.text(`Delivery: ${DELIVERY_FEE === 0 ? "FREE" : formatPrice(DELIVERY_FEE)}`, 130, finalY + 8);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(0, 212, 255);
    doc.setFontSize(13);
    doc.text(`TOTAL: ${formatPrice(total)}`, 130, finalY + 20);

    doc.setTextColor(107, 127, 163);
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.text("Thank you for shopping with Franco Gadgets!", 14, finalY + 30);
    doc.text("WhatsApp: wa.me/2348012345678", 14, finalY + 37);

    doc.save(`FRANCO-Invoice-${Date.now()}.pdf`);
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-brand-dark flex items-center justify-center">
        <div className="text-center">
          <p className="text-6xl mb-4">🛒</p>
          <h2 className="font-display text-4xl text-gray-900 dark:text-white tracking-wider mb-4">CART IS EMPTY</h2>
          <Link to="/explore" className="text-brand-cyan hover:underline font-body">← Start Shopping</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-brand-dark">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="mb-8">
          <p className="text-brand-cyan text-xs font-mono uppercase tracking-widest mb-1">Review & Order</p>
          <h1 className="font-display text-5xl text-gray-900 dark:text-white tracking-wider">
            CHECK<span className="text-brand-cyan">OUT</span>
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Cart items */}
          <div className="lg:col-span-3 space-y-3">
            <h2 className="text-gray-900 dark:text-white font-display text-xl tracking-wider mb-4">YOUR ITEMS</h2>
            {cartItems.map((item) => (
              <div key={item.key} className="bg-white dark:bg-brand-card border border-gray-200 dark:border-brand-border rounded-2xl p-4 flex gap-4">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-20 h-20 object-cover rounded-xl"
                  onError={(e) => { e.target.src = "https://via.placeholder.com/80/0D1422/00D4FF?text=F"; }}
                />
                <div className="flex-1">
                  <h3 className="text-gray-800 dark:text-brand-light font-body font-semibold">{item.product.name}</h3>
                  {item.variant && (
                    <p className="text-gray-500 dark:text-brand-muted text-xs font-mono">{item.variant.label}</p>
                  )}
                  <div className="flex items-center justify-between mt-2">
                    <p className="text-brand-cyan font-display text-xl tracking-wide">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-500 dark:text-brand-muted text-sm font-mono">×{item.quantity}</span>
                      <button
                        onClick={() => removeFromCart(item.key)}
                        className="text-red-400 hover:text-red-300 ml-2"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Customer info (optional) */}
            <div className="bg-white dark:bg-brand-card border border-gray-200 dark:border-brand-border rounded-2xl p-5 mt-4">
              <h3 className="text-gray-900 dark:text-white font-display text-lg tracking-wider mb-4">YOUR INFO (Optional)</h3>
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-gray-50 dark:bg-brand-dark border border-gray-200 dark:border-brand-border rounded-xl px-4 py-3 text-gray-800 dark:text-brand-light placeholder-gray-400 dark:placeholder-brand-muted font-body text-sm focus:outline-none focus:border-brand-cyan transition-colors"
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-gray-50 dark:bg-brand-dark border border-gray-200 dark:border-brand-border rounded-xl px-4 py-3 text-gray-800 dark:text-brand-light placeholder-gray-400 dark:placeholder-brand-muted font-body text-sm focus:outline-none focus:border-brand-cyan transition-colors"
                />
                <textarea
                  placeholder="Delivery Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  rows={2}
                  className="w-full bg-gray-50 dark:bg-brand-dark border border-gray-200 dark:border-brand-border rounded-xl px-4 py-3 text-gray-800 dark:text-brand-light placeholder-gray-400 dark:placeholder-brand-muted font-body text-sm focus:outline-none focus:border-brand-cyan transition-colors resize-none"
                />
              </div>
            </div>
          </div>

          {/* Order summary */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-brand-card border border-gray-200 dark:border-brand-border rounded-2xl p-6 sticky top-24">
              <h2 className="text-gray-900 dark:text-white font-display text-xl tracking-wider mb-6">ORDER SUMMARY</h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-500 dark:text-brand-muted font-body text-sm">
                  <span>Subtotal ({cartItems.length} item{cartItems.length !== 1 ? "s" : ""})</span>
                  <span className="font-mono">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-gray-500 dark:text-brand-muted font-body text-sm">
                  <span>Delivery Fee</span>
                  <span className="font-mono">
                    {DELIVERY_FEE === 0 ? (
                      <span className="text-emerald-400">FREE</span>
                    ) : (
                      formatPrice(DELIVERY_FEE)
                    )}
                  </span>
                </div>
                <div className="border-t border-gray-200 dark:border-brand-border pt-3 flex justify-between">
                  <span className="text-gray-900 dark:text-white font-body font-semibold">Total</span>
                  <span className="text-brand-cyan font-display text-2xl">{formatPrice(total)}</span>
                </div>
              </div>

              {/* WhatsApp CTA */}
              <button
                onClick={handleWhatsAppOrder}
                className="w-full bg-emerald-500 hover:bg-emerald-400 text-gray-900 dark:text-white py-4 rounded-xl font-display text-xl tracking-wider transition-all flex items-center justify-center gap-3 shadow-lg shadow-emerald-500/30 mb-3"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                ORDER VIA WHATSAPP
              </button>

              <button
                onClick={handleDownloadInvoice}
                className="w-full border border-gray-200 dark:border-brand-border text-gray-500 dark:text-brand-muted py-3 rounded-xl font-body text-sm hover:border-brand-cyan/50 hover:text-gray-800 dark:text-brand-light transition-all flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download PDF Invoice
              </button>

              <p className="text-gray-500 dark:text-brand-muted text-xs font-body text-center mt-4 leading-relaxed">
                Clicking "Order via WhatsApp" will open a chat with our team. We'll confirm your order and payment details instantly.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
