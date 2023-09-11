'use client'

import Image from "next/image";
import Link from "next/link";
import { ModeToggle } from "../modeToggle";
import { Separator } from "@/components/ui/separator";
import { NavMenu } from "../navMenu";
import SideDrawer from "../sideDrawer";

const Header = () => {

  return (
    <header className="flex justify-between items-center px-4 sm:px-9">
      <Link href="/" className="flex items-center gap-5 py-7 px-9">
        <div className="relative w-12 h-12 sm:w-16 sm:h-16">
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
            <h1 className="font-semibold text-base sm:text-xl">
              Europe Open
            </h1>
            <Separator className="hidden sm:block" />
            <p className="hidden sm:block">
              online music competition
            </p>
        </div>
      </Link>
      <NavMenu />
      <ModeToggle />
      <SideDrawer />
    </header>
  );
};

export default Header;