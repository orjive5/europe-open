import { ApplyForm } from "@/components/applyForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Europe Open | Apply',
}

const Apply = () => {

  return (
    <div className="flex flex-col gap-8 justify-center items-center">
        <h3 className="text-2xl font-semibold leading-none tracking-tight text-center">Apply</h3>
        <ApplyForm />
    </div>
  )
}

export default Apply;