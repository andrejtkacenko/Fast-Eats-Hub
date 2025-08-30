import type { Metadata } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Toaster } from '@/components/ui/toaster';
import { CartProvider } from '@/hooks/use-cart';
import { AuthProvider } from '@/hooks/use-auth';
import { Inter } from 'next/font/google';
import { PointsProvider } from '@/hooks/use-points';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });


export const metadata: Metadata = {
  title: 'Fast Eats Hub',
  description: 'Modern and convenient fast food restaurant with a focus on delivery.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-body antialiased",
          inter.variable,
        )}
      >
        <AuthProvider>
          <CartProvider>
            <PointsProvider>
              <div className="relative flex min-h-screen flex-col">
                  <Header />
                  <main className="flex-1">{children}</main>
                  <Footer />
              </div>
              <Toaster />
            </PointsProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
