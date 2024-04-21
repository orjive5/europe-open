import { CheckCircle } from 'lucide-react';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Europe Open | Success',
}

const Success = () => {
  return (
    <section className='flex justify-center items-center'>
      <Card>
        <CardHeader className='flex flex-col gap-4 justify-center items-center'>
          <CheckCircle className='w-20 h-20 text-primary' />
          <CardTitle>
            Payment Successful!
          </CardTitle>
          <CardDescription className='text-center'>
            We've received your application and it is currently under review.
            <br />
            <span className='text-primary font-semibold underline'>
              Your video should be posted on the website within 48 hours. If it is not, please contact us immediately.
            </span>
          </CardDescription>
        </CardHeader>
      </Card>
    </section>
  )
}

export default Success;