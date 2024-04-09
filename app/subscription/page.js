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
                        />
                        <label>Save card on file</label>
                    </div>
                </form>
                <PaymentForm
                    applicationId={appId}
                    locationId={locationId}
                    cardTokenizeResponseReceived={async (token) => {
                        // we’ll come back to this soon
                        console.log("Token is : ", token);
                        let result = await subscribe(
                            token.token,
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
        </>
    );
}
