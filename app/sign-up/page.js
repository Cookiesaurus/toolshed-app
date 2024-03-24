import Image from "next/image";
import logo from "../public/images/toolshed_logo.png";
import "./signup.css";
import { SignupForm } from "./sign-up-form";
import Signupform from "@/components/FormComponents/signupform";
// import { useState } from "react";

export default async function Page() {
    return (
        <>
            <div className="content">
                <div className="title">
                    <Image
                        src={logo}
                        alt="toolshed logo"
                        width={200}
                        height={200}
                    ></Image>
                    <h1 className="pagetitle">Create an Account</h1>
                </div>
                {/* <SignupForm></SignupForm> */}
                <Signupform></Signupform>
            </div>
        </>
    );
}