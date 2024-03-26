import { NextResponse } from "next/server";
import db from "@/app/config/db.mjs";
export const GET = async () => {
    // Get all inventory items
    const query =`SELECT Tools.Tool_ID, Tools.Tool_Name, Tool_Locations.Location_Name, Tool_Statuses.Tool_Status_Details, Tools.Tool_Link FROM Tools 
    INNER JOIN Tool_Locations ON Tools.Home_Location=Tool_Locations.Tool_Location 
    INNER JOIN Tool_Statuses ON Tools.Tool_Status=Tool_Statuses.Tool_Status 
    INNER JOIN Tool_Categories ON Tools.Tool_ID=Tool_Categories.Tool_ID WHERE Tool_Statuses.Tool_Status_Details IN ('Available', 'Checked Out')
    GROUP BY Tools.Tool_ID`;
    const allTools = await db.selectFromDB(query);
    // Debug
    // console.log(allTools);
    let tools = [];
    allTools.map((tool) => {
        delete tool.Tool_Image;
        delete tool.Tool_Manual;
    });
    let response = new NextResponse(JSON.stringify(allTools));
    return response;
};
