import { Button } from "../ui/button";
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useBoundStore } from "@/store";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormDescription, FormLabel } from "../ui/form";
import { CARD_NUMBER } from "./constants";
import { schema } from "./form/schema";
import { FormValues } from "./form/types";
import { FormErrorMessage } from "../ui/form-error-message";
import { PaymentProofDropzone } from "./components/PaymentProofDropzone";
import { generateParticipant } from "@/lib/generateSanityDoc";
import { useRouter } from "next/navigation";

const OtherPaymentOptions = () => {
    const router = useRouter();
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
            payment_proof: store.payment_proof && store.payment_proof,
        })
        router.push('/apply/success');
        store.setReadyToCheckout(false);
        store.setOpenCheckout(false);
    };

    const form = useForm<FormValues>({
        resolver: zodResolver(schema),
    });

    const store = useBoundStore();

    const product = {
        description: 'Europe Open participation fee',
        price: store.amount_to_pay
    }

    const onSubmit = (values: FormValues) => {
        store.setPaymentProof(values.payment_proof);
        handleApprove()
    }

    const handleCancel = () => {
        form.reset()
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <section className="w-full px-4 mb-4">
                    <Button className="w-full h-[55px] text-xl">
                        Other Payment Methods
                    </Button>
                </section>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle className="text-xl">Non SWIFT Payments</AlertDialogTitle>
                    <AlertDialogDescription className="text-foreground text-lg">
                        <p>
                            Transfer <span className="font-medium">{product.price} EUR</span> converted to your local currency to this card number (MIR):
                        </p>
                        <p className="font-medium text-semibold">
                            {CARD_NUMBER}
                        </p>
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <section className="flex justify-center items-center w-full">
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="w-full rounded space-y-8"
                        >
                            <Controller
                                control={form.control}
                                name="payment_proof"
                                render={({ field: { onChange, onBlur, value }, fieldState }) => (
                                    <section>
                                        <FormLabel className="text-lg">
                                            Payment Proof
                                            <span className="text-primary text-lg">*</span>
                                        </FormLabel>
                                        <PaymentProofDropzone
                                            onBlur={onBlur}
                                            onChange={onChange}
                                            value={value}
                                            form={form}
                                        />
                                        <FormDescription className="text-lg">
                                            Upload a screenshot of participation fee payment in order to send your application.
                                        </FormDescription>
                                        <FormErrorMessage fieldState={fieldState} />
                                    </section>
                                )}
                            />
                            <AlertDialogFooter className="text-lg">
                                <AlertDialogCancel onClick={handleCancel} className="text-lg">
                                    Cancel
                                </AlertDialogCancel>
                                <Button className="text-lg" type='submit'>
                                    Send Application
                                </Button>
                            </AlertDialogFooter>
                        </form>
                    </Form>
                </section>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default OtherPaymentOptions;
