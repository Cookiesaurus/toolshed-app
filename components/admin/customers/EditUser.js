'use client'
import { useState } from "react";
import SelectStates from "../../FormComponents/statesSelect";
import { updateUserFromAdmin, deleteUser } from "@/actions/adminActions";
//Using the create new user component, just need to pass in data from the query
const EditUser = ({ customerInfo, genders, memberships, privilegeLevels, admin }) => {
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
    <form method="POST">
      <h1>Edit User</h1>
      <div className="new-user-cont">
        <div className="new-user-left">
          <div className="accountInfo">
            <div className="primaryInfo">
              <h2>Primary Info</h2>
              <label htmlFor="first_Name">First Name</label>
              <input
                type="text"
                id="first_Name"
                name="firstName"
                defaultValue={customerInfo.First_Name}
              />

              <label htmlFor="last_Name">Last Name</label>
              <input
                type="text"
                id="last_Name"
                name="lastName"
                defaultValue={customerInfo.Last_Name}
              />

              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                defaultValue={customerInfo.Email}
              />

              <label htmlFor="phone_number">Phone Number</label>
              <input
                type="tel"
                id="phone_number"
                name="phoneNumber"
                defaultValue={customerInfo.Phone_Number}
              />

              <label htmlFor="gender">Gender</label>
              <select
                name="gender"
                id="gender"
                className="input"
                defaultValue="default"
              >
                <option value="default" hidden>
                  {customerInfo.Gender_Name}
                </option>
                {genders.map((gend, index) => (
                  <option key={index} value={gend.Gender_Name}>
                    {gend.Gender_Name}
                  </option>
                ))}
              </select>

              <label htmlFor="date_of_birth">Date of Bith</label>
              <input
                type="date"
                id="date_of_birth"
                name="date-of-birth"
                value={formatDateForInput()}
              />

              <label htmlFor="title">Title</label>
              <input
                type="text"
                id="title"
                name="title"
                defaultValue={customerInfo.Title}
              />

              <label htmlFor="organization">Organization</label>
              <input
                type="text"
                id="organization"
                name="organization"
                defaultValue={customerInfo.Organization_Name}
              />

              <label htmlFor="street_address">Street Address</label>
              <input
                type="text"
                id="street_address"
                name="street-address"
                defaultValue={customerInfo.Address_Line1}
              />

              <label htmlFor="2nd_Line">Apt/Floor</label>
              <input
                type="text"
                id="2nd_Line"
                name="street-address-two"
                defaultValue={customerInfo.Address_Line2}
              />

              <label htmlFor="city">City</label>
              <input
                type="text"
                id="city"
                name="city"
                defaultValue={customerInfo.City}
              />
              <label htmlFor="address-state">State</label>
              <SelectStates selected={true} defaultState={customerInfo.State} />
              <label htmlFor="zip_code">ZIP code</label>
              <input
                type="text"
                id="zip_code"
                name="zipCode"
                defaultValue={customerInfo.Postal_Code}
              />
            </div>
          </div>
        </div>
        <div className="new-user-right">
          <div className="membershipInfo">
            <h2>Credentials</h2>
            <label htmlFor="membership level">Membership Level</label>
            <select
              name="membership-level"
              id="membership level"
              className="input"
              defaultValue="membership"
            >
              <option value="membership" hidden>
                {customerInfo.Membership_Title}
              </option>
              {memberships.map((level, index) => (
                <option key={index} value={level.Membership_Title}>
                  {level.Membership_Title}
                </option>
              ))}
            </select>

            <label htmlFor="privilege-level">Privilege Level</label>
            {admin ? (
              <select
                id="privilege-level"
                name="privilege"
                defaultValue="privilege level"
                className="input"
              >
                <option value="privilege level" hidden>
                  {customerInfo.Privilege_Title}
                </option>
                {privilegeLevels.map((priv, index) => (
                  <option key={index} value={priv.Privilege_Title}>
                    {priv.Privilege_Title}
                  </option>
                ))}
              </select>
            ) : (
              <select
                id="privilege-level"
                name="privilege"
                defaultValue="Customer"
                className="input"
              >
                <option value="Customer">Customer</option>
              </select>
            )}
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
            <input
              type="email"
              id="secondary_email"
              name="secondary-email"
              defaultValue={customerInfo.Secondary_Email}
            />

            <label htmlFor="secondary_number">Phone Number</label>
            <input
              type="tel"
              id="secondary_number"
              name="secondary-number"
              defaultValue={customerInfo.Secondary_Phone_Number}
            />
          </div>
        </div>
      </div>
      <div className="create-button-cont">
        <button
          className="createNewUserButton"
          type="submit"
          formAction={updateUserFromAdmin}
        >
          Edit Account
        </button>
        {admin ? (
          <button
            className="createNewUserButton"
            type="submit"
            id="delete-item"
            onClick={(e) => {
              e.preventDefault();
              deleteUser(customerInfo.Account_ID);
            }}
          >
            Delete User
          </button>
        ) : (
          <></>
        )}
      </div>
    </form>
  </>
);
};

export default EditUser;
