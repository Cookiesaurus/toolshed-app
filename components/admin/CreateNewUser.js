"use client";
import { useState } from "react";
const CreateNewUser = () => {
  const [showPasswords, setShowPasswords] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPasswords((prevState) => !prevState);
  };

  return (
    <>
      <form>
        <h1>Create a new user</h1>
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
                <input type="text" id="first_Name" name="firstName" />

                <label htmlFor="last_Name">Last Name</label>
                <input type="text" id="last_Name" name="lastName" />

                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" />

                <label htmlFor="phone_number">Phone Number</label>
                <input type="tel" id="phone_number" name="phone number" />

                <label htmlFor="gender">Gender</label>
                <input type="text" id="gender" name="gender" />

                <label htmlFor="date_of_birth">Date of Bith</label>
                <input type="date" id="date_of_birth" name="date-of-birth" />

                <label htmlFor="title">Title</label>
                <input type="text" id="title" name="title" />

                <label htmlFor="organization">Organization</label>
                <input type="text" id="organization" name="organization" />

                <label htmlFor="street_address">Street Address</label>
                <input type="text" id="street_address" name="street-address" />

                <label htmlFor="2nd_Line">Apt/Floor</label>
                <input type="text" id="2nd_Line" name="street-address-two" />

                <label htmlFor="city">City</label>
                <input type="text" id="city" name="city" />

                <label htmlFor="zip_code">ZIP code</label>
                <input type="text" id="zip_code" name="zipCode" />
              </div>
            </div>
          </div>
          <div className="new-user-right">
            <div className="membershipInfo">
              <h2>Credentials</h2>

              <label htmlFor="membership_type">Membership Type</label>
              <input id="membership_type" name="membership" />

              <label htmlFor="privilege-level">Privilege Level</label>
              <input id="privilege-level" name="privilege" />

            </div>
            <div className="secondaryInfo">
              <h2>Secondary Info</h2>
              <label htmlFor="secondary_first_name">First Name</label>
              <input
                type="text"
                id="secondary_first_name"
                name="secondary-first-name"
              />

              <label htmlFor="secondary_last_name">Last Name</label>
              <input
                type="text"
                id="secondary_last_name"
                name="secondary-last-name"
              />

              <label htmlFor="secondary_email">Email</label>
              <input type="email" id="secondary_email" name="secondary-email" />

              <label htmlFor="secondary_number">Phone Number</label>
              <input type="tel" id="secondary_number" name="secondary-number" />
            </div>
          </div>
        </div>
        <div className="create-button-cont">
          <button className="createNewUserButton" type="submit">
            Create Account
          </button>
        </div>
      </form>
    </>
  );
};

export default CreateNewUser;
