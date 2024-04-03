"use client";
import { addSubscriptionAction } from "@/actions/actions";
import { PaymentForm, CreditCard } from "react-square-web-payments-sdk";
import { submitFirstTimePayment } from "@/actions/squareActions";
import { useEffect, useState } from "react";
import { getLoggedInCustId } from "./Customer";
const appId = "sandbox-sq0idb-b3GBVpDWCRZfpKe13OsWQQ";
const locationId = "LFETGS2GE8TGC";

export default function Page() {
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [addCard, setAddCard] = useState(false);
    const selectionChanged = (res) => {
        setSelectedPlan(res.target.value);
    };
    const setSaveOption = (res) => {
        setAddCard(res.target.checked);
    };
    getLoggedInCustId();
    return (
        <>
            <div>
                <form action={addSubscriptionAction}>
                    <div className="bigbox">
                        <input
                            name="plan"
                            type="radio"
                            value="tinker"
                            id="tinker"
                            onClick={selectionChanged}
                        />
                        <label className="box">Tinker level</label>
                        <input
                            name="plan"
                            type="radio"
                            id="macgyver"
                            value="macgyver"
                            onClick={selectionChanged}
                        />
                        <label className="box">MacGyver level</label>
                        <input
                            name="plan"
                            type="radio"
                            id="builder"
                            value="builder"
                            onClick={selectionChanged}
                        />
                        <label className="box">Builder level</label>
                        <input
                            name="plan"
                            type="radio"
                            id="contractor"
                            value="contractor"
                            onClick={selectionChanged}
                        />
                        <label className="box">Contractor level</label>
                    </div>
                    <div>
                        <input
                            name="save"
                            type="checkbox"
                            onClick={setSaveOption}
                            checked
                        />
                        <label>Save card on file</label>
                    </div>
                </form>
            </div>
            <PaymentForm
                applicationId={appId}
                locationId={locationId}
                cardTokenizeResponseReceived={async (token) => {
                    // we’ll come back to this soon
                    const result = await submitFirstTimePayment(
                        token.token,
                        selectedPlan,
                        addCard
                    );
                    console.log(result);
                }}
            >
                <CreditCard>Add Card</CreditCard>
            </PaymentForm>
        </>
    );
}
