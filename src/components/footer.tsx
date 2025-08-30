
import React from "react";
import { UtensilsCrossed } from "lucide-react";
import { Container } from "./container";

export function Footer() {
  return (
    <footer className="py-6 md:px-8 md:py-0 border-t">
      <Container className="flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <div className="flex items-center space-x-2">
          <UtensilsCrossed className="h-6 w-6 text-primary" />
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            <span className="font-bold font-headline">Fast Eats Hub</span>. All rights reserved.
          </p>
        </div>
        <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
          &copy; {new Date().getFullYear()}
        </p>
      </Container>
    </footer>
  );
}
