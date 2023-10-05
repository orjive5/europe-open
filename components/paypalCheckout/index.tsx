'use client'

import { useBoundStore } from "@/store";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import PaypalCheckoutButton from "../paypalCheckoutButton";


const PaypalCheckout = () => {

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
        <div className="z-0 w-full md:max-w-[750px] p-8 flex flex-col justify-center items-center border rounded gap-8">
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
    );
}

export default PaypalCheckout;