
import { MenuDisplay } from "@/components/menu-display";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { Container } from '@/components/container';

export default function Home() {
  return (
    <>
      <section id="menu" className="py-16">
        <Container>
          <MenuDisplay />
        </Container>
      </section>
    </>
  );
}
