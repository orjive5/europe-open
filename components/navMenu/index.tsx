"use client"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { aboutPages } from "@/constants/aboutPages";
import { competitionPages } from "@/constants/competitionPages";
import { IListItem } from "@/types/listItem.interface";
import Link from "next/link";
import { Button } from "../ui/button";

export const NavMenu = () => {

  return (
    <NavigationMenu className="hidden lg:block">
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link href='/' legacyBehavior passHref>
            <NavigationMenuLink>
              <div className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                <p className="text-base font-medium leading-none">
                  Home
                </p>
              </div>
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>
            Competition
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              {competitionPages.map(competition => (
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
        <NavigationMenuItem>
          <NavigationMenuTrigger>
            About
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              {aboutPages.map(about => (
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
};

const ListItem = (({ title, href, description }: IListItem) => {
  return (
    <li>
      <NavigationMenuItem asChild>
        <Link href={href} legacyBehavior passHref>
          <NavigationMenuLink>
            <div className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
              <div className="text-base font-medium leading-none">
                {title}
              </div>
              <p className="line-clamp-2 text-base leading-snug text-muted-foreground">
                {description}
              </p>
            </div>
          </NavigationMenuLink>
        </Link>
      </NavigationMenuItem>
    </li>
  )
});