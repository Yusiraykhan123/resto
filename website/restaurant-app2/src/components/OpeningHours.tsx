'use client'

import React, { useState, useEffect } from 'react';
import { OpeningHour } from '../types';
import { fetchOpeningHours } from '../services/api';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const OpeningHours: React.FC = () => {
  const [hours, setHours] = useState<OpeningHour[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadOpeningHours = async () => {
      try {
        const data = await fetchOpeningHours();
        setHours(data);
      } catch (err) {
        setError('Failed to load opening hours. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    loadOpeningHours();
  }, []);

  if (isLoading) return <div className="text-center py-10">Loading opening hours...</div>;
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Opening Hours</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {hours.map((hour) => (
            <li key={hour.id} className="flex justify-between">
              <span className="font-semibold">{hour.day}</span>
              <span>{hour.opening_time} - {hour.closing_time}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

