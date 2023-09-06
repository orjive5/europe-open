'use client'
import { generateCategory } from "@/utils/generateSanityDoc";

const Footer = () => {

  return (
    <div className="flex justify-center bg-secondaryBg px-9">
      <button onClick={() => generateCategory()}>
        generate category
      </button>
        <p className="py-7 px-9 responsive-base h-full flex items-center">
            &copy; 2023 Qualion. All rights reserved
        </p>
    </div>
  )
}

export default Footer;