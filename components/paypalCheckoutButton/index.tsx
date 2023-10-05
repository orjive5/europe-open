'use client'
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { useCallback, useState } from "react";
import { CreateOrderData, CreateOrderActions } from '@paypal/paypal-js'
import { useRouter } from "next/navigation";
import { useBoundStore } from "@/store";

const PaypalCheckoutButton = (props: any) => {
    const store = useBoundStore();
    const router = useRouter();
    const [{ isPending }] = usePayPalScriptReducer();
    const { product } = props;

    const [error, setError] = useState<null | string>(null);

    const handleApprove = (orderId: string) => {
        // Call backend function to fulfill order
        
        // If response is success
        // Display success message, modal or even redirect 
        // user to the success page
        router.push('/apply/success');
        // Refresh user's account or subscription status
        store.setReadyToCheckout(false);
        store.setOpenCheckout(false);
        // if response is error
        setError('Your payment was processed successfully. However, we are unable to fulfill your purchase. Please, contact us.')
    };

    if (error) {
        // Display error message, modal or redirect
        // user to the error page
        alert(error)
    }

    return (
        <div className="flex-grow w-full">
            {
                isPending ? 
                (<div className="w-full text-center flex justify-center items-center">
                    <span className="loader"></span>
                </div>) : null
            }
            {!isPending && <h2 className="text-center mb-4">
                Choose your payment option:
            </h2>}
            <PayPalButtons
                className="p-4 bg-white rounded"
                createOrder={useCallback((data: CreateOrderData, actions: CreateOrderActions) => {
                    return actions.order
                        .create({
                            purchase_units: [
                                {
                                    description: product.description,
                                    amount: {
                                        value: product.price
                                    }
                                }
                            ]
                        })
                }, [product.price])}
                forceReRender={[product.price]}
                onApprove={async (data, actions) => {
                    const order = await actions.order?.capture();
                    console.log("order", order)
                    handleApprove(data.orderID)
                }}
                onCancel={() => {
                    // Display the cancel message, modal or redirect
                    // user to cancel page or back to cart
                }}
                onError={(err) => {
                    setError('Something went wrong!');
                }}
            />
        </div>
    )
}

export default PaypalCheckoutButton;