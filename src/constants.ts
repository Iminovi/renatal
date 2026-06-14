export interface Car {
  id: string;
  name: string;
  type: string;
  price: string;
  image: string;
  seats: number;
  transmission: 'Manual' | 'Automatic';
  featured?: boolean;
}

export const FLEET: Car[] = [
  {
    id: '1',
    name: 'Toyota Avanza',
    type: 'MPV',
    price: 'Rp 400.000',
    image: 'https://img.mobilmo.com/2023/01/16/h6lLpCjl/spesifikasi-avanza-2013-type-g-9d41.png',
    seats: 7,
    transmission: 'Manual',
    featured: true
  },
  {
    id: '2',
    name: 'Toyota Innova Zenix',
    type: 'Luxury MPV',
    price: 'Rp 800.000',
    image: 'https://i0.wp.com/autonetmagz.com/wp-content/uploads/2022/12/innova.jpg?resize=860%2C480&ssl=1',
    seats: 7,
    transmission: 'Automatic',
    featured: true
  },
  {
    id: '3',
    name: 'Toyota Fortuner',
    type: 'SUV',
    price: 'Rp 1.200.000',
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=800',
    seats: 7,
    transmission: 'Automatic'
  },
  {
    id: '4',
    name: 'Honda Brio',
    type: 'City Car',
    price: 'Rp 300.000',
    image: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&q=80&w=800',
    seats: 5,
    transmission: 'Manual'
  },
  {
    id: '5',
    name: 'Toyota Alphard',
    type: 'Luxury VIP',
    price: 'Rp 2.500.000',
    image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&q=80&w=800',
    seats: 7,
    transmission: 'Automatic'
  },
  {
    id: '6',
    name: 'Mitsubishi Xpander',
    type: 'MPV',
    price: 'Rp 450.000',
    image: 'https://icms.bumenredjaabadi.com/assets/cars/thumbnail/car-thumbnail-1636964034.png',
    seats: 7,
    transmission: 'Manual'
  }
];
