"use client";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import { sendGiftCardEmail } from "@/actions/addNewUser";
import {
    activateGiftCard,
    createGiftCard,
    getCards,
    linkCustomerToGiftCard,
    submitPayment,
} from "@/actions/squareActions";
import {
    faPencil,
    faTrashCan,
    faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import { PaymentForm, CreditCard } from "react-square-web-payments-sdk";
import { getCustomerByEmail } from "@/actions/squareActions";

const appId = "sandbox-sq0idb-b3GBVpDWCRZfpKe13OsWQQ";
const locationId = "LFETGS2GE8TGC";

BigInt.prototype.toJSON = function () {
    return this.toString();
};

const PaymentButton = ({ paymentAmount }) => {
    return (
        <button
            type="submit"
            disabled={paymentAmount === "$0.00" ? "payment-not-set" : ""}
            id="giftcard-button"
        >
            {" "}
            {paymentAmount}{" "}
        </button>
    );
};

const AddCardModal = ({ onClose, custId, amt }) => {
    // State to check when to make payment
    const [pay, setPay] = useState(false);
    const [source, setSource] = useState(null);
    useEffect(() => {
        // Make payment
        // Pay using card
        const fn = async () => {
            let cards;
            let card;
            let gc = await createGiftCard();
            if (!source) {
                cards = await getCards(custId);
                cards = JSON.parse(cards).cards;
                card = cards[0];
                setSource(card.id);
                // setSource(cards)
            }
            await activateGiftCard(gc.id, gc.gan, amt, source);
            // Link Customer to card
            if (custId) {
                gc = await linkCustomerToGiftCard(gc.id, custId);
                console.log("GC after activation : ", gc);
            }
            // Figure out how customer will use card
        };
        if (pay) {
            console.log("I");
            fn();
            setPay(false);
        }
    }, [pay]);

    // const makeGiftCard = () => {
    //     // If user loggged in, use card on file.
    //     // Else use entered card
    //     console.log(sourceId);
    //     // Create Gift Card
    //     // Activate gift card
    //     setPay(true);
    // };
    const payUsingCard = () => {
        setPay(true);
        console.log(pay);
        // Get card from file
        // Make order, invoice, payment
    };
    return (
        <>
            <h1>
                <FontAwesomeIcon
                    icon={faArrowLeft}
                    onClick={onClose}
                    style={{ cursor: "pointer" }}
                />
                {custId ? "Using saved card on file" : "Add a payment method"}
            </h1>
            {custId ? (
                <button onClick={payUsingCard}>Pay {amt}</button>
            ) : (
                <PaymentForm
                    applicationId={appId}
                    locationId={locationId}
                    cardTokenizeResponseReceived={async (token) => {
                        // Create a gift card
                        setSource(token.token);
                        setPay(true);
                    }}
                >
                    <CreditCard>Pay {amt}</CreditCard>
                </PaymentForm>
            )}
            ;
        </>
    );
};
const RecipientModal = () => {
    return (
        <>
            <div className="form-section">
                <h3 className="white">Recipient Info</h3>
                <label
                    className="giftcard-label"
                    htmlFor="recipient-first-name"
                >
                    First Name{" "}
                </label>
                <input
                    className="giftcard-input"
                    type="text"
                    required
                    id="recipient-first-name"
                    name="recipient-first-name"
                />
                <label className="giftcard-label" htmlFor="recipient-last-name">
                    Last Name{" "}
                </label>
                <input
                    className="giftcard-input"
                    type="text"
                    required
                    id="recipient-last-name"
                    name="recipient-last-name"
                />
                <label className="giftcard-label" htmlFor="recipient-email">
                    Email{" "}
                </label>
                <input
                    className="giftcard-input"
                    type="email"
                    required
                    name="recipient-email"
                />
                <label className="giftcard-label" htmlFor="message">
                    Message{" "}
                </label>
                <textarea
                    name="message"
                    rows={4}
                    cols={30}
                    id="message"
                ></textarea>
            </div>
        </>
    );
};

const FromModal = () => {
    return (
        <>
            <div className="form-section">
                <h3 className="white">Sender Info</h3>
                <label className="giftcard-label" htmlFor="sender-first-name">
                    First Name{" "}
                </label>
                <input
                    className="giftcard-input"
                    type="text"
                    required
                    name="sender-first-name"
                    id="sender-first-name"
                />
                <label className="giftcard-label" htmlFor="sender-last-name">
                    Last Name{" "}
                </label>
                <input
                    className="giftcard-input"
                    type="text"
                    required
                    name="sender-last-name"
                    id="sender-last-name"
                />
                <label className="giftcard-label" htmlFor="sender-email">
                    Email{" "}
                </label>
                <input
                    className="giftcard-input"
                    type="email"
                    name="sender-email"
                    id="sender-email"
                    required
                />
            </div>
        </>
    );
};

const RedeemGiftCard = () => {
    return (
        <>
            <div className="redeem-card">
                <h2 className="section-title white">Redeem a gift card</h2>
                <form className="giftcard-form">
                    <label className="giftcard-label" htmlFor="code">
                        Enter gift card code
                    </label>
                    <input
                        className="giftcard-input"
                        type="text"
                        id="code"
                        name="code"
                    ></input>
                    <button
                        className="redeem-button"
                        type="submit"
                        id="card-redeem-button"
                    >
                        Redeem gift card
                    </button>
                </form>
            </div>
        </>
    );
};

const GiftCardOptions = () => {
    const [showCardModal, setShowCardModal] = useState(false);
    const [paymentAmount, setPaymentAmount] = useState("$0.00");
    const [amount, setAmount] = useState(null);
    const [formError, setFormError] = useState(false);
    const handleButtonClick = (event) => {
        setPaymentAmount(event.target.textContent);
        // Maybe highlight the selected plan
    };

    const [session, setSession] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState("card");
    const [cust, setCust] = useState(null);
    const [email, setEmail] = useState(null);
    useEffect(() => {
        fetch("/api/me", { cache: "no-cache" })
            .then((response) => response.json())
            .then((data) => {
                setSession({
                    user: data.user,
                    isLoggedIn: data.isLoggedIn,
                });
            });
    }, []);

    useEffect(() => {
        const fn = async () => {
            try {
                const cust = await getCustomerByEmail(email);
                if (cust.error) {
                    console.log(cust);
                }
                setCust(cust);
                // console.log("Customer : ", cust);
            } catch (error) {
                console.error(error);
            }
        };
        if (email) {
            fn();
        }
    }, [email]);

    function handleGiftCardSubmit(formData) {
        let pmt = String(paymentAmount);
        console.log(pmt.substring(1, pmt.length - 3));
        pmt = parseFloat(pmt.substring(1, pmt.length - 3));
        var em = formData.get("recipient-email");
        setEmail(em);
        setAmount(pmt);
        setShowCardModal(true);
        // Send mail
        // const res = sendGiftCardEmail(formData)
        //     .then((response) => {
        //         if (response.error) {
        //             setFormError(true);
        //         } else {
        //             console.log("success");
        //             // alert(response);
        //         }
        //     })
        //     .catch((error) => {
        //         // Handle other potential errors, e.g., network error
        //     });
    }

    return (
        <>
            {session && session.isLoggedIn ? <RedeemGiftCard /> : null}
            <div className="buy-card">
                <h2 className="section-title white">Buy a gift card</h2>

                <div className="gift-card-ranks">
                    <div className="rank">
                        <h3>
                            Tinker Level <br /> Gift Certificate
                        </h3>
                        <p>
                            This is a gift certificate for one McGuyver Level
                            Membership (normally $35 per year).
                            <br />
                            With this membership, the member can rent up to five
                            tools at a time*
                        </p>
                        <button
                            className="redeem-button"
                            id="gift-redeem-button-25"
                            onClick={handleButtonClick}
                        >
                            $25.00
                        </button>
                    </div>
                    <div className="rank">
                        <h3>
                            MacGyver Level
                            <br /> Gift Certificate
                        </h3>
                        <p>
                            This is a gift certificate for one Tinkerer Level
                            Membership (normally $25 per year).
                            <br />
                            With this membership, the member can rent up to 10
                            tools at a time*
                        </p>
                        <button
                            className="redeem-button"
                            id="gift-redeem-button-35"
                            onClick={handleButtonClick}
                        >
                            $35.00
                        </button>
                    </div>
                    <div className="rank">
                        <h3>
                            Builder Level <br />
                            Gift Certificate
                        </h3>
                        <p>
                            This is a gift certificate for one Builder Level
                            Membership (normally $50 per year).
                            <br />
                            With this membership, the member can rent up to 25
                            tools at a time*
                        </p>
                        <button
                            className="redeem-button"
                            id="gift-redeem-button-50"
                            onClick={handleButtonClick}
                        >
                            $50.00
                        </button>
                    </div>
                    <div className="rank">
                        <h3>
                            Contractor Level <br /> Gift Certificate
                        </h3>
                        <p>
                            This is a gift certificate for one Contractor Level
                            Membership (normally $100 per year).
                            <br />
                            With this membership, the member can rent up to 50
                            tools at a time*. This membership allows two users
                            on the account.
                        </p>
                        <button
                            className="redeem-button"
                            id="gift-redeem-button-100"
                            onClick={handleButtonClick}
                        >
                            $100.00
                        </button>
                    </div>
                </div>
                <div className="giftcard-form-bottom">
                    <form
                        className="form-section"
                        action={handleGiftCardSubmit}
                    >
                        <RecipientModal />
                        <FromModal />
                        <div className="form-section">
                            <h3 className="white">Total Due: </h3>
                            <PaymentButton
                                paymentAmount={paymentAmount}
                                type="submit"
                            />
                            <span
                                style={{ color: "red" }}
                                className="white"
                                role="alert"
                            >
                                {formError ? <>Invalid email.</> : <></>}
                            </span>
                        </div>
                    </form>
                </div>
                {showCardModal ? (
                    <AddCardModal
                        onClose={() => {
                            setShowCardModal(false);
                        }}
                        custId={
                            session.isLoggedIn
                                ? session.user.Customer_Id
                                : cust
                                ? cust.id
                                : null
                        }
                        amt={amount}
                    />
                ) : null}
            </div>
            <div className="discalimer">
                <p>
                    *Note: Rented tools must be returned within 5 days. After
                    that, a $1 fee per day will be incurred. Any tool not
                    returned after 30 days will result in the renter being
                    charged for the value of a new replacement tool (market
                    value).
                </p>
            </div>
        </>
    );
};

const Giftcards = () => {
    // If user not logged in, render Credit Card form.
    // If user logged in, use card on file.
    return (
        <>
            <GiftCardOptions />
        </>
    );
};

export default Giftcards;
