import Link from 'next/link';
import './product.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShop, faRotate, faFileLines } from '@fortawesome/free-solid-svg-icons';

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
            <p><Link href={'/'} className='crumb-init'>SEAC Tool Shed /</Link></p>
            <p className='crumb-init'><Link href={'/'} className='crumb-init'>Tool Category /</Link></p>
            <p className='crumb-init'><Link href={'/'} className='crumb-init'>Sub Category/</Link></p>
            <p className='crumb-extra'>Product</p>
        </div>
        <div className='product-cont'>
            <div className='product-left'>
                <div className='product-img'></div>
                <div className='subimg-cont'>
                    <div className='product-subimg'></div>
                    <div className='product-subimg'></div>
                    <div className='product-subimg'></div>
                    <div className='product-subimg'></div>
                </div>
            </div>
            <div className='product-right'>
                <h2>Product Name</h2>
                <p className='product-description'>The product or tool information will go here.</p>

                <p className='product-price'>$$Price goes here$$</p>
                <div className='product-quantity'>
                    <form className='quanity-form' onChange={null}>
                        <select name="quantity" id="quantity">
                            {options}
                        </select>
                        <br/><br/>
                        <button type="submit" className='rent'> Rent </button>
                    </form>
                </div>
                <div className='product-info'>
                    <div className='info-left'>
                        <p><FontAwesomeIcon icon={faShop} style={{color: '#6C757D', marginRight: '10px'}}/>Location: </p>
                        <p><FontAwesomeIcon icon={faFileLines} style={{color: '#6C757D', marginRight: '14px'}}/>Condition: </p>
                        <p><FontAwesomeIcon icon={faRotate} style={{color: '#6C757D', marginRight: '10px'}}/>Return Info: </p>
                    </div>
                    <div className='info-right'>
                        <p className='sub-info'>Main Location </p>
                        <p className='sub-info'> Info</p>
                        <p className='sub-info'> Info</p>
                    </div>
                </div>
            </div>
        </div>
        <h3> Related Tools</h3>
        <div className='related-cont'>
            {relTools}
        </div>
        {/* Have to add in the children param so that the components from the page appear within the layout */}
      </>
    )
  }