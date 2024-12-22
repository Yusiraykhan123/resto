export interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image_url: string;
}

export interface Profile {
  id: number;
  name: string;
  description: string;
  image: string;
}

export interface OpeningHour {
  id: number;
  day: string;
  opening_time: string;
  closing_time: string;
}

export interface FAQ {
  id: number;
  question: string;
  answer: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone_number: string;
  text: string;
}

export interface Testimonial {
  id: number;
  name: string;
  email: string;
  phone_number: string;
  rating: number;
  text: string;
  image: string;
}

