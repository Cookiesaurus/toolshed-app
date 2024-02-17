import { Inter } from "next/font/google";
import Head from "next/head";
import "./globals.css";
import "./Home/home.css";
import Navbar from "@/components/Navbar/Navbar";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import Footer from "@/components/Footer/Footer";
config.autoAddCss = false;

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
        <Navbar />
        <main>{children}</main>
        <Footer />
        </body>
      </html>
    </>
  );
}
