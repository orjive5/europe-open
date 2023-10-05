'use client'

import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import PaypalCheckoutButton from "../paypalCheckoutButton";
import {
    Sheet,
    SheetContent,
} from "@/components/ui/sheet"
import { useBoundStore } from "@/store";
import { Separator } from "../ui/separator";

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
            clientId: `${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}&vault=true` ?? '',
            currency: "EUR",
            intent: "capture",
        };
    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent className="flex justify-center items-center" side='bottom'>
                <div className="z-0 w-full md:max-w-[750px] max-h-[700px] flex flex-col justify-center items-center gap-8">
                    <section className="flex flex-col gap-2 text-center">
                        <h2 className="text-xl font-medium">
                            Summary
                        </h2>
                        <Separator />
                        <div>
                            <p>Participation fee: <span className="font-medium">30 EUR</span></p>
                            {
                                store.diploma_by_post && (
                                <p>
                                    Diploma by post: <span className="font-medium">10 EUR</span>
                                </p>
                                )
                            }
                        </div>
                        <Separator />
                        <p className="font-medium">Total: {product.price} EUR</p>
                    </section>
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
