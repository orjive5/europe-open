'use client'

import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import PaypalCheckoutButton from "../paypalCheckoutButton";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { useBoundStore } from "@/store";

const CheckoutSheet = (
    {
        open, onOpenChange
    }: {
        open: boolean, onOpenChange: any
    }) => {

        const store = useBoundStore();

        const product = {
            description: 'Europe Open participation fee',
            price: store.amount_to_pay
        }
    
        const initialOptions = {
            clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID ?? '',
            currency: "EUR",
            intent: "capture",
        };
    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent className="flex justify-center items-center" side='bottom'>
                <div className="z-0 w-full md:max-w-[750px] max-h-[700px] p-8 flex flex-col justify-center items-center border rounded gap-8">
                    <section>
                        <h2>Summary</h2>
                        <p>Participation fee: 30 EUR</p>
                        <p>Total: {product.price} EUR</p>
                    </section>
                    <h2>
                        Choose your payment option:
                    </h2>
                    <PayPalScriptProvider
                        options={initialOptions}
                    >
                        <PaypalCheckoutButton product={product} />
                    </PayPalScriptProvider>
                </div>
            </SheetContent>
        </Sheet>
    )
}

export default CheckoutSheet;
