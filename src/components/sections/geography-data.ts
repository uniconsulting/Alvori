export type GeoCity = {
  id: string;
  label: string;
  location: [number, number];
};

export type GeoRoute = {
  id: string;
  from: string;
  to: string;
};

export const GEO_CITIES: GeoCity[] = [
  { id: 'ulyanovsk', label: 'Ульяновск', location: [54.3142, 48.4031] },
  { id: 'moscow', label: 'Москва', location: [55.7558, 37.6176] },
  { id: 'saint-petersburg', label: 'Санкт-Петербург', location: [59.9311, 30.3609] },
  { id: 'kazan', label: 'Казань', location: [55.7963, 49.1088] },
  { id: 'samara', label: 'Самара', location: [53.1959, 50.1008] },
  { id: 'ekaterinburg', label: 'Екатеринбург', location: [56.8389, 60.6057] },
  { id: 'krasnodar', label: 'Краснодар', location: [45.0355, 38.9753] },
];

export const GEO_ROUTES: GeoRoute[] = [
  { id: 'ulyanovsk-moscow', from: 'ulyanovsk', to: 'moscow' },
  { id: 'moscow-spb', from: 'moscow', to: 'saint-petersburg' },
  { id: 'moscow-krasnodar', from: 'moscow', to: 'krasnodar' },
  { id: 'kazan-ekaterinburg', from: 'kazan', to: 'ekaterinburg' },
  { id: 'samara-moscow', from: 'samara', to: 'moscow' },
];
