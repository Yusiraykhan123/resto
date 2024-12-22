// app/opening-hours/page.tsx
import React from 'react';
import {OpeningHours} from '../../components/OpeningHours'; // Komponen Opening Hours

export default function OpeningHoursPage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Opening Hours</h1>
      <OpeningHours />
    </div>
  );
}
