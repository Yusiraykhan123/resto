import { ContactFormData, Testimonial } from '../types';

const API_BASE_URL = 'https://yoloverse.pythonanywhere.com/api';

export const fetchMenu = async () => {
  const response = await fetch(`${API_BASE_URL}/menus/`);
  if (!response.ok) throw new Error('Failed to fetch menu');
  return response.json();
};

export const fetchProfile = async () => {
  const response = await fetch(`${API_BASE_URL}/profile/`);
  if (!response.ok) throw new Error('Failed to fetch profile');
  return response.json();
};

export const fetchOpeningHours = async () => {
  const response = await fetch(`${API_BASE_URL}/opening-hour/`);
  if (!response.ok) throw new Error('Failed to fetch opening hours');
  return response.json();
};

export const fetchFAQs = async () => {
  const response = await fetch(`${API_BASE_URL}/faq/`);
  if (!response.ok) throw new Error('Failed to fetch FAQs');
  return response.json();
};

export const submitContactForm = async (data: ContactFormData) => {
  const response = await fetch(`${API_BASE_URL}/contact/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to submit contact form');
  return response.json();
};

export const fetchTestimonials = async () => {
  const response = await fetch(`${API_BASE_URL}/contact/testimonials/`);
  if (!response.ok) throw new Error('Failed to fetch testimonials');
  return response.json();
};

// Submit Testimonial with image support
export const submitTestimonial = async (data: Omit<Testimonial, 'id'> & { image?: File | null }) => {
  const formData = new FormData();

  formData.append('name', data.name);
  formData.append('email', data.email);
  formData.append('phone_number', data.phone_number || '');
  formData.append('rating', String(data.rating));
  formData.append('text', data.text);

  if (data.image) {
    formData.append('image', data.image); // Add image file if exists
  }

  const response = await fetch(`${API_BASE_URL}/contact/testimonials/`, {
    method: 'POST',
    body: formData, // Use FormData instead of JSON
  });

  if (!response.ok) {
    console.error('Response error:', await response.text());
    throw new Error('Failed to submit testimonial');
  }

  return response.json();
};
