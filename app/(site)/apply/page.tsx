import { ApplyForm } from "@/components/applyForm";
import PaypalCheckout from "@/components/paypalCheckout";

const Apply = () => {
  
  return (
    <div className="flex flex-col gap-8 justify-center items-center">
        <h1>Apply</h1>
        <ApplyForm />
        <PaypalCheckout />
    </div>
  )
}

export default Apply;