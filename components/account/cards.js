'use client'
import './profile.css'
import React, { useState } from 'react';
import Link from 'next/link'
import Image from 'next/image'
import visa from '../../app/public/images/visa.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faTrashCan, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { formHandler } from "@/lib/actions/formHandler";

const AddNewPasswordModal = ({ onClose }) => {

    return (
        <>
            <h1><FontAwesomeIcon icon={faArrowLeft} onClick={onClose} style={{cursor : 'pointer'}}/> Add New Payment Method</h1>
            <div className='account-name'>
                <form action={formHandler}>
                <div className='form-container white'>
                    <label className='sr-only' htmlFor='card-nickname'>Nickname for card</label>
                    <input type='text' placeholder='Nickname for card' className='account-input white' id='card-nickname'></input>
                    
                    <label className='sr-only' htmlFor='card-number'>Card Number</label>
                    <input type='text' placeholder='Card Number' className='account-input white' id='card-number' maxLength={19} required></input>
                    
                    <label className='sr-only' htmlFor='card-owner'>Owner&#39;s Name on Card</label>
                    <input type='text' placeholder='Owner&#39;s Name on Card' className='account-input white' id='card-owner'></input>

                    <label className='sr-only' htmlFor='card-expiration-date'>Expiration Date</label>
                    <input type='text' placeholder='Exp Date' id='card-expiration-date' className='account-input white' ></input>

                    <label className='sr-only' htmlFor='card-cvv'>Security Code</label>
                    <input type='text' maxLength={3} placeholder='Security Code' id='card-cvv' className='account-input white' ></input>
                    
                    <label className='sr-only' htmlFor='card-zipcode'>Billing Zip Code</label>
                    <input type='text' maxLength={5} placeholder='Billing Zip Code' id='card-zipcode' className='account-input white' ></input>

                    <button type='submit' id='save-changes'>
                        Save Card
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


const Cards = () => {
    const [showCards, setShowCards] = useState(true);
    const [showAddNewCardModal, setShowNewCardModal] = useState(false);

    const handleOpenAddNewCard = () => {
        setShowNewCardModal(true);
        setShowCards(false);
    }

    const handleCloseChangeNewCardModal = () => {
        setShowNewCardModal(false);
        setShowCards(true);
    }

  return (
    <>
    {showCards && (
        <>
            <h1>Saved Cards</h1>
        <div className='card-cont'>
            <div className='card new-card'>
                <button type='button' id='new-card' onClick={handleOpenAddNewCard}>
                    Add New Payment Method
                </button>
            </div>
            <div className='card'>
                <div className='card-type'>
                    <Image src={visa} alt='Visa Card' width={55.8} className='card-image'/>
                    <div className='card-icons'>
                        <FontAwesomeIcon icon={faPencil} style={{backgroundColor: 'white'}} size='lg'/>
                        <FontAwesomeIcon icon={faTrashCan} style={{backgroundColor: 'white'}} size='lg'/>
                    </div>
                </div>
                <div className='card-nickname'>
                    <p>nickname</p>
                    <p className='weight-400'>· · · · · · · · · · · · 4 3 2 1</p>
                </div>
                <div className='card-details'>
                    <p className='weight-300'>Card Holder Name</p>
                    <p className='weight-300'>Exp: MM/YY</p>
                </div>
            </div>
        </div>
        </>
    )}
    {showAddNewCardModal && <AddNewPasswordModal onClose={handleCloseChangeNewCardModal} />}
    </>
  )
}

export default Cards
