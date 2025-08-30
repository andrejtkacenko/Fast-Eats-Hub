
'use client';

import { useState, useMemo } from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { menuData } from '@/lib/menu-data';
import { AddToCartButton } from '@/components/add-to-cart-button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { CustomizationOptionChoice } from '@/lib/types';

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
  const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>({});
  
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
      return { option: option.name, choice: value };
    })
  }

  const aiHint = item['data-ai-hint'] || 'food item';

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-start">
        <div className="relative w-full aspect-square rounded-lg overflow-hidden shadow-lg">
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-cover"
            data-ai-hint={aiHint}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
        <div className="flex flex-col justify-center h-full">
          <h1 className="text-3xl md:text-4xl font-bold font-headline mb-4">{item.name}</h1>
          <p className="text-muted-foreground text-lg mb-6">{item.description}</p>
          
          {item.customizationOptions && item.customizationOptions.length > 0 && (
            <div className="space-y-6 mb-8">
              {item.customizationOptions.map((option) => (
                <div key={option.id} className="border-t pt-4">
                  <h3 className="text-lg font-semibold mb-2">{option.name}</h3>
                  {option.type === 'single' ? (
                    <RadioGroup 
                      onValueChange={(value) => handleSingleChange(option.id, value)}
                      defaultValue={option.choices[0]?.name}
                    >
                      {option.choices.map((choice) => (
                        <div key={choice.name} className="flex items-center space-x-2">
                          <RadioGroupItem value={choice.name} id={`${option.id}-${choice.name}`} />
                          <Label htmlFor={`${option.id}-${choice.name}`} className="flex-grow">
                            {choice.name} 
                            {choice.priceModifier > 0 && ` (+$${choice.priceModifier.toFixed(2)})`}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  ) : (
                    <div className="space-y-2">
                      {option.choices.map((choice) => (
                        <div key={choice.name} className="flex items-center space-x-2">
                          <Checkbox 
                            id={`${option.id}-${choice.name}`} 
                            onCheckedChange={(checked) => handleMultipleChange(option.id, choice.name, !!checked)}
                          />
                          <Label htmlFor={`${option.id}-${choice.name}`} className="flex-grow">
                             {choice.name} 
                            {choice.priceModifier > 0 && ` (+$${choice.priceModifier.toFixed(2)})`}
                          </Label>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          <div className="flex items-center justify-between mb-8">
            <p className="text-3xl font-bold text-primary">${currentPrice.toFixed(2)}</p>
          </div>
          <AddToCartButton item={cartItem} />
        </div>
      </div>
    </div>
  );
}
