"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import React from "react";
import { testAddNewUser } from "@/actions/addNewUser";
import SelectStates from "./statesSelect";
import jsPDF from "jspdf";
import Toast from "../Toast";
import { PaymentForm, CreditCard } from "react-square-web-payments-sdk";
import { subscribe } from "@/actions/squareActions";
import { setMaxParserCache } from "mysql2";
import { useRouter } from "next/navigation";
import { addTransaction } from "@/actions/actions";

const appId = "sandbox-sq0idb-b3GBVpDWCRZfpKe13OsWQQ";
const locationId = "LFETGS2GE8TGC";

BigInt.prototype.toJSON = function () {
    return this.toString();
};
export default function Signupform({ waivers, genders, membershiplevel }) {
    const router = useRouter();
    const [amt, setAmt] = useState(null);
    const [accId, setAccId] = useState(null);
    const CardModal = ({ planName, custId, amt }) => {
        return (
            <div className="section">
                <PaymentForm
                    applicationId={appId}
                    locationId={locationId}
                    cardTokenizeResponseReceived={async (token) => {
                        // we’ll come back to this soon
                        let result = await subscribe(
                            token.token,
                            planName,
                            custId
                        );
                        result = JSON.parse(result);
                        if (result.status == 200) {
                            console.log("Sign up successful.");
                            addTransaction(custId, "Closed", 1, planName);
                            router.push("/");
                        } else {
                            console.log("Card tokenizer result : ", result);
                        }
                    }}
                >
                    <CreditCard>Pay {amt}</CreditCard>
                </PaymentForm>
            </div>
        );
    };
    const checkPlan = (name) => {
        if (
            name == "Tinkerer" ||
            name == "MacGyver" ||
            name == "Contractor" ||
            name == "Builder"
        )
            return true;
        return false;
    };
    const [custId, setCustId] = useState(null);
    const [showCard, setShowCard] = useState(false);
    const [showPasswords, setShowPasswords] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [plan, setPlan] = useState(null);
    const togglePasswordVisibility = () => {
        setShowPasswords((prevState) => !prevState);
    };
    useEffect(() => {
        if (checkPlan(plan)) setShowCard(true);
        switch (plan) {
            case "Tinkerer":
                setAmt(25);
                break;
            case "MacGyver":
                setAmt(35);
                break;
            case "Builder":
                setAmt(50);
                break;
            case "Contractor":
                setAmt(100);
                break;
        }
    }, [plan]);
    const [formError, setFormError] = useState(false);
    function handleFormSubmit(formData) {
        setPlan(formData.get("membership-level"));
        // console.log(formData.get("membership-level"));
        testAddNewUser(formData)
            .then((response) => {
                if (response.error) {
                    setFormError(true);
                } else {
                    setShowToast(true);
                    // if (checkPlan(plan)) setShowCard(true);
                    setCustId(response);
                    console.log("success: Added DB and Square user");
                    // alert(response);
                }
            })
            .catch((error) => {
                // Handle other potential errors, e.g., network error
            });
    }
    const downloadPDF = (text, fileName) => {
        // Set margins
        const margin = 10;
        const pageWidth = 210; // A4 page width in mm
        const pageHeight = 297; // A4 page height in mm
        const textWidth = pageWidth - 2 * margin; // Text width within margins

        // Create a new jsPDF instance
        const doc = new jsPDF({
            unit: "mm",
            format: "a4",
            orientation: "portrait",
            marginLeft: margin,
            marginRight: margin,
            marginTop: margin,
            marginBottom: margin,
        });

        // Set font size and type
        doc.setFontSize(10);
        doc.setFont("helvetica", "normal");

        // Split text into array of lines that fit within the page width
        const lines = doc.splitTextToSize(text, textWidth);

        // Add text content with specified formatting, taking care of page breaks
        let y = margin;
        lines.forEach((line, index) => {
            if (y + 12 > pageHeight) {
                // If adding this line would exceed the page height, create a new page
                doc.addPage();
                y = margin;
            }
            doc.text(line, margin, y);
            y += 12; // Increase y-coordinate for the next line
        });

        // Save PDF with specified filename
        doc.save(`${fileName}.pdf`);
    };

    return (
        <>
            {showToast && <Toast message="Account created successfully!" />}
            <p className="form-header">
                Please enter your personal info below:
            </p>
            <form action={handleFormSubmit} className="signup">
                <div className="sign-up-cont">
                    <span style={{ color: "red" }} role="alert">
                        {formError ? (
                            <>
                                First name, last name, and email cannot be
                                empty.
                                <br />
                                Password must be 8 or more characters.
                                <br />
                                Date of birth cannot be empty.
                                <br />
                                Address information cannot be empty and zip code
                                cannot be more than 5 digits long.
                            </>
                        ) : (
                            <></>
                        )}
                    </span>
                    <label htmlFor="first-name" className="sr-only">
                        First Name
                    </label>
                    <input
                        className="input"
                        type="text"
                        name="first-name"
                        placeholder="First Name"
                        id="first-name"
                        required
                    />
                    <label htmlFor="last name" className="sr-only">
                        Last name
                    </label>
                    <input
                        type="text"
                        className="input"
                        placeholder="Last Name"
                        name="last-name"
                        id="last name"
                        required
                    />
                    <label htmlFor="gender" className="sr-only">
                        Gender
                    </label>
                    <select
                        name="gender"
                        id="gender"
                        className="input"
                        defaultValue="Gender"
                    >
                        <option value="Gender" hidden>
                            Gender
                        </option>
                        {genders.map((gend, index) => (
                            <option key={index} value={gend.Gender_Name}>
                                {gend.Gender_Name}
                            </option>
                        ))}
                    </select>

                    <label htmlFor="email" className="sr-only">
                        Email
                    </label>
                    <input
                        className="input"
                        type="email"
                        placeholder={" myemail@example.com"}
                        name="email"
                        id="email"
                        required
                    />
                    <label htmlFor="phone-number" className="sr-only">
                        Phone number
                    </label>
                    <input
                        className="input"
                        type="tel"
                        placeholder="Phone number Ex: 123-456-7890"
                        name="phone-number"
                        id="phone-number"
                        required
                    />
                    <label htmlFor="date_of_birth" className="sr-only">
                        Date of Bith
                    </label>
                    <input
                        type="date"
                        id="date_of_birth"
                        name="date-of-birth"
                        className="input"
                        placeholder="Date of Birth"
                        onFocus={(e) => (e.target.type = "date")} // Change input type to 'date' when focused
                        onBlur={(e) => (e.target.type = "text")} // Change input type back to 'text' when blurred
                        onChange={(e) => (e.target.value = e.target.value)} // Ensure date format is correct
                        required
                    />
                    <label htmlFor="password" className="sr-only">
                        Password
                    </label>
                    <input
                        type={showPasswords ? "text" : "password"}
                        name="password"
                        id="password"
                        placeholder=" Password"
                        className="input"
                        required
                    />
                    <label htmlFor="re-enter_password" className="sr-only">
                        Re-enter password
                    </label>
                    <input
                        type={showPasswords ? "text" : "password"}
                        name="re-password"
                        id="re-enter_password"
                        placeholder=" Re-Enter Password"
                        className="input"
                        required
                    />
                    <div className="passowrd">
                        <label
                            htmlFor="show-passwords"
                            className="checkbox-container"
                        >
                            Show passwords
                            <input
                                className="checkbox"
                                type="checkbox"
                                id="show-passwords"
                                name="show-passwords"
                                value="show"
                                onChange={togglePasswordVisibility}
                            />
                            <span className="checkmark"></span>
                        </label>
                    </div>
                    <label htmlFor="organization" className="sr-only">
                        Organization
                    </label>
                    <input
                        type="text"
                        className="input"
                        placeholder="Organization"
                        name="organization"
                        id="organization"
                    />
                    <label htmlFor="address-first" className="sr-only">
                        Address 1st line
                    </label>
                    <input
                        type="text"
                        className="input"
                        placeholder="Address 1st line"
                        name="address-first"
                        id="address-first"
                        required
                    />
                    <label htmlFor="address-second" className="sr-only">
                        Address 2nd line
                    </label>
                    <input
                        type="text"
                        className="input"
                        placeholder={"Address 2nd line"}
                        name="address-second"
                        id="address-second"
                    />
                    <label htmlFor="address-city" className="sr-only">
                        Address City
                    </label>
                    <input
                        type="text"
                        className="input"
                        placeholder={"City"}
                        name="address-city"
                    />
                    <label htmlFor="address-zipcode" className="sr-only">
                        Zip Code
                    </label>
                    <input
                        className="input"
                        type="numbers"
                        placeholder="Zip code"
                        name="address-zipcode"
                        id="address-zipcode"
                        required
                    />
                    <label htmlFor="address-state" className="sr-only">
                        State
                    </label>
                    <SelectStates />
                    <label htmlFor="membership level" className="sr-only">
                        Membership Level
                    </label>
                    <select
                        name="membership-level"
                        id="membership level"
                        className="input"
                        defaultValue="membership"
                    >
                        <option value="membership" hidden>
                            Select a membership
                        </option>
                        {membershiplevel.map((level, index) => (
                            <option key={index} value={level.Membership_Title}>
                                {level.Membership_Title}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="waivers">
                    <label htmlFor="waivers" className="checkbox-container">
                        I have read and accept the following:
                        <input
                            type="checkbox"
                            className="checkbox"
                            id="waivers"
                            name="waiver"
                            required
                        />
                        <span className="checkmark"></span>
                    </label>
                    <ul className="lists">
                        {waivers.map((waiver, index) => (
                            <React.Fragment key={index}>
                                <li
                                    key={index}
                                    onClick={() =>
                                        downloadPDF(
                                            waiver.Waiver_Details,
                                            waiver.Waiver_Name
                                        )
                                    }
                                >
                                    {waiver.Waiver_Name}
                                </li>
                            </React.Fragment>
                        ))}
                    </ul>
                </div>
                <button type="submit" id="create-account" name="create account">
                    Create Account
                </button>
            </form>
            {showCard ? (
                <CardModal planName={plan} custId={custId} amt={amt} />
            ) : null}
            <p className="basetext">
                Already have an account?{" "}
                <Link className="link" href={"/login"}>
                    Log in
                </Link>
            </p>
        </>
    );
}
