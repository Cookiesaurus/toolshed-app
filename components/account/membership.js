"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { updateSubscription } from "@/actions/squareActions";

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
        <form className="select-level">
            <div className="option-container">
                <input
                    className="selection-option"
                    name="plan"
                    type="radio"
                    value="tinker"
                    id="tinker"
                    onClick={selectionChanged}
                />
                <label className="selection-label">
                    {/* for="tinker" */}
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
            <button className="option-container" onClick={upgradeMembership}>
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
                    <p className="light-paragraph">Current Membership Type</p>
                    <h2 className="customer-name">{membership}</h2>
                </div>
                {showPlans ? (
                    <>
                        <MembershipForm custId={custId} />
                        <button onClick={showNormal}>Back</button>
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
                            <Link href={""} className="light-paragraph">
                                Cancel Subscription
                            </Link>
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
