// app/faq/page.tsx
import React from 'react';
import {FAQDisplay} from '../../components/FAQDisplay'; // Komponen FAQ

export default function FAQPage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">FAQ</h1>
      <FAQDisplay />
    </div>
  );
}
