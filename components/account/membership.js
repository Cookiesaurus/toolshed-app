"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
    updateSubscription,
    cancelSubscription,
    getSubscription,
} from "@/actions/squareActions";

// Make component for subscription plans
const MembershipForm = ({ custId }) => {
    // Function for updating plan when value is changed
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [subscribe, setSubscribe] = useState(false);
    const selectionChanged = (res) => {
        setSelectedPlan(res.target.value);
    };
    useEffect(() => {
        const fn = async () => {
            try {
                if (selectedPlan == null) return;
                const result = await updateSubscription(custId, selectedPlan);
                console.log("updated subscription: ", result);
                setSubscribe(false);
            } catch (error) {
                console.log("Could not update subscription: ", error);
            }
        };
        fn();
    }, [subscribe]);
    //Set action to update membership
    const upgradeMembership = () => {
        console.log(selectedPlan);
        setSubscribe(true);
        console.log(subscribe);
    };
    return (
        <form
            className="select-level"
            style={{ background: "white", textAlign: "center" }}
        >
            <div className="option-container">
                <input
                    className="selection-option"
                    name="plan"
                    type="radio"
                    value="tinker"
                    id="tinker"
                    onClick={selectionChanged}
                />
                <label htmlFor="tinker" className="selection-label">
                    $25 Tinker level
                </label>
            </div>

            <div className="option-container">
                <input
                    className="selection-option"
                    name="plan"
                    type="radio"
                    id="macgyver"
                    value="macgyver"
                    onClick={selectionChanged}
                />
                {/* <label className="selection-label" for="mcgyver"> */}
                <label className="selection-label">$35 MacGyver level</label>
            </div>

            <div className="option-container">
                <input
                    className="selection-option"
                    name="plan"
                    type="radio"
                    id="builder"
                    value="builder"
                    onClick={selectionChanged}
                />
                {/* <label className="selection-label" for="builder"> */}
                <label className="selection-label">$50 Builder level</label>
            </div>

            <div className="option-container">
                <input
                    className="selection-option"
                    name="plan"
                    type="radio"
                    id="contractor"
                    value="contractor"
                    onClick={selectionChanged}
                />
                {/* <label className="selection-label" for="contractor"> */}
                <label className="selection-label">$100 Contractor level</label>
            </div>
            <button className="profile-button" onClick={upgradeMembership}>
                Update Membership
            </button>
        </form>
    );
};

const Membership = ({ user }) => {
    // Set selected plan useState
    let membershipLevel;
    let renewal;
    let custId;
    membershipLevel = user.user.Membership_Level;
    renewal = user.user.Membership_Auto_Renewal;
    custId = user.user.Customer_ID;
    const [showPlans, setShowPlans] = useState(false);
    const [cancel, setCancel] = useState(false);
    const [cdate, setCdate] = useState(null);
    const [sub, setSub] = useState(null);

    let membership;
    if (membershipLevel == 1) {
        membership = "Tinkerer";
    } else if (membershipLevel == 2) {
        membership = "MacGyver";
    } else if (membershipLevel == 3) {
        membership = "Builder";
    } else if (membershipLevel == 4) {
        membership = "Builder";
    }

    // Get and set subscription
    useEffect(() => {
        const fn = async () => {
            let sub = await getSubscription(custId);
            sub = JSON.parse(sub);
            setSub(sub);
            setCdate(sub.canceledDate);
        };
        fn();
    }, []);
    useEffect(() => {
        // Cancel subscription
        const fn = async () => {
            const res = await cancelSubscription(custId);
            setCdate(res.canceledDate);
        };
        if (cancel) {
            fn();
            setCancel(false);
        }
    }, [cancel]);

    const autoRenewal = renewal === 1 ? true : false;
    const updateMembership = () => {
        setShowPlans(true);
    };
    const showNormal = () => {
        setShowPlans(false);
    };
    return (
        <>
            <h1>Membership</h1>
            <div className="account-name">
                <div className="account-email">
                    <p className="light-paragraph">Current Membership Level</p>
                    <h2 className="customer-name">{membership}</h2>
                    {cdate ? (
                        <p>You membership is set to end on {cdate}</p>
                    ) : null}
                </div>
                {showPlans ? (
                    <>
                        <MembershipForm custId={custId} />
                        <button className="cancel-button" onClick={showNormal}>
                            Cancel
                        </button>
                    </>
                ) : (
                    <>
                        <div className="account-info">
                            <button
                                className="profile-button"
                                onClick={updateMembership}
                            >
                                Upgrade Membership
                            </button>
                            {cdate ? null : (
                                <button
                                    className="profile-button"
                                    onClick={() => {
                                        // Set cancel true
                                        setCancel(true);
                                    }}
                                >
                                    Cancel Subscription
                                </button>
                            )}
                        </div>
                        <div className="switch-container">
                            <label className="switch" htmlFor="auto-renewal">
                                <input
                                    type="checkbox"
                                    id="auto-renewal"
                                    checked={autoRenewal}
                                    onChange={(res) => {
                                        console.log(res);
                                    }}
                                />
                                <span className="slider round"></span>
                            </label>
                            <p>Auto Renewal</p>
                        </div>
                    </>
                )}
            </div>
        </>
    );
};

export default Membership;
