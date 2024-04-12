
import { getSession } from "@/actions/actions";
export default async function Page() { 
    let user = await getSession()
    let admin = user.user?.Privilege_Level
    
    return (
        <> 
        </>
    )
 }