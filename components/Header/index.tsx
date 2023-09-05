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
            <h1 className="responsive-heading font-extrabold font-nunito">Europe Open</h1>
            <p className="responsive-base text-secondaryTxt">online music competition</p>
        </div>
      </Link>
      <div className="flex items-center">
        {pages.map((page) => (
          <Link
            key={page._id}
            href={`/${page.slug}`}
            className="py-7 px-9 responsive-base hover:bg-hoverBg h-full flex items-center"
          >
            {page.title}
          </Link>
        ))}
      </div>
    </header>
  );
};

export default Header;