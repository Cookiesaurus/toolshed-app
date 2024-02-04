import './login.css';
export default function Page() {
    return (<>
    <div className="loginbox">
        <img src="/app/img/toolshed_logo.png" alt="toolshed logo"></img>
        <h1 className='basetext'>Sign In</h1>
        <input className="basetext" type="text" placeholder={"Email address"}/>
        <input className="basetext" type="text" placeholder={"Password"}/>
        <button className="button"  type="button">Sign In</button>
        <p className='basetext'>New to Toolshed? <a className="link" href="">Sign up</a></p>
        <p className='basetext'>Forgot password? <a className="link" href="">Click here</a></p>
    </div>
    </>)
}