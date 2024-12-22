'use client';

import React, { useState, useEffect } from 'react';
import { fetchTestimonials, submitTestimonial } from '../services/api';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Star } from 'lucide-react';

// Mendefinisikan Tipe Testimonial
interface Testimonial {
  id?: number;
  name: string;
  email: string;
  phone_number: string | null;
  rating: number;
  text: string;
  image?: string | null;
}

export const TestimonialDisplay: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [newTestimonial, setNewTestimonial] = useState<Omit<Testimonial, 'id' | 'image'>>({
    name: '',
    email: '',
    phone_number: '',
    rating: 0,
    text: '',
  });
  const [image, setImage] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const loadTestimonials = async () => {
      try {
        const data = await fetchTestimonials();
        setTestimonials(data);
      } catch (err) {
        setError('Gagal memuat testimonial. Silakan coba lagi nanti.');
      } finally {
        setIsLoading(false);
      }
    };

    loadTestimonials();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewTestimonial(prev => ({ ...prev, [name]: value }));
  };

  const handleRatingChange = (rating: number) => {
    setNewTestimonial(prev => ({ ...prev, rating }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && !file.type.startsWith('image/')) {
      toast({
        title: "Error",
        description: "File yang diunggah harus berupa gambar.",
        variant: "destructive",
      });
      return;
    }
    setImage(file || null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const testimonialData = {
      ...newTestimonial,
      image: image, // Menambahkan gambar jika ada
    };

    try {
      const submittedTestimonial = await submitTestimonial(testimonialData);
      setTestimonials(prev => [submittedTestimonial, ...prev]);
      setNewTestimonial({ name: '', email: '', phone_number: '', rating: 0, text: '' });
      setImage(null);
      toast({
        title: "Berhasil",
        description: "Testimonial Anda telah berhasil dikirim!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Gagal mengirim testimonial. Silakan coba lagi nanti.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) return <div className="text-center py-10">Memuat testimonial...</div>;
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-3xl font-bold text-center">Testimonial</CardTitle>
        <CardDescription className="text-center">Apa kata pelanggan kami</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6 mb-6">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="border-b pb-4 last:border-b-0">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold">{testimonial.name}</h3>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-5 h-5 ${star <= testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
              </div>
              {testimonial.image ? (
                <img
                  src={`https://yoloverse.pythonanywhere.com${testimonial.image}`}  // Menambahkan base URL API
                  alt={`${testimonial.name}'s testimonial`}
                  className="w-16 h-16 rounded-full object-cover mb-2"
                />
              ) : (
                <img
                  src="/placeholder-image.jpg"  // Gambar placeholder jika tidak ada gambar
                  alt="Testimonial placeholder"
                  className="w-16 h-16 rounded-full object-cover mb-2"
                />
              )}
              <p className="text-sm text-gray-600">{testimonial.text}</p>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="text"
            name="name"
            placeholder="Nama Anda"
            value={newTestimonial.name}
            onChange={handleChange}
            required
          />
          <Input
            type="email"
            name="email"
            placeholder="Email Anda"
            value={newTestimonial.email}
            onChange={handleChange}
            required
          />
          <Input
            type="tel"
            name="phone_number"
            placeholder="Nomor Telepon Anda"
            value={newTestimonial.phone_number || ''}
            onChange={handleChange}
          />
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium">Rating:</span>
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-6 h-6 cursor-pointer ${star <= newTestimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                onClick={() => handleRatingChange(star)}
              />
            ))}
          </div>
          <Textarea
            name="text"
            placeholder="Testimonial Anda"
            value={newTestimonial.text}
            onChange={handleChange}
            required
          />
          <Input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
          />
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Mengirim...' : 'Kirim Testimonial'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
