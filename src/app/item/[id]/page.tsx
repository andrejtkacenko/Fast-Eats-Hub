
import { menuData } from '@/lib/menu-data';
import { notFound } from 'next/navigation';
import { ItemDetails } from '@/components/item-details';
import type { MenuItemType } from '@/lib/types';

interface ItemPageProps {
  params: {
    id: string;
  };
}

// This is now a Server Component
export default function ItemPage({ params }: ItemPageProps) {
  const item: MenuItemType | undefined = menuData.find((i) => i.id === params.id);

  if (!item) {
    notFound();
  }

  // We pass the resolved item to the client component
  return <ItemDetails item={item} />;
}
