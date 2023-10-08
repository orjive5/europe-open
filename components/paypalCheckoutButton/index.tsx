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
    const [{ isPending, isRejected }] = usePayPalScriptReducer();
    const { product } = props;

    const [error, setError] = useState<null | string>(null);

    const handleApprove = (transactionId?: string) => {
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
        router.push('/apply/success');
        store.setReadyToCheckout(false);
        store.setOpenCheckout(false);
    };

    if (error) {
        alert(error)
    }

    return (
        <div className="flex-grow w-full">
            {
                isRejected ? 
                (<div className="w-full text-center flex justify-center items-center">
                    <h2>Something went wrong, please reload and try again.</h2>
                </div>) : null
            }
            {
                isPending ? 
                (<div className="w-full text-center flex justify-center items-center">
                    <span className="loader"></span>
                </div>) : null
            }
            {!isPending && 
                <h2 className="text-center mb-4">
                    Choose your payment option:
                </h2>
            }
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
                    handleApprove(transactionId)
                }}
                onError={(err) => {
                    setError('Something went wrong, please reload and try again.');
                }}
            />
        </div>
    )
}

export default PaypalCheckoutButton;