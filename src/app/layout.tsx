import type { Metadata } from "next";
import { Merriweather } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";

const merriweather = Merriweather({
    weight: ["300", "700", "900"],
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Lingo Trainer",
    description:
        "A simple Lingo Trainer front-end for the cisq1 final project.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={merriweather.className}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                >
                    {children}
                    <Toaster />
                </ThemeProvider>
            </body>
        </html>
    );
}
