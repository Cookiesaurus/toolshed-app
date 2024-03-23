import { getSession } from "@/actions/actions";
import { sessionOptions } from "@/app/lib";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const GET = async () => {
    const ironSession = await getIronSession(cookies(), sessionOptions);
    const session = await getSession();
    console.log("Current Session : ", session);
    let response = new NextResponse(
        JSON.stringify({ isLoggedIn: session.isLoggedIn, user: session.user })
    );
    return response;
};
