"use client"
import { useState } from "react";
const CreateNewUser = () => {
    const [showPasswords, setShowPasswords] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPasswords(prevState => !prevState);
  };

  return(
    <>
    <form>
        <h1>Create a new user</h1>
        <div className="top_right_side_all_content">
            <div className="accountInfo">
                <h2>Account</h2>
                <br/>
                <label htmlFor="password">Password</label>
                <input type={showPasswords ? "text" : "password"} name="password" id="password" required/>
                <br/>
                <label htmlFor="re-enter_password">Re-enter password</label>
                <br/>
                <input type={showPasswords ? "text" : "password"} name="re-enter password" id="re-enter_password" required/>
                <br/>
                <input className="checkbox" type="checkbox" id="show_passwords" name="show" value="show" onChange={togglePasswordVisibility}/>
                <label htmlFor="show"> Show passwords</label>
            </div>
            <div className="membershipInfo">
                <h2>Membership</h2>
                <label htmlFor="createDate">Member created (Date)</label>
                <br/>
                <input type="date" id="creation_date" name="createDate"/>
                <br/>
                <label htmlFor="memberID">Membership ID</label>
                <br/>
                <input id="membership_ID" name="memberID"/>
                <br/>
                <label htmlFor="memberType">Membership Type</label>
                <br/>
                <input id="membership_type" name="memberType"/>
                <br/>
                <label htmlFor="expiration">Expiration</label>
                <br/>
                <input type="date" id="expiration_date" name="expiration"/>
            </div>
            <div className="primaryInfo">
                <h2>Primary Info</h2>
                <label htmlFor="firstName">First Name</label>
                <br/>
                <input type="text" id="first_Name" name="firstName"/>
                <br/>
                <label htmlFor="lastName">Last Name</label>
                <br/>
                <input type="text" id="last_Name" name="lastName"/>
                <br/>
                <label htmlFor="email">Email</label>
                <br/>
                <input type="email" id="email" name="email"/>
                <br/>
                <label htmlFor="phone_number">Phone Number</label>
                <br/>
                <input type="tel" id="phone_number" name="phone number"/>
                <br/>
            </div>
            <div className="secondaryInfo">
                <h2>Secondary Info</h2>
                <label htmlFor="secondary_first_name">First Name</label>
                <br/>
                <input type="text" id="secondary_first_name" name="secondary-first-name"/>
                <br/>
                <label htmlFor="secondary_last_name">Last Name</label>
                <br/>
                <input type="text" id="secondary_last_name" name="secondary-last-name"/>
                <br/>
                <label htmlFor="secondary_email">Email</label>
                <br/>
                <input type="email" id="secondary_email" name="secondary-email"/>
                <br/>
                <label htmlFor="secondary_number">Phone Number</label>
                <br/>
                <input type="tel" id="secondary_number" name="secondary-number"/>
                <br/>
            </div>
        </div>
        <div className="bottom_right_side_all_content">
            <div className="additionalInfo">
                <h2>Additional Info</h2>
                <label htmlFor="gender">Gender</label>
                <br/>
                <input type="text" id="gender" name="gender"/>
                <br/>
                <label htmlFor="date_of_birth">Date of Bith</label>
                <br/>
                <input type="date" id="date_of_birth" name="date-of-birth"/>
                <br/>
                <label htmlFor="title">Title</label>
                <br/>
                <input type="text" id="title" name="title"/>
                <br/>
                <label htmlFor="organization">Organization</label>
                <br/>
                <input type="text" id="organization" name="organization"/>
                <br/>
            </div>
            <div className="address">
                <h2>Address</h2>
                <label htmlFor="street_address">Street Address</label>
                <br/>
                <input type="text" id="street_address" name="street-address"/>
                <br/>
                <label htmlFor="2nd_Line">Apt/Floor</label>
                <br/>
                <input type="text" id="2nd_Line" name="street-address-two"/>
                <br/>
                <label htmlFor="city">City</label>
                <br/>
                <input type="text" id="city" name="city"/>
                <br/>
                <label htmlFor="zip_code">ZIP code</label>
                <br/>
                <input type="text" id="zip_code" name="zipCode"/>
                <br/>
            </div>
        </div>
    </form>
    <button className="createNewUserButton" type="submit">Create Account</button>
    </>
)
  };
  
  export default CreateNewUser;
  