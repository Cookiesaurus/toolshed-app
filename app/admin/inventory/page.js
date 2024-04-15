import dynamic from "next/dynamic"
import db from "@/app/config/db.mjs"
const AdminInventory = dynamic(() => import("@/components/admin/tools/AdminInventory"), { ssr: false })

export default async function Page() { 
    let inventory = await db.selectFromDB(`SELECT Tools.Tool_ID, Tools.Tool_Name, Tools.Brand_Name, Home.Location_Name AS Home_Location, Current.Location_Name AS Current_Location, Tool_Statuses.Tool_Status_Details, GROUP_CONCAT(DISTINCT Categories.Category_Name SEPARATOR ', ') AS Category_Name, GROUP_CONCAT(DISTINCT Types.Type_Name SEPARATOR ', ') AS Types, Tools.Tool_Weight, Tools.Tool_Size, Tools.Tool_Replacement_Cost, Tools.Tool_Link, Tools.Is_Floating FROM Tools 
    INNER JOIN Tool_Locations AS Home ON Tools.Home_Location = Home.Tool_Location
    INNER JOIN Tool_Locations AS Current ON Tools.Current_Location = Current.Tool_Location
    INNER JOIN Tool_Statuses ON Tools.Tool_Status=Tool_Statuses.Tool_Status
    INNER JOIN Tool_Categories ON Tools.Tool_ID=Tool_Categories.Tool_ID
    INNER JOIN Categories ON Tool_Categories.Category_ID=Categories.Category_ID
    INNER JOIN Tool_Types ON Tools.Tool_ID=Tool_Types.Tool_ID
    INNER JOIN Types ON Tool_Types.Type_ID=Types.Type_ID
    GROUP BY Tools.Tool_ID;`)
    inventory=JSON.parse(JSON.stringify(inventory))
    return (
        <>  
            <AdminInventory inventory={inventory}/>
        </>
    )
 }