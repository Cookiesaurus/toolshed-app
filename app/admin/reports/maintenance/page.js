import dynamic from "next/dynamic";
const MaintenanceReport = dynamic(() => import("@/components/admin/reports/MaintenanceReport"), { ssr: false })
import db from "@/app/config/db.mjs";
export default async function Page(){
    let mainReport = await db.selectFromDB(`SELECT Tools.Tool_ID, Tools.Tool_Name, Tools.Brand_Name, Tools.Tool_Weight, Tools.Tool_Size, Home.Location_Name AS Home_Location, Current.Location_Name AS Current_Location, Tools.Location_Code, Tools.Tool_Description, Tool_Statuses.Tool_Status_Details, GROUP_CONCAT(DISTINCT Categories.Category_Name SEPARATOR ', ') AS Category_Name, GROUP_CONCAT(DISTINCT Types.Type_Name SEPARATOR ', ') AS Types, Tools.Tool_Loan_Fee, Tools.Default_Late_Fee, Tools.Default_Loan_Length, Tools.Renewal_Amount, Tools.Tool_Replacement_Cost, Tools.Tool_Link, Tools.Tool_Manual, IF(Tools.Is_Floating, "Yes", "No") AS Is_Floating, IF(Tools.Is_Featured, "Yes", "No") AS Is_Featured FROM Tools 
    INNER JOIN Tool_Locations AS Home ON Tools.Home_Location = Home.Tool_Location
    INNER JOIN Tool_Locations AS Current ON Tools.Current_Location = Current.Tool_Location
    INNER JOIN Tool_Statuses ON Tools.Tool_Status=Tool_Statuses.Tool_Status
    INNER JOIN Tool_Categories ON Tools.Tool_ID=Tool_Categories.Tool_ID
    INNER JOIN Categories ON Tool_Categories.Category_ID=Categories.Category_ID
    INNER JOIN Tool_Types ON Tools.Tool_ID=Tool_Types.Tool_ID
    INNER JOIN Types ON Tool_Types.Type_ID=Types.Type_ID
    GROUP BY Tools.Tool_ID
    HAVING Tool_Statuses.Tool_Status_Details = "Maintenance";`)
    mainReport = JSON.parse(JSON.stringify(mainReport))
    return(
        <>
            <MaintenanceReport toolData={mainReport}/>
        </>
    )
    
}