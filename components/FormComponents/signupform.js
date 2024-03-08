"use client";
import Link from "next/link";
import { z } from "zod";
import { useEffect, useState } from "react";
import { createNewUser } from "@/actions/addNewUser";
import UserSchema from "./newUserSchema";
import SelectStates from "./statesSelect";

export default function Signupform() {
    const [formError, setFormError] = useState(null);
    const createUser = async (formData) => {
        const user = {
            firstName: formData.get("first-name"),
            lastName: formData.get("last-name"),
            email: formData.get("email"),
            phone: formData.get("phone-number"),
            password: formData.get("password"),
            confirmPassword: formData.get("re-password"),
            addressFirst: formData.get("address-first"),
            addressSecond: formData.get("address-second"),
            city: formData.get("address-city"),
            state: formData.get("state"),
            zipCode: formData.get("address-zipcode"),
        };

        const result = UserSchema.safeParse(user);
        if (!result.success) {
            let errorMessage = "";
            result.error.issues.forEach((issue) => {
                errorMessage += issue.path[0] + ":" + issue.message + ".\n";
            });
            const issue = result.error.issues[0];
            setFormError({
                message: issue.message,
                path: issue.path[0],
            });
            return;
        }
        const response = await createNewUser(result.data);
        console.log(response);
    };

    return (
        <>
            <form action={createUser} className="signup">
                <span style={{ color: "red" }}>
                    {formError
                        ? formError.path + " : " + formError.message
                        : ""}
                </span>
                <div className="section">
                    <p className="form-header">
                        Please enter your personal info below:
                    </p>
                    <label htmlFor="first-name" className="sr-only">
                        First Name
                    </label>
                    <input
                        className="input"
                        type="text"
                        name="first-name"
                        placeholder="First Name"
                    />
                    <label htmlFor="last name" className="sr-only">
                        Last name
                    </label>
                    <input
                        type="text"
                        className="input"
                        placeholder="Last Name"
                        name="last-name"
                    />
                    <label htmlFor="name-title" className="sr-only">
                        Title
                    </label>
                    <input
                        type="text"
                        className="input"
                        placeholder="Title"
                        name="name-title"
                    />
                    <label htmlFor="organization" className="sr-only">
                        Organization
                    </label>
                    <input
                        type="text"
                        className="input"
                        placeholder="Organization"
                        name="organization"
                    />
                    <label htmlFor="email" className="sr-only">
                        Email
                    </label>
                    <input
                        className="input"
                        type="email"
                        placeholder={" myemail@example.com"}
                        name="email"
                    />
                    <label htmlFor="phone-number" className="sr-only">
                        Phone number
                    </label>
                    <input
                        className="input"
                        type="tel"
                        placeholder="Phone number Ex: 123-456-7890"
                        name="phone-number"
                    />
                </div>
                <div className="section">
                    <label htmlFor="password" className="sr-only">
                        Password
                    </label>
                    <input
                        className="input"
                        placeholder="Password"
                        type="password"
                        name="password"
                    />
                    <label htmlFor="re-password" className="sr-only">
                        Re-Enter password
                    </label>
                    <input
                        className="input"
                        placeholder="Re-enter password"
                        type="password"
                        name="re-password"
                    />
                </div>
                <div className="section">
                    <label htmlFor="address-first" className="sr-only">
                        Address 1st line
                    </label>
                    <input
                        type="text"
                        className="input"
                        placeholder="Address 1st line"
                        name="address-first"
                    />
                    <label htmlFor="address-second" className="sr-only">
                        Address 2nd line
                    </label>
                    <input
                        type="text"
                        className="input"
                        placeholder={"Address 2nd line"}
                        name="address-second"
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
                    <div>
                        <label htmlFor="address-state" className="sr-only">
                            State
                        </label>
                        <SelectStates />
                    </div>
                    <div>
                        <label htmlFor="address-country" className="sr-only">
                            Country
                        </label>
                        <select
                            className="select"
                            defaultValue="United States"
                            name="country"
                        >
                            <option value="United States" disabled="disabled">
                                United States
                            </option>
                        </select>
                    </div>
                    <label htmlFor="address-zipcode" className="sr-only">
                        Zip Code
                    </label>
                    <input
                        className="input"
                        type="numbers"
                        placeholder="Zip code"
                        name="address-zipcode"
                    />
                    <button type="submit">Create Account</button>
                </div>
                <p className="basetext">
                    Already have an account?{" "}
                    <Link className="link" href={"/login"}>
                        Log in
                    </Link>
                </p>
            </form>
        </>
    );
}
