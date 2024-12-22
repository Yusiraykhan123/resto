// app/testimonials/page.tsx
import React from 'react';
import {TestimonialDisplay} from '../../components/TestimonialDisplay'; // Komponen Testimonials

export default function TestimonialsPage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Testimonials</h1>
      <TestimonialDisplay />
    </div>
  );
}
