// src/app/layout.tsx

import React from 'react';
import '../styles/globals.css';  // Pastikan path ini benar
import { Metadata } from 'next'; // opsional, untuk metadata halaman
import Navbar from '../components/Navbar';  // Impor Navbar

export const metadata: Metadata = {
  title: 'Restoran Keluarga Solo',
  description: 'Website Restoran Keluarga Solo',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar /> {/* Pastikan Navbar dipanggil di sini */}
        <main>{children}</main> {/* Render konten halaman yang sedang aktif */}
      </body>
    </html>
  );
}
