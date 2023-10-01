'use client'
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import PaypalCheckoutButton from "../paypalCheckoutButton";

const PaypalCheckout = () => {
    const product = {
        description: 'Europe Open participation fee',
        price: 30
    }

    const initialOptions = {
        clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID ?? '',
        currency: "EUR",
        intent: "capture",
    };
    return (
        <div className="w-full lg:w-3/4 xl:w-2/3 p-8 flex justify-center items-center border rounded">
            <PayPalScriptProvider
                options={initialOptions}
            >
                <PaypalCheckoutButton product={product} />
            </PayPalScriptProvider>
        </div>
    );
}

export default PaypalCheckout;