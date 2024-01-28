//anything that is added here will appear on every page
import { Inter } from 'next/font/google'
import Head from 'next/head'
import './globals.css';
import './Home/home.css';
import Navbar from '@/components/Navbar/Navbar'
import SlideShow from '@/components/Carousel/Slideshow'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import Footer from '@/components/Footer/Footer'
config.autoAddCss = false

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'SEAC TOOL SHED',
  description: '', //need to add a description 
}

export default function RootLayout({ children }) {
  return (
     <>
      <Navbar/>
      <SlideShow/>
        <div className="homepage">
        <h2 className="headers">Browsing By Categories</h2>
        <div className="categories">
            <div className="cateogry"></div>
            <div className="cateogry"></div>
            <div className="cateogry"></div>
            <div className="cateogry"></div>
            <div className="cateogry"></div>
            <div className="cateogry"></div>
            <div className="cateogry"></div>
            <div className="cateogry"></div>
            <div className="cateogry"></div>
            <div className="cateogry"></div>
        </div>
        <h2> Popular Tools</h2>
        <div className="popular-container">
            <div className="popular-container">
                <div className="popular"></div>
                <div className="popular"></div>
                <div className="popular"></div>
                <div className="popular"></div>
                <div className="popular"></div>
            </div>
        </div>

        <h2>Browsing By Brands</h2>
        <div className="brands">
                <div className="brand"></div>
                <div className="brand"></div>
                <div className="brand"></div>
                <div className="brand"></div>
                <div className="brand"></div>
                <div className="brand"></div>
                <div className="brand"></div>
                <div className="brand"></div>
                <div className="brand"></div>
                <div className="brand"></div>
                <div className="brand"></div>
                <div className="brand"></div>
                <div className="brand"></div>
                <div className="brand"></div>
                <div className="brand"></div>
                <div className="brand"></div>
                <div className="brand"></div>
                <div className="brand"></div>
        </div>

    </div>
    <Footer/>
  </>
  )
}
