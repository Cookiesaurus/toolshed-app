// import Link from "next/link";
// import './checkout.css';
// import Image from "next/image";
// import visa from '../public/images/visa.png'
// import { formHandler } from "@/lib/actions/formHandler";
// export default function Layout({
//     children, // will be a page or nested layout
//   }) {
//     return (
//     <>
//         <div className='bread-crumb'>
//         <p className='crumb-init'>
//           <Link href={'/'}>SEAC Tool Shed /</Link>
//         </p>
//         <p className='crumb-extra'>Check out</p>
//       </div>
//       <h1 id="billing">Billing Details</h1>

//       <div className="checkout-container">
//           <div className="billing-form">
//             <form action={formHandler} className="billing-info">
//                 <label htmlFor="billing-firstName" >First Name</label>
//                 <input className="input" required id="billing-firstName" name="first-name"/>

                
//                 <label htmlFor="billing-company" >Company Name</label>
//                 <input className="input" id="billing-company" name="company-name"/>
                
//                 <label htmlFor="billing-addressOne" >Address Line One</label>
//                 <input className="input" required id="billing-addressOne" name="addressLineOne"/>
                
//                 <label htmlFor="billing-streetAddress" >Address Line Two</label>
//                 <input className="input" id="billing-addressTwo" name="addressLineTwo"/>

//                 <label htmlFor="billing-addressTown" >Town/City</label>
//                 <input className="input" required id="billing-addressTown" name="addressTown"/>
                
//                 <label htmlFor="billing-email" >Email</label>
//                 <input className="input" required type="email" id="billing-email" name="billing-email"/>
                
//                 <label htmlFor="billing-phoneNumber" >Phone number</label>
//                 <input className="input" type="email" required id="billing-phoneNumber" name="number"/>

//                 <div className="save-info">
//                   <label htmlFor='save-billInfo' className='checkbox-container' >
//                       Save this address for future check-out
//                   <input type="checkbox" className='checkbox' id='save-billInfo' name="save"/>
//                   <span className="checkmark"></span>
//                 </label>
//                 </div>
//             </form>
//           </div> 
//           <div className="checkout-info">
//           <div className="checkout-total">
//               <div className="cart-items">
//                 <p>Pickup Items</p>
//                 <p></p>
//               </div>
//               <div className="cart-items">
//                 <p>Item One</p>
//                 <p></p>
//               </div>
//               <div className="cart-items">
//                 <p>Total: </p>
//                 <p>items</p>
//               </div>
//               <br/>
//               <br/>
//             </div>
//             <form className="checkout-form" action={formHandler}>
//                 <div className="billing">
//                     <div className="billing-options">
//                       <div className="credit-debit">
//                         <input type="radio" id="billing-card" name="billing-option"/>
//                         <label htmlFor="billing-card">Credit/Debit</label>
//                       </div>
//                       <div className="cash">
//                         <input type="radio" id="billing-cash" name="billing-option"/>
//                         <label htmlFor="billing-cash">Cash on pickup</label>
//                       </div>
//                     </div>
//                   </div>
//               <div className="place-order">
//                 <button type="submit" id="place-order">Place Order</button>
//               </div>
//             </form>
//           </div> 
//       </div>
//     </>
//     )
//   }