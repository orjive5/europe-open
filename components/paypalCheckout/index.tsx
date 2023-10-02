'use client'

import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import {  useState } from "react";
import PaypalCheckoutButton from "../paypalCheckoutButton";

import { Checkbox } from "@/components/ui/checkbox"

const PaypalCheckout = () => {

    const [diplomaByPost, setDiplomaByPost] = useState(false)

    const product = {
        description: 'Europe Open participation fee',
        price: diplomaByPost ? 40 : 30
    }

    const initialOptions = {
        clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID ?? '',
        currency: "EUR",
        intent: "capture",
    };

    return (
        <div className="z-0 w-full md:max-w-[750px] p-8 flex flex-col justify-center items-center border rounded gap-8">
            <div className="items-top flex space-x-2">
                <Checkbox id="terms1"  checked={diplomaByPost}
                onCheckedChange={() => setDiplomaByPost(!diplomaByPost)}/>
                <div className="grid gap-1.5 leading-none">
                    <label
                    htmlFor="terms1"
                    className="font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        Diploma by post
                    </label>
                    <p className="text-muted-foreground">
                        You will receive e-diploma by default.
                        <br />
                        If you want to receive your diploma sent via postal service,
                        <br />
                        there is an additional fee.
                    </p>
                </div>
            </div>
            <h2>
                Amount to pay: {product.price} EUR
            </h2>
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