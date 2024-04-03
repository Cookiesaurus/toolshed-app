import EditUser from "@/components/admin/EditUser"
import db from "@/app/config/db.mjs"

export default function Page() { 
    //Need a query that pulls all customer info from the DB based on account ID
    return (
        <> 
        <EditUser/>
        </>
    )
 }