
import { OrderStatusTracker } from "@/components/order-status-tracker";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Container } from "@/components/container";

interface OrderPageProps {
  params: {
    id: string;
  };
}

export default function OrderPage({ params }: OrderPageProps) {
  return (
    <Container className="py-12">
        <Card className="max-w-3xl mx-auto">
            <CardHeader className="text-center">
                <CardTitle className="text-3xl font-bold font-headline">Thank you for your order!</CardTitle>
                <CardDescription className="text-lg">
                    Your order <span className="font-semibold text-primary">#{params.id}</span> is being processed.
                </CardDescription>
            </CardHeader>
            <CardContent className="mt-8">
                <OrderStatusTracker />
            </CardContent>
        </Card>
    </Container>
  );
}
