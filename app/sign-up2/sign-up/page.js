"use client";
import "./signup.css";
import Link from "next/link";
import Signupform from "@/components/FormComponents/signupform";

const onSubmit = (data) => {
    console.log(data);
};
export default function Page() {
    return (
        <>
            <div className="content">
                <div className="title">
                    <h1 className="pagetitle">Create an Account</h1>
                </div>
                <Signupform />
                <p className="basetext">
                    Already have an account?{" "}
                    <Link className="link" href={"/login"}>
                        Log in
                    </Link>
                </p>
            </div>
        </>
    );
}
