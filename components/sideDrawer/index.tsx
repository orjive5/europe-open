import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"

import { Menu } from "lucide-react"
import Link from "next/link"
import { Separator } from "../ui/separator"

const SideDrawer = () => {

    const europeOpen : { title: string; href: string }[] = [
        {
            title: "Participants",
            href: "/participants",
        },
        {
            title: "Results",
            href: "/results",
        },
        {
            title: "Rules",
            href: "/rules",
        },
        {
            title: "Jury",
            href: "/jury",
        },
        {
            title: "About us",
            href: "/about",
        },
        {
            title: "FAQ",
            href: "/faq",
        },
        {
            title: "Contact",
            href: "/contact",
        },
        {
            title: "Apply",
            href: "/apply",
        },
    ];

    return (
        <div className="block lg:hidden">
            <Sheet>
                <SheetTrigger>
                    <Menu />
                </SheetTrigger>
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle>
                            Europe Open
                        </SheetTitle>
                        <Separator />
                        <SheetDescription>
                            {europeOpen.map(eu => (
                                <Link
                                    href={eu.href}
                                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                >
                                    <SheetTrigger>
                                        <p className="text-sm font-medium leading-none">
                                            {eu.title}
                                        </p>
                                    </SheetTrigger>
                                </Link>
                            ))}
                        </SheetDescription>
                    </SheetHeader>
                </SheetContent>
            </Sheet>
        </div>
    )
}

export default SideDrawer;
