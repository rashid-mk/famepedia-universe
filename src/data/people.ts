export interface Person {
  id: string;
  name: string;
  handle: string;
  followers: number;
  imageUrl: string;
  category: Category;
  platform: Platform;
  country: Country;
  region: Region;
  description: string;
}

export const people: Person[] = [
  {
    id: 1,
    name: "Cristiano Ronaldo",
    handle: "@cristiano",
    followers: 612000000,
    imageUrl: "https://images.unsplash.com/photo-1632080167284-92ec27f1bd8b?q=80&w=2070&auto=format&fit=crop",
    category: "sports",
    platform: "instagram",
    country: "Portugal",
    region: "Europe",
    description: "Portuguese professional footballer who is regarded as one of the greatest players of all time."
  },
  {
    id: 2,
    name: "Lionel Messi",
    handle: "@leomessi",
    followers: 493000000,
    imageUrl: "https://images.unsplash.com/photo-1631728730444-6b8d4ebb4537?q=80&w=2068&auto=format&fit=crop",
    category: "sports",
    platform: "instagram",
    country: "Argentina",
    region: "South America",
    description: "Argentine professional footballer widely regarded as one of the greatest players of all time."
  },
  {
    id: 3,
    name: "Selena Gomez",
    handle: "@selenagomez",
    followers: 426000000,
    imageUrl: "https://images.unsplash.com/photo-1562051036-e0eea191d42f?q=80&w=2070&auto=format&fit=crop",
    category: "entertainment",
    platform: "instagram",
    country: "USA",
    region: "North America",
    description: "American singer, actress, producer, and entrepreneur with a massive social media following."
  },
  {
    id: 4,
    name: "Kylie Jenner",
    handle: "@kyliejenner",
    followers: 399000000,
    imageUrl: "https://images.unsplash.com/photo-1614247384136-edf9576adad2?q=80&w=2071&auto=format&fit=crop",
    category: "entertainment",
    platform: "instagram",
    country: "USA",
    region: "North America",
    description: "Media personality, socialite, and businesswoman who founded Kylie Cosmetics."
  },
  {
    id: 5,
    name: "Dwayne Johnson",
    handle: "@therock",
    followers: 390000000,
    imageUrl: "https://images.unsplash.com/photo-1601281120920-c6ea713d3d00?q=80&w=2075&auto=format&fit=crop",
    category: "entertainment",
    platform: "instagram",
    country: "USA",
    region: "North America",
    description: "Actor, producer, businessman, and former professional wrestler known as 'The Rock'."
  },
  {
    id: 6,
    name: "Ariana Grande",
    handle: "@arianagrande",
    followers: 380000000,
    imageUrl: "https://images.unsplash.com/photo-1618061262606-85902d262c79?q=80&w=2077&auto=format&fit=crop",
    category: "entertainment",
    platform: "instagram",
    country: "USA",
    region: "North America",
    description: "American singer, songwriter, and actress with a distinctive four-octave vocal range."
  },
  {
    id: 7,
    name: "Kim Kardashian",
    handle: "@kimkardashian",
    followers: 364000000,
    imageUrl: "https://images.unsplash.com/photo-1578911373434-0cb395d2cbfb?q=80&w=2076&auto=format&fit=crop",
    category: "entertainment",
    platform: "instagram",
    country: "USA",
    region: "North America",
    description: "Media personality, socialite, model, and businesswoman known for SKIMS and SKKN brands."
  },
  {
    id: 8,
    name: "Beyoncé",
    handle: "@beyonce",
    followers: 319000000,
    imageUrl: "https://images.unsplash.com/photo-1546959569-d3229c1bcd49?q=80&w=2070&auto=format&fit=crop",
    category: "entertainment",
    platform: "instagram",
    country: "USA",
    region: "North America",
    description: "American singer, songwriter, and actress regarded as one of the most influential artists."
  },
  {
    id: 9,
    name: "Khloé Kardashian",
    handle: "@khloekardashian",
    followers: 310000000,
    imageUrl: "https://images.unsplash.com/photo-1628111380020-3a23b7698608?q=80&w=2080&auto=format&fit=crop",
    category: "entertainment",
    platform: "instagram",
    country: "USA",
    region: "North America",
    description: "American media personality, socialite and entrepreneur who co-founded Good American."
  },
  {
    id: 10,
    name: "Nike",
    handle: "@nike",
    followers: 304000000,
    imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop",
    category: "business",
    platform: "instagram",
    country: "USA",
    region: "North America",
    description: "American multinational corporation that designs and manufactures athletic apparel."
  },
  {
    id: 11,
    name: "National Geographic",
    handle: "@natgeo",
    followers: 290000000,
    imageUrl: "https://images.unsplash.com/photo-1526391922840-891b87f9af1b?q=80&w=2074&auto=format&fit=crop",
    category: "business",
    platform: "instagram",
    country: "USA",
    region: "North America",
    description: "American worldwide nonprofit organization dedicated to exploration and science."
  },
  {
    id: 12,
    name: "Justin Bieber",
    handle: "@justinbieber",
    followers: 288000000,
    imageUrl: "https://images.unsplash.com/photo-1606994772320-c7bbfea9e088?q=80&w=2080&auto=format&fit=crop",
    category: "entertainment",
    platform: "instagram",
    country: "Canada",
    region: "North America",
    description: "Canadian singer recognized for his genre-melding musicianship and global influence."
  },
  {
    id: 13,
    name: "Elon Musk",
    handle: "@elonmusk",
    followers: 175000000,
    imageUrl: "https://images.unsplash.com/photo-1634249683411-10edb8ad23c1?q=80&w=2033&auto=format&fit=crop",
    category: "technology",
    platform: "twitter",
    country: "South Africa/USA",
    region: "Africa/North America",
    description: "Business magnate and investor, founder of SpaceX, Tesla, Neuralink, and The Boring Company."
  },
  {
    id: 14,
    name: "Barack Obama",
    handle: "@barackobama",
    followers: 131000000,
    imageUrl: "https://images.unsplash.com/photo-1580130601553-fa0bb62ce88d?q=80&w=2080&auto=format&fit=crop",
    category: "politics",
    platform: "twitter",
    country: "USA",
    region: "North America",
    description: "44th president of the United States, lawyer, and author who served from 2009 to 2017."
  },
  {
    id: 15,
    name: "MrBeast",
    handle: "@mrbeast",
    followers: 243000000,
    imageUrl: "https://images.unsplash.com/photo-1549761505-a61ca33a7597?q=80&w=2070&auto=format&fit=crop",
    category: "entertainment",
    platform: "youtube",
    country: "USA",
    region: "North America",
    description: "American YouTuber, businessman and philanthropist known for expensive stunts and challenges."
  },
];

