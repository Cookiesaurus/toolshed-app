import Membership from "@/components/account/membership"
import { getSession } from "@/actions/actions"
export default async function Page(){
    let user = await getSession();
    user=JSON.parse(JSON.stringify(user))
    return (
        <>
            <Membership user={user}/>
        </>
    )
}