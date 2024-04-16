"use client";
import React, { useState } from "react";
import { changePassword } from "@/actions/actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Toast from "../Toast";
import ErrorToast from "../ErrorToast";

export const ChangePasswordModal = ({ onClose }) => {
    const [showToast, setShowToast] = useState(false);
    const [showErrorToast, setShowErrorToast] = useState(false);
    function handlePasswordChange(formData) {
        console.log(formData.get("new-password"), formData.get("email"))
        changePassword(formData)
          .then((response) => {
            if ( response.status === 'error') {
              console.log('error')
              setShowErrorToast(true)
            } else if(response.status === "success") {
              setShowToast(true)
            }
          })
          .catch((error) => {
            // Handle other potential errors, e.g., network error
          });
      }
    return (
      <>
      {showErrorToast && <ErrorToast message="There was an error when trying to update your password!" />}
      {showToast && <Toast message="Account password updated successfully!" />}
        <h1>
          <FontAwesomeIcon
            icon={faArrowLeft}
            onClick={onClose}
            style={{ cursor: "pointer" }}
          />{" "}
          Change Password
        </h1>
        <div className="account-name">
          <form action={handlePasswordChange}>
            <div className="form-container white">
              <label className="sr-only" htmlFor="email">Email</label>
              <input type="text" name="email" id="email" placeholder=" Email" required
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
              <button className="save-changes-button" type="submit" id="save-changes">
                Save Changes
              </button>
              <button className="cancel-button" type="button" onClick={onClose} id="cancel-changes">
                Cancel
              </button>
            </div>
          </form>
        </div>
      </>
    );
  };