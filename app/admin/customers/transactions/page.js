import { getSession } from "@/actions/actions";
import AddTransaction from "@/components/admin/customers/AddTransaction";
export default async function Page({searchParams}) { 
    let user = await getSession()
    let admin = user.user?.Privilege_Level
    
    return (
        <> 
            <AddTransaction/>
        </>
    )
 }