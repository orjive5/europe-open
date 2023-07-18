import { Page } from "@/types/page";
import Image from "next/image";
import Link from "next/link";

const Header = ({pages}: {pages: Page[]}) => {

  return (
    <header className="flex justify-between bg-secondaryBg px-9">
      <Link href="/" className="flex items-center gap-5 py-7 px-9">
        <Image
            src="/qualion-logo.png"
            alt="Logo"
            width="64"
            height="64"
        />
        <div className="flex flex-col h-full justify-center">
            <h1 className="text-2xl font-extrabold font-nunito">QUALION</h1>
            <p className="text-base text-secondaryTxt">bleeding-edge science, tech, and AI news</p>
        </div>
      </Link>
      <div className="flex items-center">
        {pages.map((page) => (
          <Link
            key={page._id}
            href={`/${page.slug}`}
            className="py-7 px-9 text-base hover:bg-hoverBg h-full flex items-center"
          >
            {page.title}
          </Link>
        ))}
      </div>
    </header>
  );
};

export default Header;