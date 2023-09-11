'use client'

import Image from "next/image";
import Link from "next/link";
import { ModeToggle } from "../modeToggle";
import { Separator } from "@/components/ui/separator";
import { NavMenu } from "../navMenu";

const Header = () => {

  return (
    <header className="flex justify-between items-center px-9">
      <Link href="/" className="flex items-center gap-5 py-7 px-9">
        <div className="relative w-16 h-16">
          <Image
              src="/europe-logo.png"
              alt="Europe Open logo"
              priority={true}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover box-border overflow-hidden"
          />
        </div>
        <div className="flex flex-col h-full justify-center">
            <h1 className="font-semibold text-xl">
              Europe Open
            </h1>
            <Separator />
            <p className="">
              online music competition
            </p>
        </div>
      </Link>
      <NavMenu />
      <ModeToggle />
    </header>
  );
};

export default Header;