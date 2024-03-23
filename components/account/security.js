import { useState, useEffect } from "react";
const Security = () => {
    const [session, setSession] = useState(null);
    useEffect(() => {
        fetch("http://localhost:3000/api/me")
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setSession({
                    user: data.user,
                    isLoggedIn: data.isLoggedIn,
                });
            });
    }, []);
    return (
        <>
            <h1>Security</h1>
            <div className="account-name">
                <div className="account-email">
                    <p className="light-paragraph">Log-in Email</p>
                    {session && <p>{session.user.Email}</p>}
                    {/* <p>testemail@email.com</p> */}
                </div>
                <div className="account-info">
                    <button
                        type="submit"
                        id="change-password"
                        className="profile-button"
                    >
                        Change Password
                    </button>
                </div>
            </div>
        </>
    );
};

export default Security;
