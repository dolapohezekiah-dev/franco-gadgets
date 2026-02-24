// =============================================================
// 📦 FRANCO GADGETS — PRODUCT DATA FILE
// =============================================================
//
// HOW TO ADD, EDIT, OR REMOVE PRODUCTS:
//
// Each product is an object in the `products` array below.
// Here's what each field means:
//
//   id          — Unique number. Increment by 1 for each new product.
//   name        — Full product name (e.g., "HP EliteBook 840 G8")
//   brand       — Brand name (e.g., "HP", "Dell", "Apple", "Samsung")
//   category    — One of: "laptop" | "smartphone" | "gaming" | "accessory" | "apple"
//   condition   — "New" or "UK Used"
//   price       — Selling price in Naira (number, no commas)
//   originalPrice — Crossed-out original price (set same as price if no discount)
//   ram         — RAM in GB (number) e.g., 8, 16, 32  (use null for accessories)
//   storage     — Storage in GB (number) e.g., 256, 512, 1000  (use null for accessories)
//   processor   — Processor string e.g., "Intel Core i5 11th Gen"  (use null for accessories)
//   screen      — Screen size string e.g., '15.6"'  (use null for accessories)
//   battery     — Battery info e.g., "4-Cell, 65Wh" or "90% Health"
//   rating      — Rating out of 5 (number) e.g., 4.5
//   reviews     — Number of reviews (number)
//   sold        — Number of units sold (number)
//   warranty    — Warranty info string e.g., "3 Months Warranty"
//   image       — URL to product image. Use any public image URL, or:
//                   1. Put your image in the /public/images/ folder
//                   2. Set image to "/images/your-image.jpg"
//   images      — Array of image URLs for the gallery (include main image here too)
//   featured    — true = appears in "Hot Deals" on homepage
//   bestSeller  — true = appears in "Best Sellers" on homepage
//   description — Full description text shown on product page
//   specs       — Object with extra spec key-value pairs shown in specs table
//   variants    — Array of variant objects: [{ label: "8GB/256GB", priceAdd: 0 }, ...]
//                  priceAdd is added to base price for that variant
//
// TO CHANGE PRODUCT PICTURES:
//   Option A — Use an online image URL:
//     image: "https://example.com/path/to/image.jpg"
//   Option B — Use a local image:
//     1. Copy your image to the `public/images/` folder in the project
//     2. Set: image: "/images/your-filename.jpg"
//
// TO ADD A NEW PRODUCT:
//   Copy an existing product block, paste it at the end of the array,
//   change the `id` to the next number, fill in your details, save the file.
//
// TO REMOVE A PRODUCT:
//   Delete the entire product object (from the { to the closing },)
//
// TO CHANGE WHATSAPP NUMBER:
//   Update WHATSAPP_NUMBER below.
//
// =============================================================

export const WHATSAPP_NUMBER = "2348012345678"; // ← Change this to your WhatsApp number (with country code, no +)
export const STORE_NAME = "Franco Gadgets";
export const STORE_TAGLINE = "Premium Gadgets. Real Deals.";
export const DELIVERY_FEE = 3500; // Naira — set to 0 for free delivery

