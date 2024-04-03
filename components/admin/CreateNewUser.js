const CreateNewUser = () => {
  return(
    <>
    <form>
        <h1>Create a new user</h1>
        <div className="top_right_side_all_content">
            <div className="accountInfo">
                <h2>Account</h2>
                <label htmlFor="username">Username</label>
                <br/>
                <input type="text" name="username" required/>
                <br/>
                <label htmlFor="password">Password</label>
                <br/>
                <input type="password" name="password" required/>
                <br/>
                <label htmlFor="re-enter_password">Re-enter password</label>
                <br/>
                <input type="password" name="re-enter_password" required/>
                <br/>
                <input className="checkbox" type="checkbox" id="show_passwords" name="show" value="show"/>
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
                <label htmlFor="phoneNumber">Phone Number</label>
                <br/>
                <input type="tel" id="phone_number" name="phoneNumber"/>
                <br/>
            </div>
            <div className="secondaryInfo">
                <h2>Secondary Info</h2>
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
                <label htmlFor="phoneNumber">Phone Number</label>
                <br/>
                <input type="tel" id="phone_number" name="phoneNumber"/>
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
                <label htmlFor="dob">Expiration</label>
                <br/>
                <input type="date" id="date_of_birth" name="dob"/>
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
                <label htmlFor="streetAddress">Street Address</label>
                <br/>
                <input type="text" id="street_address" name="streetAddress"/>
                <br/>
                <label htmlFor="Line2">Apt/Floor</label>
                <br/>
                <input type="text" id="2nd_Line" name="Line2"/>
                <br/>
                <label htmlFor="city">City</label>
                <br/>
                <input type="text" id="city" name="city"/>
                <br/>
                <label htmlFor="zipCode">ZIP code</label>
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
  