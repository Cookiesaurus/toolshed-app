"use client";
import { getGiftCards } from "@/actions/squareActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
export const GiftCardDisp = ({ custId }) => {
    const [gc, setGc] = useState(null);
    let giftCards;
    // const [disp, setDisp] = useState(null);
    useEffect(() => {
        let un = undefined;
        const fn = async () => {
            giftCards = await getGiftCards(un, un, un, un, custId);
            setGc(giftCards);
        };
        fn();
    }, []);
    return (
        <>
            {gc &&
                gc.map((giftCard, index) => {
                    const gan = giftCard.gan;
                    const last4 = gan.substring(gan.length - 4, gan.length);
                    console.log(last4);
                    return (
                        <>
                            <div>HI</div>
                            <div className="card" key={index}>
                                <div className="card-type">GIFT CARD</div>
                                <div className="card-nickname">
                                    <p></p>
                                    <p className="weight-400">
                                        · · · · · · · · · · · · {last4}
                                    </p>
                                </div>
                                <div className="card-details">
                                    <p className="weight-300"></p>
                                    <p className="weight-300">
                                        {/* Exp: {card.expMonth}/{card.expYear} */}
                                    </p>
                                </div>
                            </div>
                        </>
                    );
                })}
        </>
    );
    /* return (
    ); */
};
