import { WHATSAPP_NUMBER, DELIVERY_FEE } from "../data/products";

export function formatPrice(amount) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency", currency: "NGN",
    minimumFractionDigits: 0, maximumFractionDigits: 0,
  }).format(amount).replace("NGN", "₦");
}

export function discount(original, price) {
  if (!original || original <= price) return 0;
  return Math.round(((original - price) / original) * 100);
}

export function generateWhatsAppMessage(cartItems, subtotal, customerName = "") {
  const total = subtotal + DELIVERY_FEE;
  const itemsText = cartItems.map((item) =>
    `• ${item.product.name}${item.variant ? ` (${item.variant.label})` : ""} × ${item.quantity} = ${formatPrice(item.price * item.quantity)}`
  ).join("\n");

  const message = `Hello Franco Gadgets! 👋\n\nI'd like to place an order:\n\n*ORDER DETAILS:*\n${itemsText}\n\n📦 Subtotal: ${formatPrice(subtotal)}\n🚚 Delivery: ${DELIVERY_FEE === 0 ? "FREE" : formatPrice(DELIVERY_FEE)}\n💰 *Total: ${formatPrice(total)}*${customerName ? `\n\n👤 Name: ${customerName}` : ""}\n\nPlease confirm availability and payment details. Thank you!`;
  return encodeURIComponent(message);
}

export function openWhatsApp(cartItems, subtotal, customerName = "") {
  const msg = generateWhatsAppMessage(cartItems, subtotal, customerName);
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, "_blank");
}
