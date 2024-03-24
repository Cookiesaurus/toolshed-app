import Link from "next/link";
import { useState, useEffect } from "react";
import "./profile.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
const Profile = () => {
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
            <h1>Profile</h1>
            <div className="account-name">
                <div className="account-info">
                    <p>Username</p>
                    <Link href={""}>
                        <FontAwesomeIcon
                            icon={faPencil}
                            style={{ backgroundColor: "white" }}
                        />
                    </Link>
                </div>
                <div className="account-email">
                    <p className="light-paragraph">Email</p>
                    {session && <p>{session.user.Email}</p>}
                </div>
            </div>
            <div className="address-cont">
                <div className="account-info">
                    <p>Addresses</p>
                    <Link href={""} className="new-address">
                        {" "}
                        + Add
                    </Link>
                </div>
                <div>
                    <div className="account-info">
                        <p className="light-paragraph">Default Address</p>
                        <Link href={"/"}>
                            <FontAwesomeIcon
                                icon={faPencil}
                                style={{ backgroundColor: "white" }}
                            />
                        </Link>
                    </div>
                    <div className="address-info">
                        {session &&
                            session.user.First_Name &&
                            session.user.Last_Name && (
                                <p>
                                    {session.user.First_Name +
                                        " " +
                                        session.user.Last_Name}
                                </p>
                            )}
                        {session && session.user.Address_Line1 && (
                            <p>{session.user.Address_Line1}</p>
                        )}
                        {session && session.user.Address_Line2 && (
                            <p>{session.user.Address_Line2}</p>
                        )}
                        {session && session.user.City && (
                            <p>{session.user.City}</p>
                        )}
                        {session && session.user.State && (
                            <p>{session.user.State}</p>
                        )}
                        {session && session.user.Postal_Code && (
                            <p>{session.user.Postal_Code}</p>
                        )}
                        {session && <p>USA</p>}
                        <p>Phone Number</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Profile;
