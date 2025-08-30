
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
        <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white px-4">
          <h1 className="text-4xl md:text-6xl font-bold font-headline tracking-tight">
            Craving something delicious?
          </h1>
          <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto">
            Get your favorite meals delivered to your door, fast and fresh. Explore our menu and order now!
          </p>
          <Button asChild size="lg" className="mt-8 bg-accent text-accent-foreground hover:bg-accent/90">
             <Link href="#menu">Explore Menu</Link>
          </Button>
        </div>
      </section>
      
      <section id="menu" className="py-16">
        <Container>
          <MenuDisplay />
        </Container>
      </section>
    </>
  );
}
