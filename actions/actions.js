"use server";
import mysql from "mysql2/promise";
import { getIronSession } from "iron-session";
import { defaultSession, sessionOptions } from "@/app/lib";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { addSubscription } from "./squareActions";
export const getSession = async () => {
    const session = await getIronSession(cookies(), sessionOptions);

    if (!session.isLoggedIn) {
        session.isLoggedIn = false;
    }

    return session;
};
export const login = async (formData) => {
    let user = null;
    let dbPass = null;
    const session = await getIronSession(cookies(), sessionOptions);
    console.log("Login details recieved. ");
    const db = await mysql.createConnection({
        host: process.env.DB_HOSTNAME,
        database: process.env.DB,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
    });
    const query =
        "SELECT *, AES_Decrypt(Password ,'') as pwd FROM Accounts WHERE Email='" +
        formData.get("email") +
        "'";
    const result = await db.execute(query).then((res) => {
        user = res[0][0];
        dbPass = res[0][0] ? res[0][0].pwd.toString() : null;
    });
    if (!dbPass || formData.get("password") != dbPass) {
        console.log("Wrong credentials!");
        return { error: "Wrong credentials! " };
    }
    console.log("User authenticated.");
    session.user = user;
    session.isLoggedIn = true;
    await session.save().then(() => {
        console.log("User logged in.");
        let auth = user.Privilege_Level;
        if(auth == 4 || auth == 5){
            redirect('/admin/dashboard')
        }else{
            redirect('/')
        }

    });
    // const db_pass = result[0][0] ? result[0][0].pwd : undefined;
};
export const logout = async () => {
    const session = await getSession();
    console.log("Logging out.");
    session.destroy();
    redirect("/login");
};

export const addSubscriptionAction = async (formData) => {
    const result = await addSubscription(formData.get("plan"));
};

export const changePassword = async (formData) => {
    console.log(formData)
}
