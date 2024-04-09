"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import visa from "../../app/public/images/visa.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faPencil,
    faTrashCan,
    faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import { formHandler } from "@/lib/actions/formHandler";
import {
    addCardToFile,
    getCards,
    deleteCardFromFile,
} from "@/actions/squareActions";
import { PaymentForm, CreditCard } from "react-square-web-payments-sdk";
const appId = "sandbox-sq0idb-b3GBVpDWCRZfpKe13OsWQQ";
const locationId = "LFETGS2GE8TGC";

const AddCardModal = ({ onClose, custId }) => {
    return (
        <>
            <h1>
                <FontAwesomeIcon
                    icon={faArrowLeft}
                    onClick={onClose}
                    style={{ cursor: "pointer" }}
                />{" "}
                Add New Payment Method
            </h1>
            <PaymentForm
                applicationId={appId}
                locationId={locationId}
                cardTokenizeResponseReceived={async (token) => {
                    // we’ll come back to this soon
                    let result = await addCardToFile(token.token, custId);
                    result = JSON.parse(result);
                    if (result.status == 201) {
                        onClose();
                    } else if (result.status == 200) {
                        // Give a notification that the card is there already
                        onClose();
                    }
                }}
            >
                <CreditCard>Add Card</CreditCard>
            </PaymentForm>
            ;
        </>
    );
};

export const Card = ({ user }) => {
    const custId = user.user.Customer_ID;
    const [showCards, setShowCards] = useState(true);
    const [cards, setCards] = useState([]);
    const [cardsUpdated, setCardsUpdated] = useState(false);
    useEffect(() => {
        let getC;
        const Cs = async () => {
            getC = await getCards(custId);
            getC = JSON.parse(getC);
            setCards(getC.cards);
        };
        Cs();
        setCardsUpdated(false);
    }, [custId, cardsUpdated]);
    const [showAddNewCardModal, setShowNewCardModal] = useState(false);

    const handleOpenAddNewCard = () => {
        setShowNewCardModal(true);
        setShowCards(false);
        setCardsUpdated(true);
    };

    const handleCloseChangeNewCardModal = () => {
        setShowNewCardModal(false);
        setShowCards(true);
        setCardsUpdated(true);
    };

    const DeleteCard = (index) => {
        // Disable the card
        const del = async () => {
            let res = await deleteCardFromFile(index);
            res = JSON.parse(res);
            if (res.status == 200) {
                console.log("Disabled card successfully.");
                setCardsUpdated(true);
            }
        };
        del();
    };

    return (
        <>
            <h1>Saved Cards</h1>
            <div className="card-cont">
                <div className="card new-card">
                    <button
                        type="button"
                        id="new-card"
                        onClick={handleOpenAddNewCard}
                    >
                        Add New Payment Method
                    </button>
                </div>
                {showCards &&
                    cards &&
                    cards.map((card, index) => {
                        if (!card.enabled) return;
                        return (
                            <>
                                <div className="card" key={index}>
                                    <div className="card-type">
                                        <Image
                                            src={visa}
                                            alt="Visa Card"
                                            width={55.8}
                                            className="card-image"
                                        />
                                        <div className="card-icons">
                                            <FontAwesomeIcon
                                                icon={faPencil}
                                                style={{
                                                    backgroundColor: "white",
                                                }}
                                                size="lg"
                                            />
                                            <button
                                                onClick={() => {
                                                    DeleteCard(card.id);
                                                }}
                                            >
                                                <FontAwesomeIcon
                                                    icon={faTrashCan}
                                                    style={{
                                                        backgroundColor:
                                                            "white",
                                                        cursor: "pointer",
                                                    }}
                                                    // action={deleteCard}
                                                    size="lg"
                                                />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="card-nickname">
                                        <p>
                                            {card.cardBrand +
                                                " " +
                                                card.cardType}
                                        </p>
                                        <p className="weight-400">
                                            · · · · · · · · · · · · {card.last4}
                                        </p>
                                    </div>
                                    <div className="card-details">
                                        <p className="weight-300">
                                            {user.user.First_Name +
                                                " " +
                                                user.user.Last_Name}
                                        </p>
                                        <p className="weight-300">
                                            Exp: {card.expMonth}/{card.expYear}
                                        </p>
                                    </div>
                                </div>
                            </>
                        );
                    })}
                {showAddNewCardModal && (
                    // <AddNewPasswordModal
                    //     onClose={handleCloseChangeNewCardModal}
                    // />
                    <div>
                        <AddCardModal
                            onClose={handleCloseChangeNewCardModal}
                            custId={custId}
                        />
                    </div>
                )}
            </div>
        </>
    );
};
