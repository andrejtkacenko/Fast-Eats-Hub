
'use client';

import { menuData } from '@/lib/menu-data';
import { notFound, useParams } from 'next/navigation';
import { ItemDetails } from '@/components/item-details';
import type { MenuItemType } from '@/lib/types';
import { Container } from '@/components/container';
import React from 'react';

export default function ItemPage() {
  const params = useParams<{ id: string }>();
  const [item, setItem] = React.useState<MenuItemType | undefined>(undefined);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    if (params.id) {
      const foundItem = menuData.find((i) => i.id === params.id);
      if (!foundItem) {
        notFound();
      } else {
        setItem(foundItem);
      }
    }
    setLoading(false);
  }, [params.id]);

  if (loading) {
    return (
      <Container className="py-8">
        <p>Loading...</p>
      </Container>
    );
  }

  if (!item) {
    return notFound();
  }

  return (
    <Container className="py-8">
      <ItemDetails item={item} />
    </Container>
  );
}
