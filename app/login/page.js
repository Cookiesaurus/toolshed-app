import Image from "next/image";
import logo from '../public/images/toolshed_logo.png';
import './login.css';
import Link from "next/link";
import { formHandler } from "@/lib/actions/formHandler";
export default function Page() {
    return (<>
    <div className="content">
        <div className="title">
            <Image src={logo} alt="toolshed logo" width={200} height={200} priority={true}></Image>
            <h1 className='pagetitle'>Sign In</h1>
        </div>
        <form className="loginbox" action={formHandler}>
            <div>
                <label htmlFor="login-email" className="sr-only">Email</label>
                <input className="input" type="email" placeholder={" myemail@example.com"} name="email"/>
            </div>
            <div>
                <label htmlFor="login-password" className="sr-only">Submit</label>
                <input className="input" type="password" placeholder={" Password"} id="login-password" name="password"/>
            </div>
            <div>
                <button value={"Submit"} id="login-submit">Login</button>
            </div>
        </form>
        <div className="options">
            <p className="redirect-links">New to Toolshed? <Link className="link" href={"/sign-up"}>Sign up</Link></p>
            <p className="redirect-links">Forgot password? <Link className="link" href="" aria-label='Go to forgot password'>Click here</Link></p>
        </div>
    </div>
    </>)
}