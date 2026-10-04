// Price list — the single source for the Árlista cards and the structured
// data offers. Edit prices here.
export type PriceItem = {
  number: string;
  title: string;
  duration: string;
  /** Display amount, e.g. '20.000'. */
  amount: string;
  currency: string;
  /** Machine-readable price in HUF (used in structured data). */
  priceHuf: number;
  durationMinutes: number;
};

export const PRICES: PriceItem[] = [
  { number: '01', title: 'Állapotfelmérés', duration: '55 perc', amount: '20.000', currency: 'Ft', priceHuf: 20000, durationMinutes: 55 },
  { number: '02', title: 'Gyógytorna, manuálterápia', duration: '55 perc', amount: '18.000', currency: 'Ft', priceHuf: 18000, durationMinutes: 55 },
  { number: '03', title: '6 alkalmas bérlet', duration: '55 perc', amount: '102.000', currency: 'Ft', priceHuf: 102000, durationMinutes: 55 },
  { number: '04', title: '10 alkalmas bérlet', duration: '55 perc', amount: '165.000', currency: 'Ft', priceHuf: 165000, durationMinutes: 55 },
];
