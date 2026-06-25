export type MenuItem = {
  name: string;
  price: string;
  tag?: string;
};

export type MenuCategory = {
  icon: string;
  name: string;
  desc: string;
  items: MenuItem[];
};

export const tagColors: Record<string, { bg: string; color: string }> = {
  Veg: { bg: 'rgba(39,174,96,.15)', color: '#27ae60' },
  Top: { bg: 'rgba(196,30,58,.18)', color: '#E63946' },
  Spicy: { bg: 'rgba(181,37,37,.18)', color: '#D63031' },
  Chef: { bg: 'rgba(155,89,182,.18)', color: '#9b59b6' },
};

export const categories: MenuCategory[] = [
  {
    icon: '🥟',
    name: 'Antipasti',
    desc: 'Stuzzichini caldi e freddi per iniziare al meglio',
    items: [
      { name: 'Involtino Primavera', price: '3,00€', tag: 'Veg' },
      { name: 'Nuvolette di Drago', price: '2,00€', tag: 'Veg' },
      { name: 'Involtini Speciali Carne e Verdure', price: '4,00€' },
      { name: 'Ravioli al Vapore (Dim Sum)', price: '4,50€' },
      { name: 'Gamberi Fritti Croccanti', price: '5,00€' },
    ],
  },
  {
    icon: '🍣',
    name: 'Sushi & Sashimi',
    desc: 'Pesce fresco selezionato e preparato con cura artigianale',
    items: [
      { name: 'Salmon Nigiri (2 pz)', price: '4,50€', tag: 'Top' },
      { name: 'Tuna Nigiri (2 pz)', price: '5,00€' },
      { name: 'California Roll (8 pz)', price: '7,00€' },
      { name: 'Spicy Salmon Roll', price: '7,50€', tag: 'Spicy' },
      { name: 'Sashimi Misto (12 pz)', price: '14,00€', tag: 'Top' },
    ],
  },
  {
    icon: '🍜',
    name: 'Piatti Principali',
    desc: 'Ricette tradizionali cinesi con ingredienti di prima scelta',
    items: [
      { name: 'Riso alla Cantonese', price: '8,00€', tag: 'Veg' },
      { name: 'Pollo alle Mandorle', price: '10,00€' },
      { name: 'Maiale in Agrodolce', price: '11,00€' },
      { name: 'Gamberi con Verdure', price: '13,00€' },
      { name: 'Anatra alla Pechino', price: '16,00€', tag: 'Chef' },
    ],
  },
  {
    icon: '🍲',
    name: 'Zuppe & Noodles',
    desc: "Brodi aromatici e noodles freschi per riscaldare l'anima",
    items: [
      { name: 'Zuppa di Wonton', price: '6,00€' },
      { name: 'Ramen Tonkotsu', price: '11,00€', tag: 'Top' },
      { name: 'Soba al Miso', price: '10,00€', tag: 'Veg' },
      { name: 'Udon con Gamberi', price: '12,00€' },
      { name: 'Zuppa Piccante Tofu', price: '8,50€', tag: 'Spicy' },
    ],
  },
];

export const mainDishesCategory = categories.find((cat) => cat.name === 'Piatti Principali')!;
