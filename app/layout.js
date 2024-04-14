import { Inter } from 'next/font/google';
import './globals.css';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import Footer from '@/components/Footer/Footer';
config.autoAddCss = false
import { Metadata } from 'next';
import StyledComponentsRegistry from '@/lib/registry';
import Navbar from '@/components/Navbar/Navbar';
import NavbarMobile from '@/components/Navbar/NavbarMobile';
import { getSession } from "@/actions/actions";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "SEAC TOOL SHED",
  description: "" //need to add a description
};

let session = await getSession();
session = JSON.parse(JSON.stringify(session));

export default function RootLayout({ children }) {
  return (
    <>
      <html lang="en">
        <body>
          <NavbarMobile session={session} />
          <Navbar session={session} />
          <main>
            <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
          </main>
          <Footer />
        </body>
      </html>
    </>
  );
}