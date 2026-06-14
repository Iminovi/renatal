/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from 'motion/react';
import { 
  Car as CarIcon, 
  ChevronRight, 
  ShieldCheck, 
  Clock, 
  MapPin, 
  Phone, 
  Menu, 
  X,
  Star,
  Users,
  Settings
} from 'lucide-react';
import { useState, useEffect } from 'react';
import type { FormEvent, MouseEvent } from 'react';
import { FLEET, type Car } from './constants';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Beranda', href: '#' },
    { name: 'Armada', href: '#fleet' },
    { name: 'Layanan', href: '#services' },
    { name: 'Tentang', href: '#about' },
  ];

  const handleNavClick = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const targetId = href.substring(1);
      
      if (!targetId) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const element = document.getElementById(targetId);
        if (element) {
          const offset = 100; // Offset agar judul tidak tertutup navbar fixed
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.scrollY - offset;
          window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }
      }
      setIsOpen(false); // Tutup menu mobile jika sedang terbuka
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-md py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="bg-primary p-2 rounded-lg">
            <CarIcon className="text-white w-6 h-6" />
          </div>
          <span className={`text-xl font-bold font-display ${scrolled ? 'text-primary' : 'text-primary'}`}>
            TEGAL<span className="text-accent text-primary">TRANS</span>
          </span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              onClick={(e) => handleNavClick(e, link.href)}
              className={`text-sm font-medium hover:text-accent transition-colors ${scrolled ? 'text-slate-600' : 'text-slate-700'}`}
            >
              {link.name}
            </a>
          ))}
          <a 
            href="#contact" 
            onClick={(e) => handleNavClick(e, '#contact')}
            className="bg-primary text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-slate-800 transition-all shadow-lg hover:shadow-primary/20"
          >
            Hubungi Kami
          </a>
        </div>

        {/* Mobile Toggle */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-primary">
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-slate-100 overflow-hidden"
          >
            <div className="px-6 py-6 flex flex-col space-y-4">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="text-lg font-medium text-slate-600 hover:text-accent"
                >
                  {link.name}
                </a>
              ))}
              <a 
                href="#contact" 
                onClick={(e) => handleNavClick(e, '#contact')}
                className="bg-primary text-white px-6 py-3 rounded-xl text-center font-semibold"
              >
                Hubungi Kami
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default function App() {
  const featuredCars = FLEET.filter(car => car.featured);
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactCar, setContactCar] = useState('Pilih Armada');
  const [contactMessage, setContactMessage] = useState('');
  const [activeCategory, setActiveCategory] = useState('Semua');

  const filteredFleet = FLEET.filter(car => {
    if (activeCategory === 'Semua') return true;
    return car.type.toLowerCase().includes(activeCategory.toLowerCase());
  });

  const handleContactSubmit = (e: FormEvent) => {
    e.preventDefault();

    const waNumber = "62895385246738"; // Ganti dengan nomor WhatsApp bisnis Anda

    const carSelectionText = contactCar && contactCar !== "Pilih Armada"
      ? `Saya tertarik dengan mobil: ${contactCar}\n`
      : '';

    const messageBody = `Halo Tegal Trans, saya ingin mengirim pesan.
---
*Nama*: ${contactName}
*Telepon*: ${contactPhone}
${carSelectionText}*Kebutuhan*: ${contactMessage}
---
Mohon informasinya, terima kasih.`;

    const encodedMessage = encodeURIComponent(messageBody);
    const whatsappUrl = `https://wa.me/${waNumber}?text=${encodedMessage}`;

    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

    // Optional: Reset form fields after submission
    // setContactName(''); setContactPhone(''); setContactCar('Pilih Armada'); setContactMessage('');
  };

  const handleServiceClick = (serviceTitle: string) => {
    setContactMessage(`Halo, saya ingin informasi lebih lanjut mengenai layanan ${serviceTitle}.`);
    const element = document.getElementById('contact');
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 -skew-x-12 transform origin-top-right -z-10 hidden lg:block" />
        
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="inline-flex items-center space-x-2 bg-accent/10 border border-accent/20 px-3 py-1 rounded-full mb-6 text-accent text-xs font-bold uppercase tracking-wider">
              <Star className="w-3 h-3 fill-accent" />
              <span>Rental Mobil #1 di Tegal</span>
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold text-primary leading-tight mb-6">
              Perjalanan Nyaman, <br />
              <span className="text-accent underline decoration-4 underline-offset-8">Tanpa Beban.</span>
            </h1>
            <p className="text-slate-500 text-lg mb-8 max-w-lg leading-relaxed">
              Sewa mobil terbaik untuk kebutuhan wisata, bisnis, hingga acara keluarga di Kota Tegal. Armada terawat, harga transparan, dan pelayanan istimewa.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#fleet" className="bg-primary text-white px-8 py-4 rounded-2xl font-bold flex items-center justify-center space-x-2 hover:scale-105 transition-transform shadow-xl shadow-primary/20">
                <span>Pilih Armada Sekarang</span>
                <ChevronRight className="w-5 h-5" />
              </a>
              <a href="#contact" className="bg-white text-primary border border-slate-200 px-8 py-4 rounded-2xl font-bold hover:bg-slate-50 transition-colors text-center">
                Konsultasi Gratis
              </a>
            </div>

            <div className="mt-12 flex items-center space-x-8">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-white overflow-hidden">
                    <img src={`https://i.pravatar.cc/150?u=${i}`} alt="Avatar" />
                  </div>
                ))}
              </div>
              <div>
                <div className="flex items-center text-accent">
                  <Star className="w-4 h-4 fill-accent" />
                  <Star className="w-4 h-4 fill-accent" />
                  <Star className="w-4 h-4 fill-accent" />
                  <Star className="w-4 h-4 fill-accent" />
                  <Star className="w-4 h-4 fill-accent" />
                </div>
                <p className="text-xs text-slate-500 mt-1 font-semibold">1,000+ Pelanggan Puas</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=1200" 
                alt="Luxury Car Interior" 
                className="w-full h-[500px] object-cover"
              />
            </div>
            {/* Floating Info Cards */}
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-3xl shadow-xl z-20 border border-slate-100 max-w-[200px]">
              <div className="bg-green-100 w-10 h-10 rounded-full flex items-center justify-center mb-4">
                <ShieldCheck className="text-green-600 w-6 h-6" />
              </div>
              <p className="text-sm font-bold text-primary">Asuransi Lengkap</p>
              <p className="text-xs text-slate-400 mt-1">Perjalanan aman tanpa rasa khawatir.</p>
            </div>
            <div className="absolute -top-6 -right-6 bg-white p-6 rounded-3xl shadow-xl z-20 border border-slate-100 max-w-[180px]">
              <p className="text-3xl font-bold text-primary">24h</p>
              <p className="text-sm font-bold text-primary mt-1">Layanan Support</p>
              <p className="text-xs text-slate-400 mt-1">Siap membantu anda kapanpun!</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary mb-4">Layanan Unggulan Kami</h2>
            <p className="text-slate-500 max-w-2xl mx-auto">Kami menyediakan berbagai pilihan paket perjalanan yang bisa disesuaikan dengan kebutuhan budget dan tujuan anda.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Users, title: 'Sewa dengan Supir', desc: 'Sangat cocok untuk perjalanan bisnis atau wisata keluarga tanpa lelah menyetir.' },
              { icon: CarIcon, title: 'Lepas Kunci', desc: 'Privasi lebih terjaga dengan menyetir sendiri. Persyaratan mudah dan cepat.' },
              { icon: MapPin, title: 'Antar Jemput Bandara', desc: 'Layanan drop-off atau pick-up bandara Soekarno-Hatta, Ahmad Yani, dsb.' }
            ].map((service, idx) => (
              <motion.div 
                whileHover={{ y: -10 }}
                key={idx} 
                className="p-10 rounded-[2.5rem] bg-slate-50 hover:bg-primary hover:text-white transition-all duration-300 group"
              >
                <div className="bg-white w-14 h-14 rounded-2xl flex items-center justify-center mb-8 shadow-lg group-hover:bg-accent">
                  <service.icon className="text-primary group-hover:text-white w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                <p className="text-slate-500 group-hover:text-slate-300 leading-relaxed">{service.desc}</p>
                <button 
                  onClick={() => handleServiceClick(service.title)} 
                  className="mt-8 flex items-center font-bold text-sm group-hover:text-accent cursor-pointer"
                >
                  Lihat Detail <ChevronRight className="ml-2 w-4 h-4" />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Fleet Showcase */}
      <section id="fleet" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <h2 className="text-4xl font-bold text-primary mb-4">Daftar Armada Kami</h2>
              <p className="text-slate-500">Pilih mobil yang paling sesuai dengan gaya dan kebutuhan anda.</p>
            </div>
            <div className="flex space-x-2">
              {['Semua', 'MPV', 'SUV', 'Luxury'].map((cat) => (
                <button 
                  key={cat} 
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${activeCategory === cat ? 'bg-primary text-white' : 'bg-white text-slate-600 hover:bg-slate-100'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredFleet.map((car) => (
              <motion.div 
                layout
                key={car.id} 
                className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-100 group"
              >
                <div className="h-64 overflow-hidden relative">
                  <img src={car.image} alt={car.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-bold text-primary uppercase">
                    {car.type}
                  </div>
                </div>
                <div className="p-8">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="text-2xl font-bold text-primary mb-1">{car.name}</h3>
                      <div className="flex items-center space-x-4 text-slate-400 text-sm">
                        <span className="flex items-center"><Users className="w-4 h-4 mr-1" /> {car.seats} Kursi</span>
                        <span className="flex items-center"><Settings className="w-4 h-4 mr-1" /> {car.transmission}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-accent font-bold text-xl">{car.price}</p>
                      <p className="text-[10px] text-slate-400 uppercase font-bold">Per Hari</p>
                    </div>
                  </div>
                  <a 
                    href={`https://wa.me/62895385246738?text=Halo%20Tegal%20Trans,%20saya%20ingin%20sewa%20mobil%20${car.name}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-full bg-primary text-white py-4 rounded-2xl font-bold text-center block hover:opacity-90 transition-opacity"
                  >
                    Sewa Sekarang
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats/Why Us Section */}
      <section id="about" className="py-24 bg-primary text-white overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-96 h-96 bg-accent rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold mb-8 leading-tight">Keunggulan Utama <br /> Tegal Trans</h2>
              <div className="space-y-8">
                {[
                  { icon: Clock, title: 'Pelayanan 24 Jam', desc: 'Kami selalu stand-by untuk membantu kebutuhan rental anda kapanpun.' },
                  { icon: ShieldCheck, title: 'Armada Terbaru & Terawat', desc: 'Setiap unit selalu dalam kondisi prima dan bersih untuk menjamin kenyamanan anda.' },
                  { icon: Star, title: 'Harga Kompetitif', desc: 'Dapatkan penawaran terbaik mulai dari Rp 300rb-an per hari.' }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-6">
                    <div className="bg-accent/20 w-12 h-12 rounded-xl flex shrink-0 items-center justify-center">
                      <item.icon className="text-accent w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold mb-2">{item.title}</h4>
                      <p className="text-slate-400 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4 pt-12">
                <div className="bg-white/5 p-8 rounded-3xl border border-white/10 backdrop-blur-sm">
                  <p className="text-5xl font-bold text-accent">50+</p>
                  <p className="text-slate-400 mt-2 font-medium">Unit Armada</p>
                </div>
                <div className="bg-white/5 p-8 rounded-3xl border border-white/10 backdrop-blur-sm">
                  <p className="text-5xl font-bold text-accent">1K+</p>
                  <p className="text-slate-400 mt-2 font-medium">Review Bintang 5</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-white/5 p-8 rounded-3xl border border-white/10 backdrop-blur-sm">
                  <p className="text-5xl font-bold text-accent">10</p>
                  <p className="text-slate-400 mt-2 font-medium">Tahun Pengalaman</p>
                </div>
                <div className="bg-white/5 p-8 rounded-3xl border border-white/10 backdrop-blur-sm">
                  <p className="text-5xl font-bold text-accent">24/7</p>
                  <p className="text-slate-400 mt-2 font-medium">Quick Support</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Steps */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary mb-4">Cara Pemesanan</h2>
            <p className="text-slate-500">Hanya 3 langkah mudah untuk memulai perjalanan anda.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 text-center relative">
            <div className="hidden lg:block absolute top-[20%] left-[25%] right-[25%] border-t-2 border-dashed border-slate-200 -z-10" />
            
            {[
              { step: '01', title: 'Pilih Mobil', desc: 'Pilih armada yang anda inginkan dari katalog kami.' },
              { step: '02', title: 'Verifikasi Data', desc: 'Kirimkan kelengkapan data (SIM/KTP) melalui WhatsApp.' },
              { step: '03', title: 'Mobil Diantar', desc: 'Unit kami antarkan ke lokasi atau jemput pelanggan.' }
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <div className="w-16 h-16 bg-primary text-white rounded-2xl flex items-center justify-center text-xl font-bold mb-6 shadow-xl shadow-primary/20">
                  {item.step}
                </div>
                <h4 className="text-xl font-bold text-primary mb-2">{item.title}</h4>
                <p className="text-slate-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-white rounded-[3rem] overflow-hidden shadow-2xl flex flex-col lg:flex-row">
            <div className="lg:w-1/2 p-12 lg:p-20 bg-primary text-white">
              <h2 className="text-4xl font-bold mb-6">Siap Berkeliling Tegal?</h2>
              <p className="text-slate-400 text-lg mb-12">
                Jangan ragu untuk bertanya mengenai rute, ketersediaan unit, atau penawaran harga khusus untuk sewa bulanan/mingguan.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                    <Phone className="w-5 h-5 text-accent" />
                  </div>
                  <span>+62 895-3852-46738</span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-accent" />
                  </div>
                  <span>Jl. Sultan Agung No. 123, Kota Tegal</span>
                </div>
              </div>

              <div className="mt-16 flex space-x-4">
                {['Instagram', 'Facebook', 'Twitter'].map((social) => (
                  <div key={social} className="w-12 h-12 bg-white/5 border border-white/10 rounded-full flex items-center justify-center hover:bg-accent hover:text-primary transition-all cursor-pointer">
                    <span className="sr-only">{social}</span>
                    <CarIcon className="w-5 h-5" />
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:w-1/2 p-12 lg:p-20">
              <h3 className="text-2xl font-bold text-primary mb-8">Kirim Pesan</h3>
              <form className="space-y-6" onSubmit={handleContactSubmit}>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase">Nama Lengkap</label>
                    <input 
                      type="text" 
                      className="w-full bg-slate-50 border-none rounded-xl p-4 focus:ring-2 focus:ring-accent outline-none" 
                      placeholder="Masukkan nama..." 
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase">Nomor Telepon</label>
                    <input 
                      type="tel" 
                      className="w-full bg-slate-50 border-none rounded-xl p-4 focus:ring-2 focus:ring-accent outline-none" 
                      placeholder="Contoh: 0812..." 
                      value={contactPhone}
                      onChange={(e) => {
                        const numericValue = e.target.value.replace(/\D/g, '');
                        setContactPhone(numericValue);
                      }}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase">Tipe Mobil</label>
                  <select 
                    className="w-full bg-slate-50 border-none rounded-xl p-4 focus:ring-2 focus:ring-accent outline-none appearance-none"
                    value={contactCar}
                    onChange={(e) => setContactCar(e.target.value)}
                  >
                    <option>Pilih Armada</option>
                    {FLEET.map(c => <option key={c.id}>{c.name}</option>)}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase">Kebutuhan</label>
                  <textarea 
                    className="w-full bg-slate-50 border-none rounded-xl p-4 focus:ring-2 focus:ring-accent outline-none min-h-[120px]" 
                    placeholder="Beritahu kami kebutuhan anda..."
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    required
                  ></textarea>
                </div>
                <button type="submit" className="w-full bg-accent text-white py-4 rounded-xl font-bold shadow-lg shadow-accent/20 hover:scale-[1.02] transition-transform">
                  Kirim Pesan Sekarang
                </button>
              </form>
            </div>
          </div>

          {/* Google Maps Embed */}
          <div className="mt-12 w-full h-[400px] rounded-[3rem] overflow-hidden shadow-xl border border-slate-200">
            <iframe 
              title="Lokasi Tegal Trans"
              src="https://maps.google.com/maps?q=Jl.%20Kolonel%20Sugiono%20No.39,%20Tegal&t=&z=15&ie=UTF8&iwloc=&output=embed"
              className="w-full h-full"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white pt-24 pb-12 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 lg:col-span-1">
              <div className="flex items-center space-x-2 mb-6">
                <div className="bg-primary p-2 rounded-lg text-white">
                  <CarIcon className="w-5 h-5" />
                </div>
                <span className="text-xl font-black font-display tracking-tight">TEGAL<span className="text-accent">TRANS</span></span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                Jasa rental mobil profesional dan terpercaya di Tegal dengan armada terlengkap dan pelayanan terbaik sejak 2014.
              </p>
            </div>

            <div>
              <h5 className="font-bold text-primary mb-6">Tautan Cepat</h5>
              <ul className="space-y-4 text-sm text-slate-500">
                <li><a href="#" className="hover:text-accent transition-colors">Beranda</a></li>
                <li><a href="#fleet" className="hover:text-accent transition-colors">Armada</a></li>
                <li><a href="#services" className="hover:text-accent transition-colors">Layanan</a></li>
                <li><a href="#about" className="hover:text-accent transition-colors">Tentang Kami</a></li>
              </ul>
            </div>

            <div>
              <h5 className="font-bold text-primary mb-6">Armada Favorit</h5>
              <ul className="space-y-4 text-sm text-slate-500">
                <li>Toyota Avanza</li>
                <li>Toyota Innova Reborn</li>
                <li>Mitsubishi Xpander</li>
                <li>Toyota Fortuner</li>
                <li>Toyota Alphard</li>
              </ul>
            </div>

            <div>
              <h5 className="font-bold text-primary mb-6">Kantor Pusat</h5>
              <ul className="space-y-4 text-sm text-slate-500">
                <li className="flex items-start">
                  <MapPin className="w-4 h-4 mr-3 text-accent shrink-0 mt-0.5" />
                  <span>Jl. Kolonel Sugiono No.39, RT.01/RW.01, Kemandungan, Kec. Tegal Bar., Kota Tegal, Jawa Tengah 52114</span>
                </li>
                <li className="flex items-center">
                  <Phone className="w-4 h-4 mr-3 text-accent shrink-0" />
                  <span>+62 895 3852 46738</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-12 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-sm text-slate-400">
              © {new Date().getFullYear()} Tegal Trans. All rights reserved.
            </p>
            <div className="flex space-x-8 text-xs font-bold text-slate-400 uppercase tracking-widest">
              <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
