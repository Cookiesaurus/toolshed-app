import SlideShow from "@/components/Carousel/Slideshow";
import Link from "next/link";
import Image from "next/image";
import dewalt from "./public/images/dewalt.png"
import makita from "./public/images/makita.png"
import milwaukee from "./public/images/milwaukee.png"
import blackanddecker from "./public/images/blackdecker.png"
import bosch from "./public/images/bosch.png"
import craftsman from "./public/images/craftsman.png"
import rigid from "./public/images/rigid.png"
import ryobi from "./public/images/ryobi.png"
import husky from "./public/images/husky.jpeg"
import stanley from "./public/images/stanley.png"
import hitachi from "./public/images/hitachi.png"
import genesis from "./public/images/genesis.png"

export default function Page() {
  const categories = ['Crafting', 'Drill Extension', 'Drywall Tools', 'Electrical', 'Flooring', 'Masonry', 'Misc', 'Painting',
                        'Plumbing', 'Roofing', 'Saw Blades', 'Welding', 'Woodworking']

  return (
    <>
    <div className="slide-container">
      <div className="categories">
      {categories.map(category => (
        <>
          <div className="category-link">
            <Link href={'/'} key={category}>{category}</Link>
            <Link href={'/'} className="cat-arrow" tabIndex={-1}> &#10095;</Link>
          </div>
        </>
        ))}
      </div>
        <div className="slide-show">
          <SlideShow/>
        </div>
    </div>
    <div className="homepage">
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
    <div className="button-center">
      <button type="submit" tabIndex={-1}> <Link href={'/inventory'} className="home-button">View All Tools</Link></button>
    </div>

    <h2>Browsing By Brands</h2>
    <div className="brands">
            <div className="brand">
              <Link href={'/Categories'} className="brandimage-container">
                <Image src={dewalt} alt="Tool Brand Image" width={150} height={50}/>
              </Link>
            </div>
            <div className="brand">
            <Link href={'/Categories'} className="brandimage-container">
                <Image src={makita} alt="Tool Brand Image" width={150} height={50}/>
              </Link>
            </div>
            <div className="brand">
            <Link href={'/Categories'} className="brandimage-container">
                <Image src={milwaukee} alt="Tool Brand Image" width={150} height={50}/>
              </Link>
            </div>
            <div className="brand">
            <Link href={'/Categories'} className="brandimage-container">
                <Image src={blackanddecker} alt="Tool Brand Image" width={150} height={50}/>
              </Link>
            </div>
            <div className="brand">
            <Link href={'/Categories'} className="brandimage-container">
                <Image src={bosch} alt="Tool Brand Image" sizes={"(max-width: 100%)"} width={150} height={30} />
              </Link>
            </div>
            <div className="brand">
            <Link href={'/Categories'} className="brandimage-container">
                <Image src={craftsman} alt="Tool Brand Image" sizes={"(max-width: 100%)"} width={150} height={30} />
              </Link>
            </div>
            <div className="brand">
            <Link href={'/Categories'} className="brandimage-container">
                <Image src={rigid} alt="Tool Brand Image" sizes={"(max-width: 100%)"} width={150} height={30} />
              </Link>
            </div>
            <div className="brand">
            <Link href={'/Categories'} className="brandimage-container">
                <Image src={ryobi} alt="Tool Brand Image" sizes={"(max-width: 100%)"} width={150} height={30} />
              </Link>
            </div>
            <div className="brand">
            <Link href={'/Categories'} className="brandimage-container">
                <Image src={husky} alt="Tool Brand Image" sizes={"(max-width: 100%)"} width={150} height={30} />
              </Link>
            </div>
            <div className="brand">
            <Link href={'/Categories'} className="brandimage-container">
                <Image src={stanley} alt="Tool Brand Image" sizes={"(max-width: 100%)"} width={150} height={30} />
              </Link>
            </div>
            <div className="brand">
            <Link href={'/Categories'} className="brandimage-container">
                <Image src={hitachi} alt="Tool Brand Image" sizes={"(max-width: 100%)"} width={150} height={30} />
              </Link>
            </div>
            <div className="brand">
            <Link href={'/Categories'} className="brandimage-container">
                <Image src={genesis} alt="Tool Brand Image" sizes={"(max-width: 100%)"} width={150} height={30} />
              </Link>
            </div>

    </div>

</div></>
  )
}
