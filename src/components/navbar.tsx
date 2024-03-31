"use client";

import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuViewport,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { ThemeToggleButton } from "./ui/theme-toggle-button";
import { Button } from "./ui/button";

export default function Navbar() {
    return (
        <NavigationMenu className="min-w-full bg-primary-foreground">
            <div className="container mx-auto flex items-center justify-between p-4">
                <NavigationMenuList>
                    <NavigationMenuItem>
                        <Button variant="outline" className="px-0">
                            <Link
                                href="/"
                                className={navigationMenuTriggerStyle()}
                            >
                                Lingo Trainer
                            </Link>
                        </Button>
                    </NavigationMenuItem>
                </NavigationMenuList>
                <NavigationMenuList className="flex items-center space-x-4">
                    {/* <NavigationMenuItem>
                        <Button variant="outline" className="px-0">
                            <Link
                                href="/docs"
                                className={navigationMenuTriggerStyle()}
                            >
                                Documentation
                            </Link>
                        </Button>
                    </NavigationMenuItem> */}
                    <NavigationMenuItem>
                        <ThemeToggleButton />
                    </NavigationMenuItem>
                </NavigationMenuList>
            </div>
        </NavigationMenu>
    );
}
