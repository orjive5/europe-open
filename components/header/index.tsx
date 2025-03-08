'use client'

import Image from "next/image";
import Link from "next/link";
import { ModeToggle } from "../modeToggle";
import { Separator } from "@/components/ui/separator";
import { NavMenu } from "../navMenu";
import SideDrawer from "../sideDrawer";

const Header = () => {

  return (
    <header className="flex w-full justify-between items-center">
      <Link href="/" className="flex items-center gap-5">
        <div className="relative w-12 h-12 sm:w-16 sm:h-16">
          <Image
            src="/europe-logo.png"
            alt="Europe Open logo"
            priority={true}
            fill
            sizes="(min-width: 640px) 64px, 48px"
            className="object-cover box-border overflow-hidden"
          />
        </div>
        <div className="flex flex-col h-full justify-center">
          <h1 className="font-bold text-base sm:text-xl">
            Europe Open
          </h1>
          <Separator className="hidden sm:block" />
          <p className="hidden sm:block font-medium">
            Online Music Competition
          </p>
        </div>
      </Link>
      <NavMenu />
      <div className="hidden lg:inline-flex">
        <ModeToggle />
      </div>
      <SideDrawer />
    </header>
  );
};

export default Header;