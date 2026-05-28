export const services = [
  {
    name: "Aroma Ritual Massage",
    duration: "60 min",
    price: "Rs. 2,499",
    description: "A calming essential-oil massage for deep rest and muscle release.",
    accent: "jade"
  },
  {
    name: "Radiance Gold Facial",
    duration: "50 min",
    price: "Rs. 1,899",
    description: "Brightening cleanse, massage, mask, and serum ritual for event-ready skin.",
    accent: "champagne"
  },
  {
    name: "Balinese Deep Tissue",
    duration: "75 min",
    price: "Rs. 3,299",
    description: "Firm-pressure therapy designed for shoulders, back, and tired city bodies.",
    accent: "rosewood"
  },
  {
    name: "Couple Serenity Suite",
    duration: "90 min",
    price: "Rs. 5,999",
    description: "Private suite experience with massage, herbal steam, and tea service.",
    accent: "clay"
  },
  {
    name: "Foot Reflexology",
    duration: "40 min",
    price: "Rs. 1,299",
    description: "Targeted foot pressure therapy with warm towels and botanical balm.",
    accent: "jade"
  },
  {
    name: "Bridal Glow Package",
    duration: "120 min",
    price: "Rs. 7,499",
    description: "Full body polish, facial, hair spa, and relaxation lounge access.",
    accent: "champagne"
  }
];

export const timeSlots = ["11 AM", "12 PM", "1 PM", "2 PM"];

export const gallery = [
  {
    title: "Botanical Therapy Room",
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1200&q=80"
  },
  {
    title: "Rajajinagar Couple Suite",
    image: "https://images.unsplash.com/photo-1600334129128-685c5582fd35?auto=format&fit=crop&w=1200&q=80"
  },
  {
    title: "Herbal Steam Lounge",
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80"
  },
  {
    title: "Radiance Facial Studio",
    image: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=1200&q=80"
  }
];

export const demoAppointments = [
  {
    id: "demo-1",
    name: "Aarav Mehta",
    phone: "9876543210",
    service: "Aroma Ritual Massage",
    date: getDateOffset(1),
    time: "11 AM",
    status: "Confirmed",
    createdAt: new Date().toISOString(),
    calendarStatus: "demo"
  },
  {
    id: "demo-2",
    name: "Nisha Rao",
    phone: "9988776655",
    service: "Radiance Gold Facial",
    date: getDateOffset(1),
    time: "1 PM",
    status: "Confirmed",
    createdAt: new Date().toISOString(),
    calendarStatus: "demo"
  },
  {
    id: "demo-3",
    name: "Kabir Shah",
    phone: "9123456780",
    service: "Balinese Deep Tissue",
    date: getDateOffset(2),
    time: "12 PM",
    status: "Confirmed",
    createdAt: new Date().toISOString(),
    calendarStatus: "demo"
  }
];

export function getDateOffset(offset) {
  const date = new Date();
  date.setDate(date.getDate() + offset);
  return date.toISOString().slice(0, 10);
}

export function availableDates(days = 8) {
  return Array.from({ length: days }, (_, index) => {
    const date = new Date();
    date.setDate(date.getDate() + index);
    return date.toISOString().slice(0, 10);
  });
}
