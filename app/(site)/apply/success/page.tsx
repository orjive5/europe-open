import { CheckCircle } from 'lucide-react';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

const Success = () => {
  return (
    <section className='flex justify-center items-center'>
        <Card>
            <CardHeader className='flex flex-col gap-4 justify-center items-center'>
                <CheckCircle className='w-20 h-20 text-primary' />
                <CardTitle>
                    Thank you for your order!
                </CardTitle>
                <CardDescription className='text-center'>
                    <p>Please, check your email for order details.</p>
                    <p>If your video is not posted on the website within 48 hours, contact the organizer immediately.</p>
                </CardDescription>
            </CardHeader>
        </Card>
    </section>
  )
}

export default Success;