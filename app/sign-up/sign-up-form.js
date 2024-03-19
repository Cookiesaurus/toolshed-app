"use server";
//NOT USING THIS FILE
import { FormEvent } from "react";
import db from "../config/db.mjs";
import Link from "next/link";
const query = "SELECT State_Name, State_Code from States";
const [results] = await db.execute(query, []);
import { z } from "zod";
import bcrypt from "bcrypt";
import { revalidatePath, revalidateTag } from "next/cache";
import { addUser } from "./addUserAccount";

var errorDisp = {
    message: "No error",
};
async function createAccount(formData) {
    // Creating a user object in zod for parsing
}
const onSubmit = (formData) => {
    "use server";
    const UserSchema = z
        .object({
            firstName: z.string(),
            lastName: z.string(),
            email: z.string().email(),
            phone: z.string().min(10).max(10), // birthday: z.date({ required_error: "Invalid Date Type" }),
            password: z.string().min(8),
            confirmPassword: z.string(),
            // username: z.string(),
            addressFirst: z.string(),
            addressSecond: z.string(),
            city: z.string(),
            state: z.string(),
            zipCode: z.string().length(5),
        })
        .refine((data) => data.password === data.confirmPassword, {
            message: "Passwords do not match",
            path: ["confirmPassword"],
        });
    try {
        const data = UserSchema.parse({
            firstName: formData.get("first-name"),
            lastName: formData.get("last-name"),
            email: formData.get("email"),
            phone: formData.get("phone-number"),
            // birthday: new Date(formData.get("birth-day")),
            password: formData.get("password"),
            confirmPassword: formData.get("re-password"),
            // username: formData.get("username"),
            addressFirst: formData.get("address-first"),
            addressSecond: formData.get("address-second"),
            city: formData.get("address-city"),
            state: formData.get("state"),
            zipCode: formData.get("address-zipcode"),
        });
        console.log(data);
        // addUser(data);
    } catch (error) {
        const errorFound = JSON.parse(error.message);
        console.log(errorFound[0].message);
        errorDisp = errorFound[0].message;
        // errorDisp.message = error.message.message;
    }
};

export async function SignupForm() {
    return (
        <form action={onSubmit} className="signup">
            <span style={{ color: "red" }}>
                {errorDisp ? errorDisp.message : ""}
            </span>
            <div className="section">
                <p className="form-header">
                    Please enter your personal info below:
                </p>
                <label htmlFor="first-name" className="sr-only">
                    First Name
                </label>
                <input
                    type="text"
                    name="first-name"
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
                    name="last-name"
                />
                <label htmlFor="name-title" className="sr-only">
                    Title
                </label>
                <input
                    className="input"
                    placeholder={" Title"}
                    id="name-title"
                    name="name-title"
                />
                <label htmlFor="organization" className="sr-only">
                    Organization
                </label>
                <input
                    className="input"
                    placeholder={" Organization"}
                    id="organization"
                    name="organization"
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
                    name="email"
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
                    name="phone-number"
                />
                {/* <label htmlFor="birth-day" className="sr-only">
                    Birthday
                </label> */}
                {/* <p className="form-header">
                    Birthday:
                    <input
                        className="input"
                        type="date"
                        placeholder={"Birthday"}
                        required
                        id="birth-day"
                        name="birth-day"
                    />
                </p> */}
            </div>

            <div className="section">
                <p className="form-header">
                    Please enter your account credentials:
                </p>
                {/* <label htmlFor="username" className="sr-only">
                    Username
                </label>
                <input
                    className="input"
                    placeholder={" Username"}
                    required
                    id="username"
                    name="username"
                /> */}
                <label htmlFor="password" className="sr-only">
                    Password
                </label>
                <input
                    className="input"
                    placeholder={" Password"}
                    required
                    id="password"
                    type="password"
                    name="password"
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
                    name="re-password"
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
                    name="address-first"
                />
                <label htmlFor="address-second" className="sr-only">
                    Address 2nd line
                </label>
                <input
                    className="input"
                    placeholder={"Address 2nd line"}
                    id="address-second"
                    name="address-second"
                />
                <label htmlFor="address-city" className="sr-only">
                    Address City
                </label>
                <input
                    className="input"
                    placeholder={"City"}
                    required
                    id="address-city"
                    name="address-city"
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
                        <option value="United States" disabled="disabled">
                            United States
                        </option>
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
                    name="address-zipcode"
                />
                <div>
                    <button type="submit">Create Account</button>
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
