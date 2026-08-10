/**
 * seed-products.js
 *
 * Seeds a local MongoDB "products" collection with demo data — useful for
 * driving the checkout flow in the Razorpay sequence diagram (client picks
 * a product -> server creates a Razorpay order for its price).
 *
 * Setup:
 *   npm install mongodb
 *
 * Run:
 *   node seed-products.js
 *
 * By default this connects to a local MongoDB (mongodb://127.0.0.1:27017)
 * and writes into the "payment_gateway_demo" database. Adjust MONGO_URI /
 * DB_NAME below to match your project.
 */

import { MongoClient } from 'mongodb';

const MONGO_URI = 'mongodb://127.0.0.1:27017';
const DB_NAME = 'payment-gateway';
const COLLECTION = 'products';

// Prices are in INR (rupees). Razorpay's Orders API expects the smallest
// currency unit (paise), so convert with amount = price * 100 when you
// create the order — don't store paise here, it just makes the seed data
// harder to read.
const products = [
  {
    name: 'Wireless Headphones',
    description: 'Over-ear Bluetooth headphones with active noise cancellation and a 30-hour battery.',
    price: 2499,
    currency: 'INR',
    category: 'Audio',
    image: 'https://picsum.photos/seed/wireless-headphones/400/400',
    stock: 40,
    rating: 4.4,
  },
  {
    name: 'Mechanical Keyboard',
    description: '87-key hot-swappable mechanical keyboard with hot-swap switches and RGB backlight.',
    price: 3299,
    currency: 'INR',
    category: 'Accessories',
    image: 'https://picsum.photos/seed/mechanical-keyboard/400/400',
    stock: 25,
    rating: 4.6,
  },
  {
    name: 'Smart Watch',
    description: 'Fitness-tracking smartwatch with heart-rate monitor, SpO2, and a 7-day battery.',
    price: 4999,
    currency: 'INR',
    category: 'Wearables',
    image: 'https://picsum.photos/seed/smart-watch/400/400',
    stock: 18,
    rating: 4.2,
  },
  {
    name: 'Bluetooth Speaker',
    description: 'Portable IPX7 waterproof speaker with 12-hour playback and deep bass.',
    price: 1799,
    currency: 'INR',
    category: 'Audio',
    image: 'https://picsum.photos/seed/bluetooth-speaker/400/400',
    stock: 55,
    rating: 4.3,
  },
  {
    name: 'Laptop Stand',
    description: 'Adjustable aluminium laptop stand, foldable and portable, fits 11"–17" laptops.',
    price: 999,
    currency: 'INR',
    category: 'Accessories',
    image: 'https://picsum.photos/seed/laptop-stand/400/400',
    stock: 70,
    rating: 4.5,
  },
  {
    name: 'USB-C Hub',
    description: '7-in-1 USB-C hub with HDMI, SD card reader, and 100W power delivery pass-through.',
    price: 1499,
    currency: 'INR',
    category: 'Accessories',
    image: 'https://picsum.photos/seed/usbc-hub/400/400',
    stock: 60,
    rating: 4.1,
  },
  {
    name: 'Gaming Mouse',
    description: 'Lightweight wireless gaming mouse, 16000 DPI optical sensor, 70-hour battery.',
    price: 1999,
    currency: 'INR',
    category: 'Accessories',
    image: 'https://picsum.photos/seed/gaming-mouse/400/400',
    stock: 33,
    rating: 4.5,
  },
  {
    name: 'Full HD Webcam',
    description: '1080p webcam with autofocus and a built-in noise-cancelling mic.',
    price: 2199,
    currency: 'INR',
    category: 'Video',
    image: 'https://picsum.photos/seed/hd-webcam/400/400',
    stock: 28,
    rating: 4.0,
  },
  {
    name: 'Portable SSD 1TB',
    description: 'USB 3.2 external SSD, up to 1050MB/s read speed, shock-resistant enclosure.',
    price: 6499,
    currency: 'INR',
    category: 'Storage',
    image: 'https://picsum.photos/seed/portable-ssd/400/400',
    stock: 15,
    rating: 4.7,
  },
  {
    name: 'Noise Cancelling Earbuds',
    description: 'True wireless earbuds with hybrid ANC, wireless charging case, IPX4 rating.',
    price: 3499,
    currency: 'INR',
    category: 'Audio',
    image: 'https://picsum.photos/seed/anc-earbuds/400/400',
    stock: 45,
    rating: 4.4,
  },
];

async function seed() {
  const client = new MongoClient(MONGO_URI);

  try {
    await client.connect();
    const db = client.db(DB_NAME);
    const collection = db.collection(COLLECTION);

    const existingCount = await collection.countDocuments();
    if (existingCount > 0) {
      console.log(`"${COLLECTION}" already has ${existingCount} document(s) — clearing before reseeding.`);
      await collection.deleteMany({});
    }

    const now = new Date();
    const docs = products.map((p) => ({ ...p, createdAt: now, updatedAt: now }));

    const result = await collection.insertMany(docs);
    console.log(`Seeded ${result.insertedCount} products into ${DB_NAME}.${COLLECTION}`);
  } catch (err) {
    console.error('Seeding failed:', err);
    process.exitCode = 1;
  } finally {
    await client.close();
  }
}

seed();
