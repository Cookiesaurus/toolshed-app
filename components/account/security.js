"use client";
import React, { useState } from "react";
import { ChangePasswordModal } from "./ChangePasswordModal";


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
