'use client'

import React, { useState, useEffect } from 'react';
import { MenuItem } from '../types/menu';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";

export const MenuDisplay: React.FC = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await fetch('https://yoloverse.pythonanywhere.com/api/menus/');
        if (!response.ok) {
          throw new Error('Failed to fetch menu items');
        }
        const data: MenuItem[] = await response.json();
        setMenuItems(data);
        const uniqueCategories = Array.from(new Set(data.map(item => item.category)));
        setCategories(uniqueCategories);
      } catch (err) {
        setError('Failed to load menu items. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchMenuItems();
  }, []);

  if (isLoading) {
    return <div className="text-center py-10">Loading menu items...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">{error}</div>;
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-3xl font-bold text-center">Our Menu</CardTitle>
        <CardDescription className="text-center">Explore our delicious offerings</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue={categories[0]} className="w-full">
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-5">
            {categories.map((category) => (
              <TabsTrigger key={category} value={category}>
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
          {categories.map((category) => (
            <TabsContent key={category} value={category}>
              <ScrollArea className="h-[500px] w-full rounded-md border p-4">
                {menuItems
                  .filter(item => item.category === category)
                  .map((item) => (
                    <div key={item.id} className="mb-6 last:mb-0">
                      <div className="flex items-center gap-4">
                        <img 
                          src={item.image_url} 
                          alt={item.name} 
                          className="w-24 h-24 object-cover rounded-md"
                        />
                        <div>
                          <h3 className="text-lg font-semibold">{item.name}</h3>
                          <p className="text-sm text-gray-600">{item.description}</p>
                          <p className="text-sm font-bold mt-1">${item.price.toFixed(2)}</p>
                        </div>
                      </div>
                    </div>
                  ))}
              </ScrollArea>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
};

