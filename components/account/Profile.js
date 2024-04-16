"use client";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import SelectStates from "../FormComponents/statesSelect";
import { updateUserProfile } from "@/actions/actions";
import Toast from "../Toast";
import ErrorToast from "../ErrorToast";

const Profile = ({user}) =>{
    const [showProfile, setShowProfile] = useState(true);
    const [showProfileModal, setShowProfileModal] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const handleOpenProfileModal = () => {
        setShowProfileModal(true);
        setShowProfile(false);
    };
  
    const handleCloseChangeCHangeProfileModal = () => {
        setShowProfileModal(false);
        setShowProfile(true);
    };

  const [formError, setFormError] = useState(false);
  function handleFormSubmit(formData) {
    let accountID = user.Account_ID
    updateUserProfile(accountID, formData)
      .then((response) => {
        if (response.error) {
          setFormError(true)
        } else {
          console.log("success");
          setShowToast(true)
        }
      })
      .catch((error) => {
        // Handle other potential errors, e.g., network error
      });
  }

    const ChangeProfileModal = ({ onClose }) => {
        return (
          <>
           <form className='profile_info' action={handleFormSubmit}>
           {formError && <ErrorToast message="Error updating account information: Primary First name, last name, and email cannot be empty. Address information cannot be empty and zip code cannot be more
                than 5 digits long." />}
            {showToast && <Toast message="Account information updated successfully!" />}
                <div className='primary_info'>
                    <h3 className='info-title'>Primary Info</h3>
                    <div className='account-name'>
                        <div className='account-info'>
                            <label className='profile-label' htmlFor="first-name">First Name: </label>
                            <input className='input white' id='first-name' name='first-name' defaultValue={user.First_Name} />
                            <label className='profile-label' htmlFor="last-name">Last Name: </label>
                            <input className='input white' id='last-name' name='last-name' defaultValue={user.Last_Name} />
                        </div>
                        <div className='account-email'>
                            <label className='profile-label' htmlFor="email">Email: </label>
                            <input className='input white' id='email' name='email' defaultValue={user.Email} />
                            <label className='profile-label' htmlFor='phone'>Phone: </label>
                            <input className='input white' id='phone' name='phone' defaultValue={user.Phone_Number} />
                            <label className='profile-label' htmlFor='organization'>Orgnaization: </label>
                            <input className='input white' id='organization' name='organization' defaultValue={user.Organization_Name} />
                        </div>
                    </div>
                </div>
                <div className='secondary_info'>
                    <h3 className='info-title'>Secondary Info</h3>
                    <div className='account-name'>
                        <div className='account-info'>
                            <label className='profile-label' htmlFor="secondary-first-name">First Name: </label>
                            <input className='input white' id="secondary-first-name" name='secondary-first-name' defaultValue={user.Secondary_First_Name} />
                            <label className='profile-label' htmlFor="secondary-last-name">Last Name: </label>
                            <input className='input white' id='secondary-last-name' name='secondary-last-name' defaultValue={user.Secondary_Last_Name} />
                        </div>
                        <div className='account-email'>
                            <label className='profile-label' htmlFor="secondary-email">Email: </label>
                            <input className='input white' id='secondary-email' name='secondary-email' defaultValue={user.Secondary_Email} />
                            <label className='profile-label' htmlFor='secondary-phone'>Phone: </label>
                            <input className='input white' id='secondary-phone' name='secondary-phone' defaultValue={user.Secondary_Phone_Number} />
                        </div>
                    </div>
                </div>
                <div className='address-cont'>
                    <div>
                        <div className='account-info'>
                            <h3 className='info-title'>Default Address</h3>
                            <label className='profile-label' htmlFor='address_line1'>Address Line 1: </label>
                            <input className='input white' id='address_line1' name='address_line1' defaultValue={user.Address_Line1} />
                            <label className='profile-label' htmlFor='address_line2'>Address Line 2: </label>
                            <input className='input white' id='address_line2' name='address_line2' defaultValue={user.Address_Line2} />
                            <label className='profile-label' htmlFor='city'>City: </label>
                            <input className='input white' id='city' name='city' defaultValue={user.City} />
                            <label className='profile-label' htmlFor='postal_code'>Postal code: </label>
                            <input className='input white' id='postal_code' name='postal_code' defaultValue={user.Postal_Code} />
                            <label className='profile-label' htmlFor='state'>State: </label>
                            <SelectStates classNameOverride={true} selected={true} defaultState={user.State}/>
                        </div>
                    </div>
                </div>
                <div className='save-changes'>
                    <button className="save-changes-button" type='submit'>Save Changes</button>
                    <button className="cancel-button" type="button" onClick={onClose} id="cancel-changes">Cancel</button>
                </div>
            </form>
          </>
        );
      };
    return (
        <>
        {showProfile && (
            <>
            <h1>Profile</h1>
             <div className='account-name white'>
                        <div className='account-info white'>
                        <div className="edit-container white">
                                <p className='light-paragraph white p-click' onClick={handleOpenProfileModal} aria-label="Edit Personal Information">Edit Personal Information</p>
                                <button aria-label="Edit Personal Information" onClick={handleOpenProfileModal} className="white p-click"><FontAwesomeIcon icon={faPencil} style={{backgroundColor: 'white'}}/></button>
                            </div> 
                            <p className="white" aria-labelledby="profile-heading">{user.First_Name} {user.Last_Name}</p>                       
                        </div>
                        <div className='account-email'>
                            <p className='light-paragraph'>Email</p>
                            <p>{user.Email}</p> 
                        </div>
                    </div>
                    <div className='address-cont'>
                    <div className='account-info'>
                        <p className="white">Address</p>
                            <div className="edit-container white">
                                <p className='light-paragraph white p-click' onClick={handleOpenProfileModal} aria-label="Edit Address">Edit Address</p>
                                <button aria-label="Edit Address" onClick={handleOpenProfileModal} className="white p-click"><FontAwesomeIcon icon={faPencil} style={{backgroundColor: 'white'}}/></button>
                            </div>
                        </div>
                        <div className='address-info'>
                            <p>{user.Address_Line1} {user.Address_Line2}</p>
                            <p>{user.City}</p>
                            <p>{user.Postal_Code}</p>
                            <p>{user.State}</p>
                            <p>{user.Phone_Number}</p>
                    </div>
                </div>
                </>
      )}
      {showProfileModal && (
        <ChangeProfileModal onClose={handleCloseChangeCHangeProfileModal} />
      )}
    </>
    )
}

export default Profile