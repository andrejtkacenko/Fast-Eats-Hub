
"use client";

import { useState, useEffect, useRef, useMemo } from 'react';
import { MenuItemCard } from "@/components/menu-item-card";
import { menuData } from "@/lib/menu-data";
import { Ham, Pizza, GlassWater, CakeSlice, Coffee, Sandwich, Search } from 'lucide-react';
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';

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
  const [searchQuery, setSearchQuery] = useState('');
  const categoryRefs = useRef<(HTMLDivElement | null)[]>([]);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const filteredMenuData = useMemo(() => {
    if (!searchQuery) {
      return menuData;
    }
    return menuData.filter(item => 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const displayedCategories = useMemo(() => {
    const categoriesWithItems = categories.filter(category => 
        filteredMenuData.some(item => item.category === category.name)
    );
    if (categoriesWithItems.length === 0 && filteredMenuData.length > 0) {
        return categories;
    }
    return categoriesWithItems;
  }, [filteredMenuData]);


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
  }, [displayedCategories]);

  return (
    <div>
      <div className="sticky top-16 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-30 py-4 mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input 
              placeholder="Search menu..."
              className="pl-10 text-base"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          {displayedCategories.length > 0 && (
            <div className="overflow-x-auto pb-2 -mx-4 px-4">
              <div className="flex space-x-2 w-max">
                {displayedCategories.map((category) => (
                  <Button 
                    key={category.name} 
                    asChild 
                    variant={activeCategory === category.name && !searchQuery ? 'default' : 'ghost'} 
                    className="py-2 gap-2 h-auto"
                  >
                      <Link href={`#${category.name}`}>
                        <category.icon className="h-5 w-5"/>
                        <span className="whitespace-nowrap">{category.name}</span>
                      </Link>
                  </Button>
                ))}
              </div>
            </div>
          )}
      </div>
      
      <div className="space-y-12">
        {filteredMenuData.length > 0 ? (
          categories.map((category, index) => {
            const itemsInCategory = filteredMenuData.filter((item) => item.category === category.name);
            if (itemsInCategory.length === 0) {
              return null;
            }
            return (
              <div 
                key={category.name} 
                id={category.name} 
                className="scroll-mt-48"
                ref={el => categoryRefs.current[index] = el}
              >
                <h2 className="text-2xl md:text-3xl font-bold font-headline mb-6 flex items-center gap-3">
                    <category.icon className="h-7 w-7 md:h-8 md:w-8 text-primary"/>
                    {category.name}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                  {itemsInCategory.map((item) => (
                      <MenuItemCard key={item.id} item={item} />
                    ))}
                </div>
              </div>
            )
          })
        ) : (
          <div className="text-center py-16">
            <h3 className="text-2xl font-bold font-headline">No items found</h3>
            <p className="text-muted-foreground mt-2">Try adjusting your search query.</p>
          </div>
        )}
      </div>
    </div>
  );
}
