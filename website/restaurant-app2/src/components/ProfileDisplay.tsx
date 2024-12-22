'use client'

import React, { useState, useEffect } from 'react';
import { fetchProfile } from '../services/api';  // Pastikan fetchProfile sesuai dengan implementasi Anda
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const ProfileDisplay: React.FC = () => {
  const [profile, setProfile] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await fetchProfile();
        console.log("Profile data:", data);  // Log data untuk debugging
        setProfile(data[0]);  // Mengambil data pertama (karena respons API berupa array)
      } catch (err) {
        setError('Failed to load profile. Please try again later.');
        console.error("Error fetching profile:", err);
      } finally {
        setIsLoading(false);
      }
    };

    loadProfile();
  }, []);  // Hanya dijalankan sekali saat komponen pertama kali di-render

  if (isLoading) return <div className="text-center py-10">Loading profile...</div>;
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;
  if (!profile) return null;  // Jika tidak ada data profil, tidak ditampilkan apapun

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-3xl font-bold text-center">{profile.name}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        {profile.logo && (  // Memastikan logo ada sebelum ditampilkan
          <img 
            src={profile.logo} 
            alt={profile.name} 
            className="w-48 h-48 rounded-full object-cover mb-4" 
          />
        )}
        <CardDescription className="text-center">{profile.about_us}</CardDescription>

        {/* Menampilkan alamat, telepon, dan email */}
        <div className="mt-4 text-center">
          <p><strong>Address:</strong> {profile.address}</p>
          <p><strong>Phone:</strong> {profile.phone}</p>
          <p><strong>Email:</strong> <a href={`mailto:${profile.email}`} className="text-blue-500">{profile.email}</a></p>
        </div>

        {/* Menampilkan media sosial */}
        <div className="mt-4 text-center">
          <p><strong>Follow us:</strong></p>
          <div className="flex justify-center space-x-4">
            {profile.facebook && (
              <a href={profile.facebook} target="_blank" rel="noopener noreferrer" className="text-blue-600">
                Facebook
              </a>
            )}
            {profile.instagram && (
              <a href={profile.instagram} target="_blank" rel="noopener noreferrer" className="text-purple-600">
                Instagram
              </a>
            )}
            {profile.twitter && (
              <a href={profile.twitter} target="_blank" rel="noopener noreferrer" className="text-blue-400">
                Twitter
              </a>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
