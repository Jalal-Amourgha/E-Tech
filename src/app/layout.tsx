import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Nav from "../components/Nav";
import Footer from "@/components/Footer";
import { AppWrapper } from "@/context";
import AuthProvider from "./Providers";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "E-Tech",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <link rel="icon" href="./favicon.ico" sizes="any" />
      <body className={inter.className}>
        <AuthProvider>
          <AppWrapper>
            <Nav />
            {children}
            <Footer />
          </AppWrapper>
        </AuthProvider>
      </body>
    </html>
  );
}
