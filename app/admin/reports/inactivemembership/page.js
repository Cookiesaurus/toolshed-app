import dynamic from "next/dynamic";
const InActiveMembershipReport = dynamic(() => import("@/components/admin/reports/InActiveMembershipReport"), { ssr: false })
import db from "@/app/config/db.mjs";
export default async function Page(){
    let membershipData = await db.selectFromDB(`SELECT Accounts.Account_ID, CONCAT(Accounts.First_Name, " ", Accounts.Last_Name) AS Primary_User, Accounts.DOB, Genders.Gender_Name, Accounts.Organization_Name, Accounts.Email, Accounts.Phone_Number, 
    CONCAT(Accounts.Address_Line1, " ", Accounts.Address_Line2, " ", Accounts.City, ", ", Accounts.State, ", ", Accounts.Postal_Code) AS Address, CONCAT(Accounts.Secondary_First_Name, " ", Accounts.Secondary_Last_Name) AS Secondary_User, Accounts.Secondary_Email, Accounts.Secondary_Phone_Number,
    Membership_Levels.Membership_Title, Current_Membership_Status.Membership_Status_Description, IF(Accounts.Membership_Auto_Renewal, "Yes", "No") AS Auto_Renewal_Set, Accounts.Membership_Creation_Date, Accounts.Membership_Expiration_Date, Privilege_Levels.Privilege_Title FROM Accounts
    INNER JOIN Genders ON Accounts.Gender_Code = Genders.Gender_Code
    INNER JOIN Membership_Levels ON Accounts.Membership_Level = Membership_Levels.Membership_Level
    INNER JOIN Current_Membership_Status ON Accounts.Membership_Status = Current_Membership_Status.Membership_Status
    INNER JOIN Privilege_Levels ON Accounts.Privilege_Level = Privilege_Levels.Privilege_Level
    WHERE Membership_Status_Description = "Inactive";`) 
    membershipData = JSON.parse(JSON.stringify(membershipData))
    return(<>
        <InActiveMembershipReport membershipData={membershipData}/>
    </>)
}