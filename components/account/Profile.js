"use client";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import SelectStates from "../FormComponents/statesSelect";
import { updateUserProfile } from "@/actions/actions";
const Profile = ({user}) =>{
    const [showProfile, setShowProfile] = useState(true);
    const [showProfileModal, setShowProfileModal] = useState(false);
  
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
    let accountID = user.user?.Account_ID
    updateUserProfile(accountID, formData)
      .then((response) => {
        if (response.error) {
          setFormError(true)
        } else {
          console.log("success");
          // alert(response);
        }
      })
      .catch((error) => {
        // Handle other potential errors, e.g., network error
      });
  }

    const ChangeProfileModal = ({ onClose }) => {
        return (
          <>
          <span style={{ color: "red" }} role="alert" className="error">
            {formError ? (
              <>
                Primary First name, last name, and email cannot be empty.
                <br />
                Address information cannot be empty and zip code cannot be more
                than 5 digits long.
              </>
            ) : (
              <></>
            )}
          </span>
           <form className='profile_info' action={handleFormSubmit}>
                <div className='primary_info'>
                    <h3 className='info-title'>Primary Info</h3>
                    <div className='account-name'>
                        <div className='account-info'>
                            <label className='profile-label' htmlFor="first-name">First Name: </label>
                            <input className='input white' id='first-name' name='first-name' defaultValue={user.user?.First_Name} />
                            <label className='profile-label' htmlFor="last-name">Last Name: </label>
                            <input className='input white' id='last-name' name='last-name' defaultValue={user.user?.Last_Name} />
                        </div>
                        <div className='account-email'>
                            <label className='profile-label' htmlFor="email">Email: </label>
                            <input className='input white' id='email' name='email' defaultValue={user.user?.Email} />
                            <label className='profile-label' htmlFor='phone'>Phone: </label>
                            <input className='input white' id='phone' name='phone' defaultValue={user.user?.Phone_Number} />
                            <label className='profile-label' htmlFor='organization'>Orgnaization: </label>
                            <input className='input white' id='organization' name='organization' defaultValue={user.user?.Organization_Name} />
                        </div>
                    </div>
                </div>
                <div className='secondary_info'>
                    <h3 className='info-title'>Secondary Info</h3>
                    <div className='account-name'>
                        <div className='account-info'>
                            <label className='profile-label' htmlFor="secondary-first-name">First Name: </label>
                            <input className='input white' id="secondary-first-name" name='secondary-first-name' defaultValue={user.user?.Secondary_First_Name} />
                            <label className='profile-label' htmlFor="secondary-last-name">Last Name: </label>
                            <input className='input white' id='secondary-last-name' name='secondary-last-name' defaultValue={user.user?.Secondary_Last_Name} />
                        </div>
                        <div className='account-email'>
                            <label className='profile-label' htmlFor="secondary-email">Email: </label>
                            <input className='input white' id='secondary-email' name='secondary-email' defaultValue={user.user?.Secondary_Email} />
                            <label className='profile-label' htmlFor='secondary-phone'>Phone: </label>
                            <input className='input white' id='secondary-phone' name='secondary-phone' defaultValue={user.user?.Secondary_Phone_Number} />
                        </div>
                    </div>
                </div>
                <div className='address-cont'>
                    <div>
                        <div className='account-info'>
                            <h3 className='info-title'>Default Address</h3>
                            <label className='profile-label' htmlFor='address_line1'>Address Line 1: </label>
                            <input className='input white' id='address_line1' name='address_line1' defaultValue={user.user?.Address_Line1} />
                            <label className='profile-label' htmlFor='address_line2'>Address Line 2: </label>
                            <input className='input white' id='address_line2' name='address_line2' defaultValue={user.user?.Address_Line2} />
                            <label className='profile-label' htmlFor='city'>City: </label>
                            <input className='input white' id='city' name='city' defaultValue={user.user?.City} />
                            <label className='profile-label' htmlFor='postal_code'>Postal code: </label>
                            <input className='input white' id='postal_code' name='postal_code' defaultValue={user.user?.Postal_Code} />
                            <label className='profile-label' htmlFor='state'>State: </label>
                            <SelectStates classNameOverride={true} selected={true} defaultState={user.user?.State}/>
                        </div>
                    </div>
                </div>
                <div className='save-changes' style={{width: '100%'}}>
                    <button className="save-changes-button" type='submit'>Save Changes</button>
                    <button type="button" onClick={onClose} id="cancel-changes">Cancel</button>
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
                                <p className='light-paragraph white p-click' onClick={handleOpenProfileModal}>Edit Personal Information</p>
                                <button onClick={handleOpenProfileModal} className="white p-click"><FontAwesomeIcon icon={faPencil} style={{backgroundColor: 'white'}}/></button>
                            </div> 
                            <p className="white">{user.user.First_Name} {user.user.Last_Name}</p>                       
                        </div>
                        <div className='account-email'>
                            <p className='light-paragraph'>Email</p>
                            <p>{user.user.Email}</p> 
                        </div>
                    </div>
                    <div className='address-cont'>
                    <div className='account-info'>
                        <p className="white">Address</p>
                            <div className="edit-container white">
                                <p className='light-paragraph white p-click' onClick={handleOpenProfileModal}>Edit Address</p>
                                <button onClick={handleOpenProfileModal} className="white p-click"><FontAwesomeIcon icon={faPencil} style={{backgroundColor: 'white'}}/></button>
                            </div>
                        </div>
                        <div className='address-info'>
                            <p>{user.user.Address_Line1} {user.user.Address_Line2}</p>
                            <p>{user.user.City}</p>
                            <p>{user.user.Postal_Code}</p>
                            <p>{user.user.State}</p>
                            <p>{user.user.Phone_Number}</p>
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