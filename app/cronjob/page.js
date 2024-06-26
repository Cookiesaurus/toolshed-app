"use client";
import { lateToolPayment, getSession } from "@/actions/actions";
import { useEffect, useState } from "react";

export default function Page() {
    const [user, setUser] = useState(null);
    const [pay, setPay] = useState(false);
    const makeLatePayment = () => {
        setPay(true);
    };
    useEffect(() => {
        const fn = async () => {
            let session = await getSession();
            setUser(session.user);
        };
        fn();
    }, []);
    useEffect(() => {
        const fn = async () => {
            if (user && pay) {
                const res = await lateToolPayment(user.Customer_ID);
                console.log("HI", res);
                setPay(false);
            }
        };
        fn();
    }, [pay]);
    return (
        <>
            <div>
                <button onClick={makeLatePayment}>
                    Make Late Fee Payments
                </button>
            </div>
        </>
    );
}