export const products = [
  {
    id: 1,
    name: "HP EliteBook 840 G8",
    brand: "HP",
    category: "laptop",
    condition: "UK Used",
    price: 285000,
    originalPrice: 320000,
    ram: 16,
    storage: 512,
    processor: "Intel Core i5 11th Gen",
    screen: '14"',
    battery: "85% Health",
    rating: 4.7,
    reviews: 43,
    sold: 128,
    warranty: "3 Months Warranty",
    image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=600&q=80",
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&q=80",
      "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=600&q=80",
    ],
    featured: true,
    bestSeller: true,
    description: "The HP EliteBook 840 G8 is a business-class powerhouse built for professionals who demand performance and portability. Featuring Intel's 11th Gen processors and a stunning 14-inch display, it handles multitasking, video calls, and intensive workloads with ease. Premium build quality with military-grade durability.",
    specs: {
      Display: '14" FHD IPS Anti-Glare',
      Graphics: "Intel Iris Xe Graphics",
      OS: "Windows 11 Pro",
      Ports: "2x USB-A, 2x Thunderbolt 4, HDMI, SD Card",
      Weight: "1.37 kg",
      Camera: "720p HD Webcam",
    },
    variants: [
      { label: "16GB / 512GB", priceAdd: 0 },
      { label: "16GB / 1TB", priceAdd: 25000 },
    ],
  },
  {
    id: 2,
    name: "Dell Latitude 7420",
    brand: "Dell",
    category: "laptop",
    condition: "UK Used",
    price: 265000,
    originalPrice: 300000,
    ram: 16,
    storage: 256,
    processor: "Intel Core i7 11th Gen",
    screen: '14"',
    battery: "80% Health",
    rating: 4.5,
    reviews: 31,
    sold: 94,
    warranty: "3 Months Warranty",
    image: "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600&q=80",
      "https://images.unsplash.com/photo-1484788984921-03950022c38b?w=600&q=80",
    ],
    featured: true,
    bestSeller: false,
    description: "Dell's Latitude 7420 combines enterprise-level performance with sleek design. Powered by Intel Core i7 for demanding tasks, with a gorgeous 14-inch display and robust security features. Perfect for business professionals and remote workers.",
    specs: {
      Display: '14" FHD IPS Touch Optional',
      Graphics: "Intel Iris Xe Graphics",
      OS: "Windows 11 Pro",
      Ports: "USB-A, USB-C, Thunderbolt 4, HDMI",
      Weight: "1.4 kg",
      Camera: "1080p Full HD Webcam",
    },
    variants: [
      { label: "16GB / 256GB", priceAdd: 0 },
      { label: "16GB / 512GB", priceAdd: 20000 },
    ],
  },
  {
    id: 3,
    name: "Apple MacBook Pro M2",
    brand: "Apple",
    category: "apple",
    condition: "UK Used",
    price: 680000,
    originalPrice: 750000,
    ram: 16,
    storage: 512,
    processor: "Apple M2 Pro",
    screen: '14"',
    battery: "88% Health",
    rating: 4.9,
    reviews: 67,
    sold: 203,
    warranty: "3 Months Warranty",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&q=80",
      "https://images.unsplash.com/photo-1611186871525-b62f0fa49f22?w=600&q=80",
    ],
    featured: true,
    bestSeller: true,
    description: "The MacBook Pro with M2 Pro chip is Apple's most powerful laptop yet. Featuring the revolutionary Apple Silicon that delivers industry-leading performance per watt, stunning Liquid Retina XDR display, and up to 22 hours of battery life. The choice of creative professionals worldwide.",
    specs: {
      Display: '14" Liquid Retina XDR, 3024×1964',
      Graphics: "19-core GPU",
      OS: "macOS Ventura",
      Ports: "3x Thunderbolt 4, HDMI, SD Card, MagSafe 3",
      Weight: "1.6 kg",
      Camera: "1080p FaceTime HD",
    },
    variants: [
      { label: "16GB / 512GB", priceAdd: 0 },
      { label: "32GB / 1TB", priceAdd: 120000 },
    ],
  },
  {
    id: 4,
    name: "Lenovo ThinkPad X1 Carbon",
    brand: "Lenovo",
    category: "laptop",
    condition: "UK Used",
    price: 310000,
    originalPrice: 350000,
    ram: 16,
    storage: 512,
    processor: "Intel Core i7 12th Gen",
    screen: '14"',
    battery: "82% Health",
    rating: 4.6,
    reviews: 28,
    sold: 76,
    warranty: "3 Months Warranty",
    image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=600&q=80",
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&q=80",
    ],
    featured: false,
    bestSeller: true,
    description: "The iconic ThinkPad X1 Carbon is Lenovo's ultimate business ultrabook. Renowned for its legendary keyboard, military-grade build, and exceptional battery life. 12th Gen Intel Core i7 ensures blazing performance for professionals on the move.",
    specs: {
      Display: '14" 2.8K OLED Anti-Reflection',
      Graphics: "Intel Iris Xe Graphics",
      OS: "Windows 11 Pro",
      Ports: "2x Thunderbolt 4, 2x USB-A, HDMI, 3.5mm",
      Weight: "1.12 kg",
      Camera: "1080p + IR Camera",
    },
    variants: [{ label: "16GB / 512GB", priceAdd: 0 }],
  },
  {
    id: 5,
    name: "ASUS ROG Strix G15",
    brand: "ASUS",
    category: "gaming",
    condition: "UK Used",
    price: 420000,
    originalPrice: 480000,
    ram: 16,
    storage: 512,
    processor: "AMD Ryzen 9 5900HX",
    screen: '15.6"',
    battery: "78% Health",
    rating: 4.8,
    reviews: 52,
    sold: 147,
    warranty: "3 Months Warranty",
    image: "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?w=600&q=80",
      "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=600&q=80",
    ],
    featured: true,
    bestSeller: true,
    description: "Built for the serious gamer. The ASUS ROG Strix G15 packs AMD Ryzen 9 with NVIDIA RTX graphics for frame rates that dominate. RGB per-key lighting, 300Hz display, and advanced cooling keep you ahead of the competition.",
    specs: {
      Display: '15.6" FHD 300Hz IPS',
      Graphics: "NVIDIA RTX 3070 8GB",
      OS: "Windows 11 Home",
      Ports: "USB-A x3, USB-C, HDMI 2.0b, RJ45",
      Weight: "2.3 kg",
      Camera: "720p HD Webcam",
    },
    variants: [
      { label: "16GB / 512GB SSD", priceAdd: 0 },
      { label: "32GB / 1TB SSD", priceAdd: 65000 },
    ],
  },
  {
    id: 6,
    name: "Samsung Galaxy S24 Ultra",
    brand: "Samsung",
    category: "smartphone",
    condition: "New",
    price: 385000,
    originalPrice: 410000,
    ram: 12,
    storage: 256,
    processor: "Snapdragon 8 Gen 3",
    screen: '6.8"',
    battery: "5000mAh",
    rating: 4.9,
    reviews: 89,
    sold: 312,
    warranty: "1 Year Warranty",
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=600&q=80",
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&q=80",
    ],
    featured: true,
    bestSeller: true,
    description: "The Samsung Galaxy S24 Ultra redefines what a smartphone can do. With its integrated S Pen, 200MP camera system, and Galaxy AI features, it's the ultimate productivity and creative powerhouse. The titanium frame and Corning Gorilla Armor make it as tough as it is stunning.",
    specs: {
      Display: '6.8" Dynamic AMOLED 2X, 120Hz',
      "Rear Camera": "200MP + 12MP + 10MP + 50MP",
      "Front Camera": "12MP",
      Charging: "45W Wired, 15W Wireless",
      Colors: "Titanium Black, Titanium Gray, Titanium Violet",
      OS: "Android 14 + One UI 6.1",
    },
    variants: [
      { label: "12GB / 256GB", priceAdd: 0 },
      { label: "12GB / 512GB", priceAdd: 35000 },
      { label: "12GB / 1TB", priceAdd: 70000 },
    ],
  },
  {
    id: 7,
    name: "iPhone 15 Pro Max",
    brand: "Apple",
    category: "apple",
    condition: "New",
    price: 720000,
    originalPrice: 760000,
    ram: 8,
    storage: 256,
    processor: "Apple A17 Pro",
    screen: '6.7"',
    battery: "4422mAh",
    rating: 5.0,
    reviews: 134,
    sold: 428,
    warranty: "1 Year Warranty",
    image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600&q=80",
      "https://images.unsplash.com/photo-1512054502232-10a0a035d672?w=600&q=80",
    ],
    featured: true,
    bestSeller: true,
    description: "iPhone 15 Pro Max — Apple's most advanced iPhone ever. Featuring the A17 Pro chip, a titanium design, and the most powerful iPhone camera system with 5x optical zoom. Action Button. USB 3 speeds. It's a pro. Through and through.",
    specs: {
      Display: '6.7" Super Retina XDR ProMotion, Always-On',
      "Rear Camera": "48MP Main + 12MP Ultra Wide + 12MP 5x Telephoto",
      "Front Camera": "12MP TrueDepth",
      Charging: "USB-C, MagSafe, Qi2",
      Colors: "Black Titanium, White Titanium, Blue Titanium, Natural Titanium",
      OS: "iOS 17",
    },
    variants: [
      { label: "256GB", priceAdd: 0 },
      { label: "512GB", priceAdd: 80000 },
      { label: "1TB", priceAdd: 160000 },
    ],
  },
  {
    id: 8,
    name: "Tecno Spark 20 Pro",
    brand: "Tecno",
    category: "smartphone",
    condition: "New",
    price: 95000,
    originalPrice: 110000,
    ram: 8,
    storage: 256,
    processor: "MediaTek Helio G99",
    screen: '6.78"',
    battery: "5000mAh",
    rating: 4.3,
    reviews: 47,
    sold: 189,
    warranty: "1 Year Warranty",
    image: "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=600&q=80",
    images: ["https://images.unsplash.com/photo-1556656793-08538906a9f8?w=600&q=80"],
    featured: false,
    bestSeller: true,
    description: "The Tecno Spark 20 Pro delivers flagship-level features at an accessible price point. Boasting a 6.78-inch AMOLED display, powerful Helio G99 processor, and a 108MP camera, it's the value champion of the Nigerian smartphone market.",
    specs: {
      Display: '6.78" AMOLED 120Hz',
      "Rear Camera": "108MP + 50MP + 2MP",
      "Front Camera": "32MP",
      Charging: "33W Fast Charge",
      Colors: "Magic Skin Black, Aurora Cloud, Fantasy Blue",
      OS: "Android 13 + HiOS 13",
    },
    variants: [
      { label: "8GB / 128GB", priceAdd: -20000 },
      { label: "8GB / 256GB", priceAdd: 0 },
    ],
  },
  {
    id: 9,
    name: "Infinix Note 40 Pro",
    brand: "Infinix",
    category: "smartphone",
    condition: "New",
    price: 115000,
    originalPrice: 130000,
    ram: 12,
    storage: 256,
    processor: "MediaTek Helio G99 Ultimate",
    screen: '6.78"',
    battery: "5000mAh",
    rating: 4.4,
    reviews: 33,
    sold: 112,
    warranty: "1 Year Warranty",
    image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600&q=80",
    images: ["https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600&q=80"],
    featured: false,
    bestSeller: false,
    description: "Infinix Note 40 Pro brings 100W all-round fast charging and a stunning AMOLED display to the mid-range segment. Perfect for Nigerian power users who need reliability all day without hunting for a socket.",
    specs: {
      Display: '6.78" AMOLED 120Hz, 2400×1080',
      "Rear Camera": "108MP + 8MP Ultra Wide + 2MP",
      "Front Camera": "32MP",
      Charging: "100W Wired Fast Charge",
      Colors: "Titan Gold, Obsidian Black, Vintage Green",
      OS: "Android 14 + XOS 14",
    },
    variants: [{ label: "12GB / 256GB", priceAdd: 0 }],
  },
  {
    id: 10,
    name: "Anker PowerCore 26800mAh",
    brand: "Anker",
    category: "accessory",
    condition: "New",
    price: 35000,
    originalPrice: 42000,
    ram: null,
    storage: null,
    processor: null,
    screen: null,
    battery: "26800mAh",
    rating: 4.8,
    reviews: 76,
    sold: 341,
    warranty: "12 Months Warranty",
    image: "https://images.unsplash.com/photo-1609592806596-b5bb8cc4d6e9?w=600&q=80",
    images: ["https://images.unsplash.com/photo-1609592806596-b5bb8cc4d6e9?w=600&q=80"],
    featured: false,
    bestSeller: true,
    description: "Anker's 26800mAh PowerCore is the ultimate power bank for extended travel and outages. With three USB ports, it can charge your phone over 6 times. High-speed PowerIQ and VoltageBoost technology ensure your devices charge as fast as possible.",
    specs: {
      Capacity: "26800mAh",
      Input: "Micro-USB, 5V/2A",
      Output: "3× USB-A (5V/3A each)",
      "Charge Time": "~6.5 hours with two cables",
      Safety: "MultiProtect safety system",
      Weight: "480g",
    },
    variants: [{ label: "Standard", priceAdd: 0 }],
  },
  {
    id: 11,
    name: "Sony WH-1000XM5 Headphones",
    brand: "Sony",
    category: "accessory",
    condition: "New",
    price: 95000,
    originalPrice: 115000,
    ram: null,
    storage: null,
    processor: null,
    screen: null,
    battery: "30hrs ANC",
    rating: 4.9,
    reviews: 58,
    sold: 167,
    warranty: "6 Months Warranty",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80",
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600&q=80",
    ],
    featured: true,
    bestSeller: false,
    description: "Industry-leading noise cancellation. Crystal-clear hands-free calling. 30-hour battery. The Sony WH-1000XM5 is the gold standard in wireless headphones. Eight microphones and two processors work together to block out everything except what matters.",
    specs: {
      Driver: "30mm, Dome Type",
      Frequency: "4 Hz–40,000 Hz",
      Connectivity: "Bluetooth 5.2, 3.5mm Jack",
      "Noise Cancellation": "AI-powered Dual Noise Sensor",
      Charging: "USB-C, 3hrs full charge",
      Weight: "250g",
    },
    variants: [
      { label: "Black", priceAdd: 0 },
      { label: "Silver", priceAdd: 0 },
    ],
  },
  {
    id: 12,
    name: "HP Victus 15 Gaming",
    brand: "HP",
    category: "gaming",
    condition: "New",
    price: 355000,
    originalPrice: 390000,
    ram: 16,
    storage: 512,
    processor: "Intel Core i5 12th Gen",
    screen: '15.6"',
    battery: "70Wh",
    rating: 4.5,
    reviews: 24,
    sold: 63,
    warranty: "1 Year Warranty",
    image: "https://images.unsplash.com/photo-1616763355603-9755a640a287?w=600&q=80",
    images: ["https://images.unsplash.com/photo-1616763355603-9755a640a287?w=600&q=80"],
    featured: false,
    bestSeller: false,
    description: "The HP Victus 15 brings serious gaming performance at an approachable price. NVIDIA RTX 3050 handles modern games with ease, while the 144Hz display keeps gameplay smooth.",
    specs: {
      Display: '15.6" FHD IPS 144Hz',
      Graphics: "NVIDIA RTX 3050 4GB",
      OS: "Windows 11 Home",
      Ports: "USB-A x2, USB-C, HDMI, Headphone jack",
      Weight: "2.29 kg",
      Camera: "720p HD",
    },
    variants: [
      { label: "16GB / 512GB", priceAdd: 0 },
      { label: "16GB / 1TB", priceAdd: 40000 },
    ],
  },
];

export const brands = [...new Set(products.map((p) => p.brand))].sort();
export const categories = [
  { key: "all", label: "All Products", icon: "🛒" },
  { key: "laptop", label: "Laptops", icon: "💻" },
  { key: "smartphone", label: "Smartphones", icon: "📱" },
  { key: "gaming", label: "Gaming Laptops", icon: "🎮" },
  { key: "apple", label: "Apple Devices", icon: "🍎" },
  { key: "accessory", label: "Accessories", icon: "🎧" },
];
