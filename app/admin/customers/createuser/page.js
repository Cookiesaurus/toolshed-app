import CreateNewUser from "@/components/admin/CreateNewUser"
import db from "@/app/config/db.mjs";
export default async function Page() { 
    let waivers = await db.selectFromDB("Select Waiver_Name, Waiver_Details From Waivers");
    let gender = await db.selectFromDB(`Select Gender_Name from Genders`)
    let memberships = await db.selectFromDB(`SELECT Membership_Levels.Membership_Title FROM Membership_Levels;`)
    waivers = JSON.parse(JSON.stringify(waivers));
    gender = JSON.parse(JSON.stringify(gender));
    memberships = JSON.parse(JSON.stringify(memberships));
    
    return (
        <> 
        <CreateNewUser genders={gender} waivers={waivers} memberships={memberships}/>      
        </>
    )
 }