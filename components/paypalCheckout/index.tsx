'use client'

import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import {  useState } from "react";
import PaypalCheckoutButton from "../paypalCheckoutButton";

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
 
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { toast } from "@/components/ui/use-toast"
import { Textarea } from "@/components/ui/textarea"
 
const FormSchema = z.object({
  diploma_by_post: z
    .boolean()
    .default(false),
  address: z
    .string()
    .optional()
}).refine(schema => {
    if (schema.diploma_by_post === false) return true
    if (schema.diploma_by_post === true && schema.address === undefined || schema.address === '') {
        return false;
    } else {
        return true
    }
}, { message: 'Please, provide your address.', path: ['address'] })

const PaypalCheckout = () => {

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
          diploma_by_post: false,
        },
    })
    
    function onSubmit(data: z.infer<typeof FormSchema>) {
        toast({
            title: "You submitted the following values:",
            description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                <code className="text-white">{JSON.stringify(data, null, 2)}</code>
            </pre>
            ),
        })
    }

    const product = {
        description: 'Europe Open participation fee',
        price: form.getValues('diploma_by_post') ? 40 : 30
    }

    const initialOptions = {
        clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID ?? '',
        currency: "EUR",
        intent: "capture",
    };

    return (
        <div className="z-0 w-full md:max-w-[750px] p-8 flex flex-col justify-center items-center border rounded gap-8">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                        control={form.control}
                        name="diploma_by_post"
                        render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                <FormControl>
                                    <Checkbox
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                    <FormLabel>
                                        Diploma by post (+10 eur)
                                    </FormLabel>
                                    <FormDescription>
                                        You will receive e-diploma by default.
                                        If you want to receive your diploma sent via postal service,
                                        there is an additional fee.
                                    </FormDescription>
                                </div>
                            </FormItem>
                        )}
                    />
                        <FormField
                            control={form.control}
                            name="address"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Address
                                </FormLabel>
                                <FormControl>
                                <Textarea
                                    placeholder="Enter your postal address"
                                    className="resize-none"
                                    {...field}
                                />
                                </FormControl>
                                <FormDescription>
                                    Please, provide exact, full postal address
                                    in your own language, or in English.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                    <Button type="submit">Submit</Button>
                </form>
            </Form>
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