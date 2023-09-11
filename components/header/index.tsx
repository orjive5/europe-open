'use client'

import { Page } from "@/types/page";
import Image from "next/image";
import Link from "next/link";
import { ModeToggle } from "../modeToggle";
import { Separator } from "@/components/ui/separator";
import { NavMenu } from "../navMenu";
import { Button } from "../ui/button";

const Header = ({pages}: {pages: Page[]}) => {

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
      <div className="flex">
        <Link href="/apply">
          <Button variant='outline'>
            Apply
          </Button>
        </Link>
        <NavMenu />
      </div>
      <ModeToggle />
      {/* <div className="flex items-center">
        {examplePages.map((page) => (
          <Link
            key={page}
            href={`/${page}`}
            className="py-7 px-9 responsive-base hover:bg-hoverBg h-full flex items-center"
          >
            {page}
          </Link>
        ))}
      </div> */}
      {/* pages from sanity */}
      {/* <div className="flex items-center">
        {pages.map((page) => (
          <Link
            key={page._id}
            href={`/${page.slug}`}
            className="py-7 px-9 responsive-base hover:bg-hoverBg h-full flex items-center"
          >
            {page.title}
          </Link>
        ))}
      </div> */}
    </header>
  );
};

export default Header;