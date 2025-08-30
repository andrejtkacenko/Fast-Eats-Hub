import { menuData } from "@/lib/menu-data";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { AddToCartButton } from "@/components/add-to-cart-button";

interface ItemPageProps {
    params: {
        id: string;
    }
}

export default function ItemPage({ params }: ItemPageProps) {
    const item = menuData.find(i => i.id === params.id);

    if (!item) {
        notFound();
    }
    
    const aiHint = item['data-ai-hint'] || "food item";

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
                    <div className="flex items-center justify-between mb-8">
                        <p className="text-3xl font-bold text-primary">${item.price.toFixed(2)}</p>
                    </div>
                    <AddToCartButton item={item} />
                </div>
            </div>
        </div>
    );
}
