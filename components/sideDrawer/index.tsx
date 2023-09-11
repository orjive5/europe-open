import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { drawerPages } from "@/constants/drawerPages"
import { Menu } from "lucide-react"
import Link from "next/link"
import { Separator } from "../ui/separator"

const SideDrawer = () => {

    return (
        <div className="block lg:hidden">
            <Sheet>
                <SheetTrigger>
                    <Menu />
                </SheetTrigger>
                <SheetContent className="w-[200px] sm:w-[300px]">
                    <SheetHeader>
                        <SheetTitle>
                            Europe Open
                        </SheetTitle>
                        <Separator />
                        <SheetDescription>
                            {drawerPages.map(eu => (
                                    <Link
                                        href={eu.href}
                                        className="block select-none space-y-1 rounded-md leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                    >
                                        <SheetTrigger className="w-full p-3">
                                            <p className="sm:text-start w-full text-sm font-medium leading-none">
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
