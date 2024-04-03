import { Inter } from 'next/font/google';
import Head from 'next/head';
import './globals.css';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import Footer from '@/components/Footer/Footer';
config.autoAddCss = false
import { Metadata } from 'next';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "SEAC TOOL SHED",
  description: "" //need to add a description
};

export default function RootLayout({ children }) {
  return (
    <>
      <html lang="en">
        <body>
        <main>{children}</main>
        <Footer />
        </body>
      </html>
    </>
  );
}
