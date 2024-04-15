"use client"
import Image from "next/image";
import logo from "../public/images/toolshed_logo.png";
import Link from "next/link";
import { login } from "@/actions/actions";
import { useState } from "react";
export default function Page() {
  const [showPasswords, setShowPasswords] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPasswords((prevState) => !prevState);
  };
  function handleLogin(formData) {
    login(formData)
        .then(response => {
            if (response && response.error) {
                alert("Invalid username or password")
            } else {
                // Proceed with the next steps after successful login
            }
        })
        .catch(error => {
            console.error("Error:", error);
            // Handle other potential errors, e.g., network error
        });
}

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
          <h1 className="pagetitle">Sign In</h1>
        </div>
        <form action={handleLogin} className="loginbox">
          <div>
            <label htmlFor="login-email" className="sr-only">
              Email
            </label>
            <input
              name="email"
              className="input"
              type="email"
              placeholder={" myemail@example.com"}
            />
          </div>
          <div>
            <label htmlFor="login-password" className="sr-only">
              Submit
            </label>
            <input
              name="password"
              className="input"
              type={showPasswords ? "text" : "password"}
              placeholder={" Password"}
              id="login-password"
            />
            
          </div>
          <label htmlFor="show-passwords" className="checkbox-container">
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
          <div>
            <button value={"Submit"} id="login-submit">
              Login
            </button>
          </div>
        </form>
        <div className="options">
          <p className="redirect-links">
            New to Toolshed?{" "}
            <Link className="link" href={"/sign-up"}>
              Sign up
            </Link>
          </p>
          <p className="redirect-links">
            Forgot password?{" "}
            <Link className="link" href="" aria-label="Go to forgot password">
              Click here
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
