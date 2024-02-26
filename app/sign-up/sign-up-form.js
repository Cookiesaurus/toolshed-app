import { SubmitButton } from "@/components/FormComponents/submitButton";
import db from "../config/db.mjs";
import Link from "next/link";
const query = "SELECT State_Name, State_Code from US_States";
const [results] = await db.execute(query, []);
import { z } from "zod";

async function createAccount(event) {
    "use server";
    event.preventDefault();

    try{
        const formData = new FormData(event.currentTarget)
        print(formData);
    }
    catch(error){
        print(error);
    }
    return ("OK");
}

export function SignupForm() {
    return (
        <form onSubmit={createAccount} className="signup" method="post">
            <div className="section">
                <p className="form-header">
                    Please enter your personal info below:
                </p>
                <label htmlFor="first-name" className="sr-only">
                    First Name
                </label>
                <input
                    className="input"
                    placeholder={" First Name"}
                    required
                    id="first-name"
                />
                <label htmlFor="last name" className="sr-only">
                    Last name
                </label>
                <input
                    className="input"
                    placeholder={" Last Name"}
                    required
                    id="last-name"
                />
                <label htmlFor="name-title" className="sr-only">
                    Title
                </label>
                <input
                    className="input"
                    placeholder={" Title"}
                    id="name-title"
                />
                <label htmlFor="organization" className="sr-only">
                    Organization
                </label>
                <input
                    className="input"
                    placeholder={" Organization"}
                    id="organization"
                />
                <label htmlFor="email" className="sr-only">
                    Email
                </label>
                <input
                    className="input"
                    type="email"
                    placeholder={" myemail@example.com"}
                    required
                    id="email"
                />
                <label htmlFor="phone-number" className="sr-only">
                    Phone number
                </label>
                <input
                    className="input"
                    type="tel"
                    placeholder={" Phone number Ex: 123-456-7890"}
                    required
                    id="phone-number"
                />
                <label htmlFor="birth-day" className="sr-only">
                    Birthday
                </label>
                <p className="form-header">
                    Birthday:
                    <input
                        className="input"
                        type="date"
                        placeholder={"Birthday"}
                        required
                        id="birth-day"
                    />
                </p>
            </div>

            <div className="section">
                <p className="form-header">
                    Please enter your account credentials:
                </p>
                <label htmlFor="username" className="sr-only">
                    Username
                </label>
                <input
                    className="input"
                    placeholder={" Username"}
                    required
                    id="username"
                />
                <label htmlFor="password" className="sr-only">
                    Password
                </label>
                <input
                    className="input"
                    placeholder={" Password"}
                    required
                    id="password"
                    type="password"
                />
                <label htmlFor="re-password" className="sr-only">
                    Re-Enter password
                </label>
                <input
                    className="input"
                    placeholder={" Re-enter password"}
                    required
                    type="password"
                    id="re-password"
                />
            </div>

            <div className="section">
                <p className="form-header">Please enter your account details</p>
                <label htmlFor="address-first" className="sr-only">
                    Address 1st line
                </label>
                <input
                    className="input"
                    placeholder={"Address 1st line"}
                    required
                    id="address-first"
                />
                <label htmlFor="address-second" className="sr-only">
                    Address 2nd line
                </label>
                <input
                    className="input"
                    placeholder={"Address 2nd line"}
                    id="address-second"
                />
                <label htmlFor="address-city" className="sr-only">
                    Address City
                </label>
                <input
                    className="input"
                    placeholder={"City"}
                    required
                    id="address-city"
                />
                <div>
                    <label htmlFor="address-state" className="sr-only">
                        State
                    </label>
                    <select
                        className="select"
                        name="state"
                        required
                        id="address-state"
                    >
                        <option value="">Select a State</option>
                        {results.map((result) => (
                            <option
                                key={result.State_Code}
                                value={result.State_Code}
                            >
                                {result.State_Name}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="address-country" className="sr-only">
                        Country
                    </label>
                    <select
                        className="select"
                        defaultValue="United States"
                        name="country"
                        required
                        id="address-country"
                    >
                        <option value="United States">United States</option>
                    </select>
                </div>
                <label htmlFor="address-zipcode" className="sr-only">
                    {" "}
                    Zip Code
                </label>
                <input
                    className="input"
                    type="numbers"
                    placeholder="Zip code"
                    id="address-zipcode"
                />
                <div>
                    <SubmitButton text={"Create Account"} />
                </div>
            </div>
            <p className="basetext">
                Already have an account?{" "}
                <Link className="link" href={"/login"}>
                    Log in
                </Link>
            </p>
        </form>
    );
}
