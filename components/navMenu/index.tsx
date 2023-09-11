"use client"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { Button } from "../ui/button";

const competition : { title: string; href: string; description: string }[] = [
  {
    title: "Participants",
    href: "/participants",
    description: "Browse participants",
  },
  {
    title: "Jury",
    href: "/jury",
    description: "Browse jury",
  },
  {
    title: "Results",
    href: "/results",
    description: "Check results",
  },
  {
    title: "Rules",
    href: "/rules",
    description: "Competition rules",
  },
];

const about : { title: string; href: string; description: string }[] = [
  {
    title: "About us",
    href: "/about",
    description: "Learn more about our organization",
  },
  {
    title: "FAQ",
    href: "/faq",
    description: "Check out some frequently asked questions",
  },
  {
    title: "Contact",
    href: "/contact",
    description: "Contact us here",
  },
];

export const NavMenu = () => {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        {/* HOME */}
        <NavigationMenuItem>
          <Link href='/' legacyBehavior passHref>
            <NavigationMenuLink>
              <div className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                <p className="text-sm font-medium leading-none">
                  Home
                </p>
              </div>
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        {/* COMPETITION */}
        <NavigationMenuItem>
          <NavigationMenuTrigger>
            Competition
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              {competition.map(competition => (
                <ListItem
                  key={competition.title}
                  title={competition.title}
                  href={competition.href}
                  description={competition.description}
                />
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        {/* ABOUT */}
        <NavigationMenuItem>
          <NavigationMenuTrigger>
            About
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              {about.map(about => (
                  <ListItem
                    key={about.title}
                    title={about.title}
                    href={about.href}
                    description={about.description}
                  />
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        {/* APPLY */}
        <NavigationMenuItem>
          <Link href="/apply">
            <Button variant='outline'>
              Apply
            </Button>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

const ListItem = (({ title, href, description }: { title: string, href: string, description: string }) => {
  return (
    <li>
      <NavigationMenuItem asChild>
        <Link href={href} legacyBehavior passHref>
          <NavigationMenuLink>
            <div className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
              <div className="text-sm font-medium leading-none">
                {title}
              </div>
              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                {description}
              </p>
            </div>
          </NavigationMenuLink>
        </Link>
      </NavigationMenuItem>
    </li>
  )
})