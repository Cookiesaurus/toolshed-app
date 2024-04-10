"use client";
import { useRouter } from "next/navigation";
import { addSubscriptionAction } from "@/actions/actions";
import { PaymentForm, CreditCard } from "react-square-web-payments-sdk";
import { subscribe } from "@/actions/squareActions";
import { useEffect, useState } from "react";
import { getLoggedInCustId } from "@/components/Square/Customer";
import { useSearchParams } from "next/navigation";
const appId = "sandbox-sq0idb-b3GBVpDWCRZfpKe13OsWQQ";
const locationId = "LFETGS2GE8TGC";
import { DOMElement } from "react";

export default function Page() {
    const router = useRouter();
    const custId = useSearchParams().get("custid");
    // console.log("Customer ID is : ", custId);
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [addCard, setAddCard] = useState(false);
    const selectionChanged = (res) => {
        setSelectedPlan(res.target.value);
    };
    const setSaveOption = (res) => {
        setAddCard(res.target.checked);
    };

    return (
        <>
            <div className="page-content">
                <h1 className="page-title">Select a Membership Level</h1>
                <div className="section">
                    <form className="select-level" action={addSubscriptionAction}>
                        <div className="option-container">
                            <input className="selection-option" name="plan" type="radio" value="tinker" id="tinker"
                            onClick={selectionChanged}
                            />
                            <label className="selection-label" for='tinker'>$25 Tinker level</label>
                        </div>
                        
                        <div className="option-container">
                            <input className="selection-option" name="plan" type="radio" id="macgyver" value="macgyver"
                                onClick={selectionChanged}
                            />
                            <label className="selection-label" for='mcgyver'>$35 MacGyver level</label>
                        </div>
                        
                        <div className="option-container">
                            <input className="selection-option" name="plan" type="radio" id="builder" value="builder"
                                onClick={selectionChanged}
                            />
                            <label className="selection-label" for='builder'>$50 Builder level</label>
                        </div>
                        
                        <div className="option-container">
                            <input className="selection-option" name="plan" type="radio" id="contractor" value="contractor"
                                onClick={selectionChanged}
                            />
                            <label className="selection-label" for='contractor'>$100 Contractor level</label>
                        </div>

                        <div className="option-container">
                            <input className="selection-option" name="save" type="checkbox" id="save"
                                onClick={setSaveOption}
                            />
                            <label className="selection-label" for='save'>Do you want to save card on file?</label>
                        </div>
                    </form>
                </div>
                <div className="section">
                    <PaymentForm
                        applicationId={appId}
                        locationId={locationId}
                        cardTokenizeResponseReceived={async (token) => {
                            // we’ll come back to this soon
                            console.log("Token is : ", token);
                            let result = await subscribe(
                                token,
                                selectedPlan,
                                addCard,
                                custId
                            );
                            result = JSON.parse(result);
                            if (result.status == 200) {
                                console.log("Sign up successful.");
                                router.push("/");
                            } else {
                                console.log("Card tokenizer result : ", result);
                            }
                        }}
                    >
                        <CreditCard />
                    </PaymentForm>
                </div>
            </div>
        </>
    );
}
