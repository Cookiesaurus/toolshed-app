"use server";
import mysql from "mysql2/promise";
import { getIronSession } from "iron-session";
import { defaultSession, sessionOptions } from "@/app/lib";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
export const getSession = async () => {
    const session = await getIronSession(cookies(), sessionOptions);

    if (!session.isLoggedIn) {
        session.isLoggedIn = false;
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
        "SELECT *, CONVERT(Password using utf8) as pwd FROM Accounts WHERE Email='" +
        formData.get("email") +
        "'";
    const result = await db.execute(query);
    const db_pass = result[0][0] ? result[0][0].pwd : undefined;
    if (!db_pass && formData.get("password") != db_pass) {
        return { error: "Wrong credentials! " };
    }
    console.log("User authenticated.");
    session.user = result[0][0];
    session.firstName = result[0][0].First_Name;
    session.isLoggedIn = true;
    await session.save().then(() => {
        console.log("User logged in.");
        redirect("/");
    });
};
export const logout = async () => {
    const session = await getSession();
    console.log("Logging out.");
    session.destroy();
    redirect("/");
};