export type Category = 'all' | Person['category'];
export type Platform = 'all' | Person['platform'];
export type Country = 'all' | string;
export type Region = 'all' | string;

export const categories: { value: Category; label: string }[] = [
  { value: 'all', label: 'All Categories' },
  { value: 'entertainment', label: 'Entertainment' },
  { value: 'sports', label: 'Sports' },
  { value: 'business', label: 'Business' },
  { value: 'politics', label: 'Politics' },
  { value: 'technology', label: 'Technology' },
];

export const platforms: { value: Platform; label: string; color: string }[] = [
  { value: 'all', label: 'All Platforms', color: 'bg-gray-200 text-gray-800' },
  { value: 'instagram', label: 'Instagram', color: 'bg-pink-100 text-pink-800' },
  { value: 'twitter', label: 'Twitter', color: 'bg-blue-100 text-blue-800' },
  { value: 'youtube', label: 'YouTube', color: 'bg-red-100 text-red-800' },
  { value: 'tiktok', label: 'TikTok', color: 'bg-black text-white' },
  { value: 'facebook', label: 'Facebook', color: 'bg-indigo-100 text-indigo-800' },
];

// Extract unique countries and regions from people data
export const countries: { value: Country; label: string }[] = [
  { value: 'all', label: 'All Countries' },
  ...Array.from(new Set(people.map(person => person.country)))
    .sort()
    .map(country => ({ value: country, label: country }))
];

export const regions: { value: Region; label: string }[] = [
  { value: 'all', label: 'All Regions' },
  ...Array.from(new Set(people.map(person => person.region)))
    .sort()
    .map(region => ({ value: region, label: region }))
];

export function formatNumber(number: number): string {
  if (number >= 1000000000) {
    return (number / 1000000000).toFixed(1) + 'B';
  }
  if (number >= 1000000) {
    return (number / 1000000).toFixed(1) + 'M';
  }
  if (number >= 1000) {
    return (number / 1000).toFixed(1) + 'K';
  }
  return number.toString();
}
