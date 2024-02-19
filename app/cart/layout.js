import Link from "next/link";
import './cart.css';
import Image from "next/image";
import logo from '.././public/images/toolshed_logo.png';
export default function Layout({
    children, // will be a page or nested layout
  }) {
    return (
      <>
      <div className='bread-crumb'>
        <p><Link href={'/'} className='crumb-init'>SEAC Tool Shed /</Link></p><p className='crumb-extra'>Cart</p>
      </div>

        <div className="cart-cont">
        <table className="white">
          <thead className="white">
            <tr className="white">
              <th className="white">Product</th>
              <th className="white">Type</th>
              <th className="white">Quantity</th>
              <th className="white">Duration</th>
            </tr>
          </thead>
          <tbody className="white">
            <tr className="white">
              <td className="white"> <Image src={logo} width={50} height={50} alt="logo"></Image> Product Description</td>
              <td className="white">Pickup</td>
              <td className="white">
                <select id="quantity" className="white">
                  <option value="one">1</option>
                  <option value="two">2</option>
                  <option value="three">3</option>
                  <option value="four">4</option>
                </select>
              </td>
              <td className="white">--</td>
            </tr>
            <tr className="white">
            <td className="white"><Image src={logo} width={50} height={50} alt="logo"></Image> Product Description</td>
              <td className="white">Pickup</td>
              <td className="white">
                <select id="quantity" className="white">
                  <option value="one">1</option>
                  <option value="two">2</option>
                  <option value="three">3</option>
                  <option value="four">4</option>
                </select>
              </td>
              <td className="white">20 Days</td>
            </tr>
          </tbody>
        </table>
        </div>

        <div className="return-cont">
          <button type="submit"><Link className="return" href={'/inventory'}>Return To Shop</Link></button>
        </div>

        <div className="giftcard-entry">
          <div className="gift-card">
            <input type="text" placeholder="Giftcard" id="gift-card"></input>
            <button type="submit"> <Link className="apply-gift" href={'/Inventory'}>Apply Gift Card</Link></button>
          </div>
              <div className="cart-total">
              <p>Cart total</p>

              <div className="cart-items">
                <p>Pickup Items</p>
                <p>1</p>
              </div>
              <div className="cart-items">
                <p>Reserved Items</p>
                <p>1</p>
              </div>
              <div className="cart-items">
                <p>Total: </p>
                <p>2 items</p>
              </div>
              <br/>
              <br/>
              <button type="submit"> <Link className="apply-gift" href={'/checkout'}>Proceed to checkout</Link></button>

            </div>
        </div>
        {/* Have to add in the children param so that the components from the page appear within the layout */}
      </>
    )
  }