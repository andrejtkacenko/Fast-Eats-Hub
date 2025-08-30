import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MenuItemCard } from "@/components/menu-item-card";
import { menuData } from "@/lib/menu-data";
import { Ham, Pizza, GlassWater, CakeSlice } from 'lucide-react';

const categories = [
  { name: 'Burgers', icon: Ham },
  { name: 'Pizzas', icon: Pizza },
  { name: 'Sides', icon: CakeSlice },
  { name: 'Drinks', icon: GlassWater },
];

export function MenuDisplay() {
  return (
    <Tabs defaultValue="Burgers" className="w-full">
      <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 h-auto">
        {categories.map((category) => (
          <TabsTrigger key={category.name} value={category.name} className="py-2 gap-2">
            <category.icon className="h-5 w-5"/>
            {category.name}
          </TabsTrigger>
        ))}
      </TabsList>
      {categories.map((category) => (
        <TabsContent key={category.name} value={category.name}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
            {menuData
              .filter((item) => item.category === category.name)
              .map((item) => (
                <MenuItemCard key={item.id} item={item} />
              ))}
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
}
