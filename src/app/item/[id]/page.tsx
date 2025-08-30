
'use client';

import { useState, useMemo } from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { menuData } from '@/lib/menu-data';
import { AddToCartButton } from '@/components/add-to-cart-button';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import type { CustomizationOptionChoice } from '@/lib/types';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Label } from '@/components/ui/label';


interface ItemPageProps {
  params: {
    id: string;
  };
}

type SelectedOptions = {
  [key: string]: string | string[];
};

export default function ItemPage({ params }: ItemPageProps) {
  const item = menuData.find((i) => i.id === params.id);

  const initialSelectedOptions = useMemo(() => {
    const initialOptions: SelectedOptions = {};
    if (item?.customizationOptions) {
      item.customizationOptions.forEach(option => {
        if (option.type === 'single' && option.choices.length > 0) {
          initialOptions[option.id] = option.choices[0].name;
        } else if (option.type === 'multiple') {
            initialOptions[option.id] = [];
        }
      });
    }
    return initialOptions;
  }, [item]);

  const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>(initialSelectedOptions);
  
  if (!item) {
    notFound();
  }

  const handleSingleChange = (optionId: string, choiceName: string) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [optionId]: choiceName,
    }));
  };

  const handleMultipleChange = (optionId: string, choiceName: string, checked: boolean) => {
    setSelectedOptions((prev) => {
        const currentChoices = (prev[optionId] as string[] | undefined) || [];
        if (checked) {
            return { ...prev, [optionId]: [...currentChoices, choiceName] };
        } else {
            return { ...prev, [optionId]: currentChoices.filter(c => c !== choiceName) };
        }
    });
  };

  const currentPrice = useMemo(() => {
    let price = item.price;
    if (item.customizationOptions) {
        for (const option of item.customizationOptions) {
            const selected = selectedOptions[option.id];
            if (selected) {
                if (option.type === 'single' && typeof selected === 'string') {
                    const choice = option.choices.find(c => c.name === selected);
                    if (choice) price += choice.priceModifier;
                } else if (option.type === 'multiple' && Array.isArray(selected)) {
                    for (const choiceName of selected) {
                        const choice = option.choices.find(c => c.name === choiceName);
                        if (choice) price += choice.priceModifier;
                    }
                }
            }
        }
    }
    return price;
  }, [item, selectedOptions]);

  const cartItem = {
    productId: item.id,
    name: item.name,
    image: item.image,
    price: currentPrice, // The final calculated price
    customizations: Object.entries(selectedOptions).flatMap(([optionId, value]) => {
      const option = item.customizationOptions?.find(o => o.id === optionId);
      if (!option) return [];
      if (Array.isArray(value)) {
        return value.map(choice => ({ option: option.name, choice }));
      }
      return { option: option.name, choice: value as string };
    })
  }

  const aiHint = item['data-ai-hint'] || 'food item';

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-12 items-start">
        <div className="relative w-full aspect-square rounded-lg overflow-hidden shadow-lg md:col-span-3">
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-cover"
            data-ai-hint={aiHint}
            sizes="(max-width: 768px) 100vw, 60vw"
          />
        </div>
        <div className="flex flex-col h-full max-h-[80vh] md:col-span-2">
          <h1 className="text-2xl md:text-3xl font-bold font-headline mb-2">{item.name}</h1>
          <p className="text-muted-foreground text-base mb-4">{item.description}</p>
          
          <div className="space-y-4 mb-4 flex-grow min-h-0">
              {item.customizationOptions && item.customizationOptions.map((option) => (
                <div key={option.id}>
                  {option.id !== 'size' && option.id !== 'crust' && <h3 className="text-md font-semibold mb-2">{option.name}</h3>}
                  {option.type === 'single' ? (
                    <div className="flex gap-2">
                      {option.choices.map((choice) => (
                        <Button
                            key={choice.name}
                            variant={selectedOptions[option.id] === choice.name ? 'default' : 'outline'}
                            onClick={() => handleSingleChange(option.id, choice.name)}
                            className="flex-grow"
                        >
                            {choice.name} 
                            {choice.priceModifier > 0 && ` (+$${choice.priceModifier.toFixed(2)})`}
                        </Button>
                      ))}
                    </div>
                  ) : (
                    <ScrollArea className="h-48 p-1">
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pr-4">
                        {option.choices.map((choice: CustomizationOptionChoice) => {
                          const isSelected = !!(selectedOptions[option.id] as string[])?.includes(choice.name);
                          return (
                            <Card 
                              key={choice.name} 
                              className={cn(
                                  "cursor-pointer transition-all",
                                  isSelected ? "ring-2 ring-primary" : "ring-0"
                              )}
                              onClick={() => handleMultipleChange(option.id, choice.name, !isSelected)}
                            >
                              <CardContent className="p-2 text-center flex flex-col h-full">
                                {choice.imageUrl && (
                                  <div className="relative w-full aspect-square mb-2">
                                    <Image src={choice.imageUrl} alt={choice.name} fill className="object-contain" sizes="10vw"/>
                                  </div>
                                )}
                                <div className="flex-grow flex flex-col justify-center">
                                  <Label htmlFor={`${option.id}-${choice.name}`} className="text-xs font-medium leading-tight cursor-pointer">
                                    {choice.name}
                                  </Label>
                                  <p className="text-xs text-muted-foreground mt-1">
                                    +${choice.priceModifier.toFixed(2)}
                                  </p>
                                </div>
                                <Checkbox 
                                  id={`${option.id}-${choice.name}`} 
                                  checked={isSelected}
                                  onCheckedChange={(checked) => handleMultipleChange(option.id, choice.name, !!checked)}
                                  className="sr-only"
                                />
                              </CardContent>
                            </Card>
                          )
                        })}
                      </div>
                    </ScrollArea>
                  )}
                </div>
              ))}
          </div>

          <div className="flex items-center justify-between mt-auto mb-4">
            <p className="text-2xl font-bold text-primary">${currentPrice.toFixed(2)}</p>
          </div>
          <AddToCartButton item={cartItem} />
        </div>
      </div>
    </div>
  );
}
