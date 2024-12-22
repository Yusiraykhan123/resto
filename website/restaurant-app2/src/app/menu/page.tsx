// app/menu/page.tsx
import React from 'react';
import {MenuDisplay} from '../../components/MenuDisplay'; // Mengimpor MenuDisplay dari components

export default function MenuPage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Menu</h1>
      <MenuDisplay /> {/* Menampilkan MenuDisplay */}
    </div>
  );
}
