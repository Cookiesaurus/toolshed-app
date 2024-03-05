import db from "@/app/config/db.mjs";
import { NextResponse } from "next/server";
export async function GET() {
    const query = "SELECT State_Name, State_Code from States";
    const [results] = await db.execute(query, []);
    var states = [];
    var state = {};
    results.map((result) => {
        const state = {
            "State_Code": result.State_Code,
            "State_Name": result.State_Name
        }
        states.push(state);
    });
    return NextResponse.json({ states: states });
}
export async function POST() {}
