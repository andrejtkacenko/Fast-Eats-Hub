import { MenuDisplay } from "@/components/menu-display";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <section className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold font-headline tracking-tight text-primary">
          Craving something delicious?
        </h1>
        <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto text-muted-foreground">
          Get your favorite meals delivered to your door, fast and fresh. Explore our menu and order now!
        </p>
      </section>
      
      <MenuDisplay />
    </div>
  );
}
