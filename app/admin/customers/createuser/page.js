import CreateNewUser from "@/components/admin/customers/CreateNewUser"
import db from "@/app/config/db.mjs";
import { getSession } from "@/actions/actions";
export default async function Page() { 
    let waivers = await db.selectFromDB("Select Waiver_Name, Waiver_Details From Waivers");
    let gender = await db.selectFromDB(`Select Gender_Name from Genders`)
    let memberships = await db.selectFromDB(`SELECT Membership_Levels.Membership_Title FROM Membership_Levels;`)
    let privilege = await db.selectFromDB(`Select Privilege_Levels.Privilege_Title FROM Privilege_Levels`)
    let user = await getSession()

    waivers = JSON.parse(JSON.stringify(waivers));
    gender = JSON.parse(JSON.stringify(gender));
    memberships = JSON.parse(JSON.stringify(memberships));
    privilege = JSON.parse(JSON.stringify(privilege));

    let admin = user.user?.Privilege_Level
    
    return (
        <> 
        <CreateNewUser genders={gender} waivers={waivers} memberships={memberships} privileges={privilege} admin={admin > 3 ? true : false} />      
        </>
    )
 }