import { ApplyForm } from "@/components/applyForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Europe Open | Apply',
}

const Apply = () => {

  return (
    <div className="flex flex-col gap-8 justify-center items-center">
        <h1>Apply</h1>
        <ApplyForm />
    </div>
  )
}

export default Apply;