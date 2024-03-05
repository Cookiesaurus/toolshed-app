"use client";
import { SubmitButton } from "./submitButton";
import Link from "next/link";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { useState } from "react";

function onSubmit() {}

const Signupform = () => {
    const [dataa, setDataa] = useState([]);
    fetch("http://localhost:3000/sign-up2/sign-up/api")
        .then((res) => res.json())
        .then((data) => {
            setDataa(data.states);
        });
    const { register, handleSubmit, errors } = useForm();
    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className="signup">
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
                        {...register("firstName")}
                    />
                    <label htmlFor="last name" className="sr-only">
                        Last name
                    </label>
                    <input
                        type="text"
                        className="input"
                        placeholder="Last Name"
                        name="last-name"
                        {...register("lastName")}
                    />
                    <label htmlFor="name-title" className="sr-only">
                        Title
                    </label>
                    <input
                        type="text"
                        className="input"
                        placeholder="Title"
                        name="name-title"
                        {...register("title")}
                    />
                    <label htmlFor="organization" className="sr-only">
                        Organization
                    </label>
                    <input
                        type="text"
                        className="input"
                        placeholder="Organization"
                        name="organization"
                        {...register("org")}
                    />
                    <label htmlFor="email" className="sr-only">
                        Email
                    </label>
                    <input
                        className="input"
                        type="email"
                        placeholder={" myemail@example.com"}
                        name="email"
                        {...register("email")}
                    />
                    <label htmlFor="phone-number" className="sr-only">
                        Phone number
                    </label>
                    <input
                        className="input"
                        type="tel"
                        placeholder="Phone number Ex: 123-456-7890"
                        name="phone-number"
                        {...register("phone")}
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
                        {...register("password")}
                    />
                    <label htmlFor="re-password" className="sr-only">
                        Re-Enter password
                    </label>
                    <input
                        className="input"
                        placeholder="Re-enter password"
                        type="password"
                        name="re-password"
                        {...register("repassword")}
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
                        {...register("addressFirst")}
                    />
                    <label htmlFor="address-second" className="sr-only">
                        Address 2nd line
                    </label>
                    <input
                        type="text"
                        className="input"
                        placeholder={"Address 2nd line"}
                        name="address-second"
                        {...register("addressSecond")}
                    />
                    <label htmlFor="address-city" className="sr-only">
                        Address City
                    </label>
                    <input
                        type="text"
                        className="input"
                        placeholder={"City"}
                        name="address-city"
                        {...register("city")}
                    />
                    <div>
                        <label htmlFor="address-state" className="sr-only">
                            State
                        </label>
                        <select
                            className="select"
                            name="state"
                            id="address-state"
                            {...register("state")}
                        >
                            <option value="">Select a State</option>
                            {dataa.map((result) => (
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
                            {...register("country")}
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
                        {...register("zip")}
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
        </>
    );
};
export default Signupform;
