import Image from "next/image";
import logo from '../public/images/toolshed_logo.png';
import './login.css';
export default function Page() {
    return (<>
    <div className="content">
        <div className="title">
            <Image src={logo} alt="toolshed logo" width={200} height={200}></Image>
            <h1 className='pagetitle'>Sign In</h1>
        </div>
        <form className="loginbox">
            <div><input className="input" type="email" placeholder={" myemail@example.com"}/></div>
            <div><input className="input" type="password" placeholder={" Password"}/></div>
            <div><input className="button" type="submit" value={"Submit"}></input></div>
            <p className='basetext'>New to Toolshed? <a className="link" href="">Sign up</a></p>
            <p className='basetext'>Forgot password? <a className="link" href="">Click here</a></p>
        </form>
    </div>
    </>)
}