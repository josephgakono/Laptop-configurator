export const cpuOptions = [
  {
    id: 'core-ultra-7',
    label: 'Intel Core Ultra 7',
    helper: 'A smooth fit for work, streaming, and everyday multitasking',
    badge: 'Balanced',
    price: 340,
    performance: 28,
    battery: 16,
  },
  {
    id: 'ryzen-9-ai',
    label: 'AMD Ryzen 9 AI',
    helper: 'Great for creative work, editing, and heavier multitasking',
    badge: 'Creator',
    price: 430,
    performance: 35,
    battery: 12,
  },
  {
    id: 'core-ultra-9',
    label: 'Intel Core Ultra 9',
    helper: 'Top-end speed for demanding projects and power users',
    badge: 'Max Power',
    price: 560,
    performance: 44,
    battery: 7,
  },
]

export const ramOptions = [
  {
    id: '16gb',
    label: '16 GB LPDDR5X',
    helper: 'Smooth for everyday work and heavy multitasking',
    badge: 'Standard',
    price: 90,
    performance: 9,
    battery: 7,
  },
  {
    id: '32gb',
    label: '32 GB LPDDR5X',
    helper: 'Easy breathing room for creative work and multitasking',
    badge: 'Popular',
    price: 180,
    performance: 16,
    battery: 3,
  },
  {
    id: '64gb',
    label: '64 GB LPDDR5X',
    helper: 'Extra headroom for huge files, heavy apps, and pro workflows',
    badge: 'Studio',
    price: 340,
    performance: 24,
    battery: -2,
  },
]

export const storageOptions = [
  {
    id: '512gb',
    label: '512 GB NVMe SSD',
    helper: 'Enough space for everyday files and essential apps',
    badge: 'Fast',
    price: 80,
    performance: 4,
    battery: 5,
  },
  {
    id: '1tb',
    label: '1 TB NVMe SSD',
    helper: 'A roomy choice for games, media, and creative work',
    badge: 'Recommended',
    price: 160,
    performance: 7,
    battery: 2,
  },
  {
    id: '2tb',
    label: '2 TB NVMe SSD',
    helper: 'Plenty of room for large creative and gaming libraries',
    badge: 'Capacity',
    price: 300,
    performance: 9,
    battery: -1,
  },
]

export const colorOptions = [
  {
    id: 'silver',
    label: 'Arctic Silver',
    helper: 'A clean metallic finish that always looks sharp',
    badge: 'Classic',
    price: 0,
    accent: '#dce6f7',
  },
  {
    id: 'black',
    label: 'Midnight Black',
    helper: 'A sleek dark finish with a subtle premium feel',
    badge: 'Stealth',
    price: 25,
    accent: '#394760',
  },
  {
    id: 'blue',
    label: 'Cobalt Blue',
    helper: 'A bold signature color with a modern edge',
    badge: 'Signature',
    price: 45,
    accent: '#4b79d8',
  },
]

export const chassisOptions = [
  {
    id: 'classic-aluminum',
    label: 'Classic Aluminum',
    shortLabel: 'Classic',
    helper: 'A balanced choice for work, home, and everyday carry',
    badge: 'All-Rounder',
    price: 180,
    performance: 8,
    battery: 8,
    previewOverlay: null,
  },
  {
    id: 'slim-magnesium',
    label: 'Slim Magnesium',
    shortLabel: 'Slim',
    helper: 'A lighter feel for commuting, travel, and flexible days',
    badge: 'Portable',
    price: 240,
    performance: 5,
    battery: 16,
    previewOverlay: 'slim',
  },
  {
    id: 'gaming-alloy',
    label: 'Gaming Alloy',
    shortLabel: 'Gaming',
    helper: 'Built to stay cooler when you push it harder',
    badge: 'Thermal Boost',
    price: 330,
    performance: 22,
    battery: -14,
    previewOverlay: 'gaming',
  },
]

export const defaultConfig = {
  cpu: 'core-ultra-7',
  ram: '32gb',
  storage: '1tb',
  color: 'silver',
  chassis: 'classic-aluminum',
}
