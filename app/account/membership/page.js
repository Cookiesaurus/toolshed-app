import Membership from "@/components/account/membership"
import { getSession } from "@/actions/actions"
export default async function Page(){
    const user = await getSession()
    return (
        <>
            <Membership user={user}/>
        </>
    )
}