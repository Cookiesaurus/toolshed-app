"use client";
import { CreditCard, PaymentForm } from "react-square-web-payments-sdk";
import { submitPayment } from "@/actions/actions";
import { getCustomers, getCustomerByEmail } from "@/components/Square/Customer";
import { CustomersApi } from "square";

export default function Page() {
    const appId = "sandbox-sq0idb-b3GBVpDWCRZfpKe13OsWQQ";
    const locationId = "LFETGS2GE8TGC";
    const customer = getCustomerByEmail("seactoolshed@exapple.edu");
    return (
        <>
            <PaymentForm
                applicationId={appId}
                locationId={locationId}
                cardTokenizeResponseReceived={async (token) => {
                    // we’ll come back to this soon
                    const result = await submitPayment(token.token);
                    console.log(result);
                }}
            >
                <CreditCard />
            </PaymentForm>
        </>
    );
}
