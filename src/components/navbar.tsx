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

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import Link from "next/link";
import { ThemeToggleButton } from "./ui/theme-toggle-button";
import { Button } from "./ui/button";
import ApiUrlDialog from "./api-url-dialog";

export default function Navbar() {
    return (
        <NavigationMenu className="min-w-full border-b border-input">
            <div className="container mx-auto flex items-center justify-between px-4 py-2">
                <NavigationMenuList>
                    <NavigationMenuItem className="py-2 mr-6 font-bold">
                        <Link href="/">Lingo Trainer</Link>
                    </NavigationMenuItem>
                </NavigationMenuList>
                <NavigationMenuList>
                    <NavigationMenuItem>
                        <ApiUrlDialog />
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <ThemeToggleButton />
                    </NavigationMenuItem>
                </NavigationMenuList>
            </div>
        </NavigationMenu>
    );
}
