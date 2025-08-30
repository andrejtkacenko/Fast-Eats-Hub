
import { MenuDisplay } from "@/components/menu-display";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { Container } from '@/components/container';

export default function Home() {
  return (
    <>
      <section className="relative h-[60vh] w-full">
        <Image
          src="https://picsum.photos/1920/1080"
          alt="Delicious food"
          fill
          className="object-cover"
          data-ai-hint="delicious food"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
      </section>
      
      <section id="menu" className="py-16">
        <Container>
          <MenuDisplay />
        </Container>
      </section>
    </>
  );
}
