"use server";
import mysql from "mysql2/promise";
import { getIronSession } from "iron-session";
import { defaultSession, sessionOptions } from "@/app/lib";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
export const getSession = async () => {
    const session = await getIronSession(cookies(), sessionOptions);

    if (!session.isLoggedIn) {
        session.isLoggedIn = defaultSession.isLoggedIn;
    }

    return session;
};
export const login = async (formData) => {
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
        "SELECT Account_ID as accId, CONVERT(Password using utf8) as password FROM Accounts WHERE Email='" +
        formData.get("email") +
        "'";
    const result = await db.execute(query);
    const db_pass = result[0][0].password;
    console.log(db_pass);
    if (formData.get("password") != db_pass) {
        return { error: "Wrong credentials! " };
    }
    console.log("User authenticated.");
    session.isLoggedIn = true;
    session.user = result[0].accId;
    await session.save();
    redirect("/");
};
export const logout = async () => {
    const session = await getSession();
    session.destroy();
    console.log("Session destroyed. ");
    redirect("/");
};
