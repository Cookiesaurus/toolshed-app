"use client";
import { useState } from "react";
import React from "react";
import { addNewUserFromAdmin } from "@/actions/adminActions";
import SelectStates from "../../FormComponents/statesSelect";
import jsPDF from "jspdf";
import Toast from "@/components/Toast";
const CreateNewUser = ({waivers, genders, memberships, privileges, admin}) => {
  const [showPasswords, setShowPasswords] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPasswords((prevState) => !prevState);
  };

  const [formError, setFormError] = useState(false);
  function handleFormSubmit(formData) {
    addNewUserFromAdmin(formData)
      .then((response) => {
        if (response.status === 'error') {
          setFormError(true)
        } else if(response.status === 'success') {
          setShowToast(true);
          console.log("success");
        }
      })
      .catch((error) => {
        // Handle other potential errors, e.g., network error
      });
  }

  const downloadPDF = (text, fileName) => {
    // Set margins
    const margin = 10;
    const pageWidth = 210; // A4 page width in mm
    const pageHeight = 297; // A4 page height in mm
    const textWidth = pageWidth - 2 * margin; // Text width within margins

    // Create a new jsPDF instance
    const doc = new jsPDF({
      unit: "mm",
      format: "a4",
      orientation: "portrait",
      marginLeft: margin,
      marginRight: margin,
      marginTop: margin,
      marginBottom: margin
    });

    // Set font size and type
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");

    // Split text into array of lines that fit within the page width
    const lines = doc.splitTextToSize(text, textWidth);

    // Add text content with specified formatting, taking care of page breaks
    let y = margin;
    lines.forEach((line, index) => {
      if (y + 12 > pageHeight) {
        // If adding this line would exceed the page height, create a new page
        doc.addPage();
        y = margin;
      }
      doc.text(line, margin, y);
      y += 12; // Increase y-coordinate for the next line
    });

    // Save PDF with specified filename
    doc.save(`${fileName}.pdf`);
  };

  return (
    <div className="new-user-cont">
    <h1>Create a new user</h1>
    {showToast && <Toast message="Account created successfully!" />}
    <span style={{ color: "red" }} role="alert">
            {formError ? (
              <>
                First name, last name, and email cannot be empty.
                <br />
                Password must be 8 or more characters.
                <br />
                Date of birth cannot be empty.
                <br />
                Address information cannot be empty and zip code cannot be more
                than 5 digits long.
                <br />
               Phone number must not include dashes.
              </>
            ) : (
              <></>
            )}
          </span>
      <form className="new-user-cont" action={handleFormSubmit}>
        
          <div className="new-user-section">
            <h2 className="new-user-subsection-title">Account</h2>

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
                name="re-enter-password"
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
                aria-label="Toggle password visbility"
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
                <input type="tel" id="phone_number" name="phone-number" />

                <label htmlFor="gender">Gender</label>
                <br/>
                <select
                  name="gender"
                  id="gender"
                  className="input"
                  defaultValue="Gender"
                >
                  <option value="Gender" hidden>
                    Gender
                  </option>
                  {genders.map((gend, index) => (
                    <option key={index} value={gend.Gender_Name}>
                      {gend.Gender_Name}
                    </option>
                  ))}
                </select>

                    <br/>
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
                <label htmlFor="address-state">State</label>
                <br/>
                <SelectStates />
                  
                  <br/>
                <label htmlFor="account-notes">Account Notes</label>
                <input type="text" id="account-notes" name="account-notes" />
              </div>
            </div>
          </div>
          <div className="new-user-right">
            <div className="membershipInfo">
              <h2>Credentials</h2>

            <label htmlFor="membership level">
              Membership Level
            </label>
            <select
              name="membership-level"
              id="membership level"
              className="input"
              defaultValue="membership"
            >
              <option value="membership" hidden>
                Select a membership
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
                  Privilege Level
                </option>
                {privileges.map((priv, index) => (
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
              >
                <option value="Customer">Customer</option>
              </select>
            )}
          </div>
            
            <div className="create-new-user-waivers">
              <div className="create-new-user-checkbox">
              <label htmlFor="waivers" className="checkbox-container" style={{ alignContent: "center", marginLeft: "5px" }}>
                I have read and accept the following:
                <input
                  type="checkbox"
                  className="checkbox"
                  id="waivers"
                  name="waiver"
                  required
                />
                <span className="checkmark"></span>
              </label>


              <ul className="lists">
                {waivers.map((waiver, index) => (
                  <React.Fragment key={index}>
                    <li
                      key={index}
                      onClick={() =>
                        downloadPDF(waiver.Waiver_Details, waiver.Waiver_Name)
                      }
                    >
                      {waiver.Waiver_Name}
                    </li>
                  </React.Fragment>
                ))}
              </ul>
            </div>
            </div>
          </div>
        <div className="create-button-cont">
          <button className="createNewUserButton" type="submit">
            Create Account
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateNewUser;
