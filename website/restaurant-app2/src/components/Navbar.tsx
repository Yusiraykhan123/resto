// components/Navbar.tsx
import React from 'react';
import Link from 'next/link'; // Menggunakan Link dari Next.js untuk routing

const Navbar: React.FC = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-white text-xl font-bold">
          Restoran Keluarga Solo
        </Link>
        <div className="flex space-x-6">
          <Link href="/menu" className="text-white">Menu</Link>
          <Link href="/opening-hours" className="text-white">Opening Hours</Link>
          <Link href="/faq" className="text-white">FAQ</Link>
          <Link href="/contact" className="text-white">Contact</Link>
          <Link href="/testimonials" className="text-white">Testimonials</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
