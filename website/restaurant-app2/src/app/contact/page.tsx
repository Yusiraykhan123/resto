// app/contact/page.tsx
import React from 'react';
import {ContactForm} from '../../components/ContactForm'; // Komponen Contact Form

export default function ContactPage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Contact</h1>
      <ContactForm />
    </div>
  );
}
