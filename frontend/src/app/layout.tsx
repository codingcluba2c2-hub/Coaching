import type { Metadata } from "next";
import "./globals.css";
import { DemoProvider } from "@/providers/DemoProvider";
import { ToastContainer } from "@/components/ui/ToastContainer";

export const metadata: Metadata = {
  title: "Edupath — Best Online Courses & Learning Platform",
  description:
    "Discover a world of knowledge and opportunities with Edupath online education platform. Pursue a new career, learn in-demand skills, and get certified.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#faf9fd] text-slate-900 antialiased selection:bg-purple-600 selection:text-white">
        <DemoProvider>
          {children}
          <ToastContainer />
        </DemoProvider>
      </body>
    </html>
  );
}
