
"use client";

import { useState, useEffect, useRef } from 'react';
import { MenuItemCard } from "@/components/menu-item-card";
import { menuData } from "@/lib/menu-data";
import { Ham, Pizza, GlassWater, CakeSlice, Coffee, Sandwich } from 'lucide-react';
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from '@/lib/utils';

const categories = [
  { name: 'Burgers', icon: Ham },
  { name: 'Pizzas', icon: Pizza },
  { name: 'Breakfast', icon: Coffee },
  { name: 'Snacks', icon: Sandwich },
  { name: 'Sides', icon: CakeSlice },
  { name: 'Drinks', icon: GlassWater },
];

export function MenuDisplay() {
  const [activeCategory, setActiveCategory] = useState<string>('Burgers');
  const categoryRefs = useRef<(HTMLDivElement | null)[]>([]);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const intersectingEntry = entries.find(entry => entry.isIntersecting);
        if (intersectingEntry) {
            setActiveCategory(intersectingEntry.target.id);
        }
      },
      { 
        rootMargin: "-50% 0px -50% 0px",
        threshold: 0,
      }
    );

    const currentRefs = categoryRefs.current;
    currentRefs.forEach((ref) => {
      if (ref) {
        observerRef.current?.observe(ref);
      }
    });

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  return (
    <div className="w-full">
      <div className="sticky top-16 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-30 py-4 mb-6">
          <div className="grid w-full grid-cols-2 md:grid-cols-6 h-auto gap-2">
            {categories.map((category) => (
              <Button 
                key={category.name} 
                asChild 
                variant={activeCategory === category.name ? 'default' : 'ghost'} 
                className="py-2 gap-2 h-auto justify-start"
              >
                  <Link href={`#${category.name}`}>
                    <category.icon className="h-5 w-5"/>
                    {category.name}
                  </Link>
              </Button>
            ))}
          </div>
      </div>
      
      <div className="space-y-12">
        {categories.map((category, index) => (
          <div 
            key={category.name} 
            id={category.name} 
            className="scroll-mt-32"
            ref={el => categoryRefs.current[index] = el}
          >
            <h2 className="text-3xl font-bold font-headline mb-6 flex items-center gap-3">
                <category.icon className="h-8 w-8 text-primary"/>
                {category.name}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {menuData
                .filter((item) => item.category === category.name)
                .map((item) => (
                  <MenuItemCard key={item.id} item={item} />
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
