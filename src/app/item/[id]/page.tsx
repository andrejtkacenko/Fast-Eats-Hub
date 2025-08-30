
'use client';

import { menuData } from '@/lib/menu-data';
import { notFound } from 'next/navigation';
import { ItemDetails } from '@/components/item-details';
import type { MenuItemType } from '@/lib/types';
import { Container } from '@/components/container';

interface ItemPageProps {
  params: {
    id: string;
  };
}

export default function ItemPage({ params }: ItemPageProps) {
  const item: MenuItemType | undefined = menuData.find((i) => i.id === params.id);

  if (!item) {
    notFound();
  }

  return (
    <Container className="py-8">
      <ItemDetails item={item} />
    </Container>
  );
}
