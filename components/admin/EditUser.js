'use client'
import { useState } from "react";
//Using the create new user component, just need to pass in data from the query
const EditUser = ({ customerInfo }) => {
  console.log(customerInfo);
  const [showPasswords, setShowPasswords] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPasswords((prevState) => !prevState);
  };

  const formatDateForInput = () => {
    let dateString = customerInfo.DOB
    const date = new Date(dateString); // Convert the date string to a Date object
    const year = date.getFullYear(); // Get the year
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Get the month (adding 1 because month starts from 0) and pad with leading zero if necessary
    const day = String(date.getDate()).padStart(2, '0'); // Get the day of the month and pad with leading zero if necessary

    // Format the date as 'YYYY-MM-DD', which is suitable for the value attribute of a date input
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
}


return (
  <>
    <form>
      <h1>Edit User</h1>
      <div className="new-user-cont">
        <div className="new-user-left">
          <div className="accountInfo">
            <h2>Account</h2>

            <label htmlFor="password">Password</label>
            <input
              type={showPasswords ? "text" : "password"}
              name="password"
              id="password"
              required
            />
            <label htmlFor="re-enter_password">Re-enter password</label>
            <input
              type={showPasswords ? "text" : "password"}
              name="re-enter password"
              id="re-enter_password"
              required
            />
            <input
              className="checkbox"
              type="checkbox"
              id="show-passwords"
              name="show-passwords"
              value="show"
              onChange={togglePasswordVisibility}
            />
            <label htmlFor="show"> Show passwords</label>
            <div className="primaryInfo">
              <h2>Primary Info</h2>
              <label htmlFor="first_Name">First Name</label>
              <input type="text" id="first_Name" name="firstName" defaultValue={customerInfo.First_Name} />

              <label htmlFor="last_Name">Last Name</label>
              <input type="text" id="last_Name" name="lastName" defaultValue={customerInfo.Last_Name} />

              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" defaultValue={customerInfo.Email}/>

              <label htmlFor="phone_number">Phone Number</label>
              <input type="tel" id="phone_number" name="phone number" defaultValue={customerInfo.Phone_Number} />

              <label htmlFor="gender">Gender</label>
              <input type="text" id="gender" name="gender" defaultValue={customerInfo.Gender_Name}/>

              <label htmlFor="date_of_birth">Date of Bith</label>
              <input type="date" id="date_of_birth" name="date-of-birth" value={formatDateForInput()} />

              <label htmlFor="title">Title</label>
              <input type="text" id="title" name="title" defaultValue={customerInfo.Title} />

              <label htmlFor="organization">Organization</label>
              <input type="text" id="organization" name="organization" defaultValue={customerInfo.Organization_Name}/>

              <label htmlFor="street_address">Street Address</label>
              <input type="text" id="street_address" name="street-address" defaultValue={customerInfo.Address_Line1}/>

              <label htmlFor="2nd_Line">Apt/Floor</label>
              <input type="text" id="2nd_Line" name="street-address-two" defaultValue={customerInfo.Address_Line2}/>

              <label htmlFor="city">City</label>
              <input type="text" id="city" name="city" defaultValue={customerInfo.City} />

              <label htmlFor="zip_code">ZIP code</label>
              <input type="text" id="zip_code" name="zipCode" defaultValue={customerInfo.Postal_Code} />
            </div>
          </div>
        </div>
        <div className="new-user-right">
        <div className="membershipInfo">
              <h2>Credentials</h2>

              <label htmlFor="membership_type">Membership Type - This needs to be a dropdown : pull memberships from db</label>
              <input id="membership_type" name="membership" />

              <label htmlFor="privilege-level">Privilege Level - This needs to be a dropdown : pull privileges from db</label>
              <input id="privilege-level" name="privilege" />

            </div>
          <div className="secondaryInfo">
            <h2>Secondary Info</h2>
            <label htmlFor="secondary_first_name">First Name</label>
            <input
              type="text"
              id="secondary_first_name"
              name="secondary-first-name"
              defaultValue={customerInfo.Secondary_First_Name}
            />

            <label htmlFor="secondary_last_name">Last Name</label>
            <input
              type="text"
              id="secondary_last_name"
              name="secondary-last-name"
              defaultValue={customerInfo.Secondary_Last_Name}
            />

            <label htmlFor="secondary_email">Email</label>
            <input type="email" id="secondary_email" name="secondary-email" defaultValue={customerInfo.Secondary_Email} />

            <label htmlFor="secondary_number">Phone Number</label>
            <input type="tel" id="secondary_number" name="secondary-number" defaultValue={customerInfo.Secondary_Phone_Number}/>
          </div>
        </div>
      </div>
      <div className="create-button-cont">
        <button className="createNewUserButton" type="submit">
          Edit Account
        </button>
        <button className="createNewUserButton" type="submit" id="delete-item">
           Delete User
          </button>
      </div>
    </form>
  </>
);
};

export default EditUser;
