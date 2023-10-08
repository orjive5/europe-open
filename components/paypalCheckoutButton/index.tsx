'use client'
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { useCallback, useState } from "react";
import { CreateOrderData, CreateOrderActions } from '@paypal/paypal-js'
import { useRouter } from "next/navigation";
import { useBoundStore } from "@/store";
import { generateParticipant } from "@/lib/generateSanityDoc";

const PaypalCheckoutButton = (props: any) => {
    const store = useBoundStore();
    const router = useRouter();
    const [{ isPending }] = usePayPalScriptReducer();
    const { product } = props;

    const [error, setError] = useState<null | string>(null);

    console.log('checkout');
    console.log('store.identity_documents', store.identity_documents)

    const handleApprove = (transactionId?: string) => {
        // Call backend function to fulfill order
        generateParticipant({
            discipline: store.discipline,
            category: store.category,
            name_and_surname: store.name_and_surname,
            date_of_birth: store.date_of_birth,
            teacher: store.teacher,
            accompanist: store.accompanist,
            conductor: store.conductor,
            collective_leader: store.collective_leader,
            country: store.country,
            country_code: store.country_code,
            place: store.place,
            institution: store.institution,
            program: store.program,
            teacher_email: store.teachers_email,
            participant_email: store.participants_email,
            video_link: store.video_link,
            poster_photo: store.avatar && store.avatar[0],
            identity_documents: store.identity_documents && store.identity_documents,
            biography: store.biography,
            diploma_by_postal_service: store.diploma_by_post,
            postal_address: store.postal_address && store.postal_address,
            transaction_id: transactionId,
        })
        // If response is success
        // Display success message, modal or even redirect 
        // user to the success page
        router.push('/apply/success');
        // Refresh user's account or subscription status
        store.setReadyToCheckout(false);
        store.setOpenCheckout(false);
        // if response is error
        // setError('Your payment was processed successfully. However, we are unable to fulfill your purchase. Please, contact us.')
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
                    const transactionId = order?.purchase_units?.[0]?.payments?.captures?.[0]?.id as string | undefined;
                    console.log("order", order)
                    handleApprove(transactionId)
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