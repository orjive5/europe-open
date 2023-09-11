"use client"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import Image from "next/image";
import Link from "next/link";

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

export function NavMenu() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        {/* <NavigationMenuItem>
          <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href="/"
                  >
                    <div className="mb-2 mt-4 text-lg font-medium">
                      shadcn/ui
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      Beautifully designed components built with Radix UI and
                      Tailwind CSS.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <ListItem href="/docs" title="Introduction">
                Re-usable components built using Radix UI and Tailwind CSS.
              </ListItem>
              <ListItem href="/docs/installation" title="Installation">
                How to install dependencies and structure your app.
              </ListItem>
              <ListItem href="/docs/primitives/typography" title="Typography">
                Styles for headings, paragraphs, lists...etc
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem> */}
        {/* <NavigationMenuItem>
          <NavigationMenuTrigger>Competition 2</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {competition.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem> */}
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
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href="/"
                  >
                      <Image
                          src="/europe-logo.png"
                          alt="Europe Open logo"
                          width={64}
                          height={64}
                          className="object-cover box-border overflow-hidden"
                      />
                    <div className="mb-2 mt-4 text-lg font-medium">
                      Europe Open
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      Online Music Competition
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
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
      </NavigationMenuList>
    </NavigationMenu>
  )
}

const ListItem = (({ title, href, description }: { title: string, href: string, description: string }) => {
  return (
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
  )
})