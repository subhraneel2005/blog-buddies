import type { Metadata } from "next";
import "./globals.css";
import SessionProviderWrapper from "@/providers/SessionProviderWrapper"
import { ThemeProvider } from "@/providers/theme-provider";
import DotPattern from "@/components/ui/dot-pattern";
import Navbar from "@/components/ui/base/Navbar";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "Blog Buddies",
  description: "OpenSource minimalist and distraction free blogging platform for developers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SessionProviderWrapper>
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="relative min-h-screen select-none">
              <DotPattern className="fixed inset-0 pointer-events-none" />
                <div className="relative z-10">
                  <Navbar />
                  <Toaster richColors position="top-right" />
                  {children}
                </div>
            </div>
        </ThemeProvider>
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
