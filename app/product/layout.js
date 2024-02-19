import Link from 'next/link';
import './product.css';
import ProductItem from '@/components/ProductItem/ProductItem';

export default function Layout({
    children, // will be a page or nested layout
  }) {
    let options = [];
    for (let i = 0; i < 5; i++) {
        options.push(<option value={i}>{i}</option>);
    }


    let relTools =[];
    for (let i = 0; i < 5; i++) {
        relTools.push(<div className="related-tools" key={i}></div>);
    }
    return (
      <>
        <div className='bread-crumb'>
            <p className='crumb-init'>
                <Link href={'/'}>SEAC Tool Shed /</Link>
            </p>
            <p className='crumb-init'>
                <Link href={'/'}>Tool Category /</Link>
            </p>
            <p className='crumb-init'>
                <Link href={'/'}>Sub Category/</Link>
            </p>
            <p className='crumb-extra'>Product</p>
        </div>
        <ProductItem/>
      </>
    )
  }