import dynamic from "next/dynamic"
import db from "@/app/config/db.mjs"
const AdminInventory = dynamic(() => import("@/components/admin/AdminInventory"), { ssr: false })

export default async function Page() { 
    let inventory = await db.selectFromDB(`SELECT Tools.Tool_ID, Tools.Tool_Name, Tool_Locations.Location_Name, Tool_Statuses.Tool_Status_Details, Tools.Tool_Link FROM Tools 
    INNER JOIN Tool_Locations ON Tools.Home_Location=Tool_Locations.Tool_Location 
    INNER JOIN Tool_Statuses ON Tools.Tool_Status=Tool_Statuses.Tool_Status 
    INNER JOIN Tool_Categories ON Tools.Tool_ID=Tool_Categories.Tool_ID 
    GROUP BY Tools.Tool_ID`)
    
    return (
        <>  
            <AdminInventory inventory={inventory}/>
        </>
    )
 }