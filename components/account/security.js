'use client'
import React, { useState } from 'react';
import { changePassword } from '@/actions/actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const ChangePasswordModal = ({ onClose }) => {

    return (
        <>
            <h1><FontAwesomeIcon icon={faArrowLeft} onClick={onClose} style={{cursor : 'pointer'}}/> Change Password</h1>
            <div className='account-name'>
                <form action={changePassword}>
                <div className='form-container white'>
                    <label className="sr-only" htmlFor="email">Email</label>
                    <input type="text" name='email' id="email" placeholder=" Email" required className='account-input white'></input>
                    <label className="sr-only" htmlFor="currentPassword">Current Password</label>
                    <input type="password" name='current-password' id="currentPassword" placeholder=" Current Password" required className='account-input white'></input>
                    <label className="sr-only" htmlFor="newPassword">New Password</label>
                    <input type="password" name='new-password' id="newPassword" placeholder=" New Password" required className='account-input white'></input>
                    <button type='submit' id='save-changes'>
                        Save Changes
                    </button>
                    <button type='button' onClick={onClose} id='cancel-changes'>
                        Cancel
                    </button>
                </div>
                </form>
            </div>
        </>
    );
}

const Security = ({user}) => {
    const [showSecurity, setShowSecurity] = useState(true);
    const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);

    const handleOpenChangePasswordModal = () => {
        setShowChangePasswordModal(true);
        setShowSecurity(false);
    }

    const handleCloseChangePasswordModal = () => {
        setShowChangePasswordModal(false);
        setShowSecurity(true);
    }

    return (
        <>
            {showSecurity && (
                <>
                    <h1>Security</h1>
                    <div className='account-name'>
                        <div className='account-email'>
                            <p className='light-paragraph'>Log-in Email</p>
                            <p>{user.user.Email}</p>
                        </div>
                        <div className='account-info'>
                            <button id="change-password" className="profile-button" onClick={handleOpenChangePasswordModal}>
                                Change Password
                            </button>
                        </div>
                    </div>
                </>
            )}
            {showChangePasswordModal && <ChangePasswordModal onClose={handleCloseChangePasswordModal} />}
        </>
    )
}

export default Security;
