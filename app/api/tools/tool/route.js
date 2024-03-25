import { NextResponse } from "next/server";
import db from "@/app/config/db.mjs";
export const GET = async (req) => {
    const productid = new URLSearchParams(new URL(req.url).searchParams).get(
        "product_id"
    );

    // Get item with matching tool id
    const query =
        `SELECT Tools.Tool_ID, Tools.Tool_Name, Tools.Brand_Name, Tool_Locations.Location_Name, Tool_Statuses.Tool_Status_Details, GROUP_CONCAT(DISTINCT Categories.Category_Name SEPARATOR ', ') AS Category_Name, GROUP_CONCAT(DISTINCT Types.Type_Name SEPARATOR ', ') AS Types, Tools.Tool_Weight, Tools.Tool_Size, Tools.Tool_Replacement_Cost, Tools.Tool_Link FROM Tools 
                    INNER JOIN Tool_Locations ON Tools.Home_Location = Tool_Locations.Tool_Location
                    INNER JOIN Tool_Statuses ON Tools.Tool_Status=Tool_Statuses.Tool_Status
                    INNER JOIN Tool_Categories ON Tools.Tool_ID=Tool_Categories.Tool_ID
                    INNER JOIN Categories ON Tool_Categories.Category_ID=Categories.Category_ID
                    INNER JOIN Tool_Types ON Tools.Tool_ID=Tool_Types.Tool_ID
                    INNER JOIN Types ON Tool_Types.Type_ID=Types.Type_ID
                    WHERE Tools.Tool_ID=` + productid;
    const tool = await db.selectFromDB(query);
    let response = new NextResponse(JSON.stringify(tool));
    return response;
};
