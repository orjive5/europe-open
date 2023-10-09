import { CheckCircle } from 'lucide-react';
import {
    Card,
    CardDescription,
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
                    Payment Successful!
                </CardTitle>
                <CardDescription className='text-center'>
                    We've received your application and it is currently under review. 
                    <br />
                    Your video should be posted on the website within 48 hours. If not, please contact us immediately.
                </CardDescription>
            </CardHeader>
        </Card>
    </section>
  )
}

export default Success;