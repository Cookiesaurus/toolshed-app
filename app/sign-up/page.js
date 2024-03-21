import Image from "next/image";
import logo from '../public/images/toolshed_logo.png';
import Link from "next/link";
import './signup.css';
import db from '../config/db';
import { formHandler } from "@/lib/actions/formHandler";


export default async function Page() {
		const query = "SELECT State_Name, State_Code from US_States"
		const value = []
		const [results] = await db.execute(query, value)

    return (<>
    <div className="content">
        <div className="title">
            <Image src={logo} alt="toolshed logo" width={200} height={200}></Image>
            <h1 className='pagetitle'>Create an Account</h1>
        </div>
        <form className="signup" action={formHandler}>
            <div className="section">
                <p className="form-header">Please enter your personal info below:</p>
                <label htmlFor="first-name" className="sr-only">First Name</label>
                <input className="input" placeholder={" First Name"} required id="first-name" name="firstName"/>
                <label htmlFor="last-name" className="sr-only">Last name</label>
                <input className="input" placeholder={" Last Name"} required id="last-name" name="lastName"/>
                <label htmlFor="name-title" className="sr-only">Title</label>
                <input className="input" placeholder={" Title"} id="name-title" name="title"/>
                <label htmlFor="organization" className="sr-only">Organization</label>
                <input className="input" placeholder={" Organization"} id="organization" name="organization"/>
                <label htmlFor="email" className="sr-only">Email</label>
                <input className="input" type="email" placeholder={" myemail@example.com"} required id="email" name="email"/>
                <label htmlFor="phone-number" className="sr-only">Phone number</label>
                <input className="input" type="tel" placeholder={" Phone number Ex: 123-456-7890"} required id="phone-number" name="phone"/>
            </div>

            <div className="section">
                <p className="form-header">Please enter your account credentials:</p>
                <label htmlFor="username" className="sr-only">Username</label>
                <input className="input" placeholder={" Username"} required id="username" name="user"/>
                <label htmlFor="password" className="sr-only">Password</label>
                <input className="input" placeholder={" Password"} required id="password" type="password" name="password"/>
                <label htmlFor="re-password" className="sr-only">Re-Enter password</label>
                <input className="input" placeholder={" Re-enter password"} required type="password" id="re-password" name="passwordTwo"/>
            </div>

            <div className="section">
                <p className="form-header">Please enter your account details</p>
                <label htmlFor="address-first" className="sr-only">Address 1st line</label>
                <input className="input" placeholder={"Address 1st line"} required id="address-first" name="addressLineOne"/>
                <label htmlFor="address-second" className="sr-only">Address 2nd line</label>
                <input className="input" placeholder={"Address 2nd line"} id="address-second" name="addressLineTwo"/>
                <label htmlFor="address-city" className="sr-only">Address City</label>
                <input className="input" placeholder={"City"} required id="address-city" name="addressCity"/>
                <div>
                    <label htmlFor="address-state" className="sr-only">State</label>
                    <select className="select" name="state" required id="address-state">
    			        {results.map(result => <option key={result.State_Code} value={result.State_Code}>{result.State_Name}</option>)}
                    </select>
                </div>
                <label htmlFor="address-zipcode" className="sr-only"> Zip Code</label>
                <input className="input" type="numbers" placeholder="Zip code" id="address-zipcode" name="zipcode"/>
            </div>
            <div className="section">
                    <p className="form-header">Select your membership level</p>
                    <label htmlFor="membership-level" className="sr-only">Membership Level</label>
                    <select className="select" name="membershipLevel" required id="membership-level">
                        <option value="Tinkerer Level"> Tinkerer Level  — $25 per year and you can rent five tools at a time*.  This level is for individuals only </option>
                        <option value="MacGyver Level"> MacGyver Level — $35 per year and you can rent 10 tools at a time*.  This level is for individuals only. </option>
                        <option value="Builder Level"> Builder Level — $50 per year and you can rent 25 tools at a time*.  This level is for individuals only. </option>
                        <option value="Contractor Level"> Contractor Level — $100 per year, two users, and you can rent 50 tools at a time*.  This level is also for businesses and community organizations.  </option>
                    </select>
                </div>
            <p className='basetext'>Already have an account? <Link className="link" href={"/login"}>Log in</Link></p>

            <div className="section">
                <label htmlFor="user agreements" className='checkbox-container' >
                    I have read and accept the following
                    <input type="checkbox" className='checkbox' id="user agreements" name='agreements' value="Accept aggreements" required/>
                    <span className="checkmark"></span>
                </label>
                <ul>
                    <li>Tool Waiver and Indemnification</li>
                    <li>Tool Lending Agreement</li>
                </ul>
            </div>

            <div className="section">
                    <button type="submit" value={"Submit"} id="create-account">Create Account</button>
            </div>
        </form>
    </div>
    </>)
}
