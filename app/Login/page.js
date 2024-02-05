import './login.css';
export default function Page() {
    return (<>
    <div className="content">
        <div className="loginbox">
            <img src="/app/img/toolshed_logo.png" alt="toolshed logo"></img>
            <h1 className='pagetitle'>Sign In</h1>
            <div><input className="input" type="text" placeholder={" Email address"}/></div>
            <div><input className="input" type="text" placeholder={" Password"}/></div>
            <button className="button"  type="button">Sign In</button>
            <p className='basetext'>New to Toolshed? <a className="link" href="">Sign up</a></p>
            <p className='basetext'>Forgot password? <a className="link" href="">Click here</a></p>
        </div>
    </div>
    </>)
}