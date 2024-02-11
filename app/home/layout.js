import SlideShow from "@/components/Carousel/Slideshow";
export default function Layout({
    children, // will be a page or nested layout
  }) {
    return (
    <>
      <SlideShow/>
      {children}
    </>
    )
  }