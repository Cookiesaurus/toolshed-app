"use client";
import React, { useState } from "react";
import { changePassword } from "@/actions/actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from 'react-toastify';
function handlePasswordChange(formData) {
  changePassword(formData)
    .then((response) => {
      if ( response.error) {
        console.log('error')
        alert(response.error);
      } else {
        console.log('success')
        alert(response.success)
      }
    })
    .catch((error) => {
      // Handle other potential errors, e.g., network error
    });
}
const ChangePasswordModal = ({ onClose }) => {
  return (
    <>
      <h1>
        <FontAwesomeIcon
          icon={faArrowLeft}
          onClick={onClose}
          style={{ cursor: "pointer" }}
        />{" "}
        Change Password
      </h1>
      <div className="account-name">
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <form action={handlePasswordChange}>
          <div className="form-container white">
            <label className="sr-only" htmlFor="email">
              Email
            </label>
            <input
              type="text"
              name="email"
              id="email"
              placeholder=" Email"
              required
              className="account-input white"
            ></input>
            <label className="sr-only" htmlFor="newPassword">
              New Password
            </label>
            <input
              type="password"
              name="new-password"
              id="newPassword"
              placeholder=" New Password"
              required
              className="account-input white"
            ></input>
            <button type="submit" id="save-changes">
              Save Changes
            </button>
            <button type="button" onClick={onClose} id="cancel-changes">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

const Security = ({ user }) => {
  const [showSecurity, setShowSecurity] = useState(true);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);

  const handleOpenChangePasswordModal = () => {
    setShowChangePasswordModal(true);
    setShowSecurity(false);
  };

  const handleCloseChangePasswordModal = () => {
    setShowChangePasswordModal(false);
    setShowSecurity(true);
  };

  return (
    <>
      {showSecurity && (
        <>
          <h1>Security</h1>
          <div className="account-name">
            <div className="account-email">
              <p className="light-paragraph">Log-in Email</p>
              <p>{user.user.Email}</p>
            </div>
            <div className="account-info">
              <button
                id="change-password"
                className="profile-button"
                onClick={handleOpenChangePasswordModal}
              >
                Change Password
              </button>
            </div>
          </div>
        </>
      )}
      {showChangePasswordModal && (
        <ChangePasswordModal onClose={handleCloseChangePasswordModal} />
      )}
    </>
  );
};

export default Security;
