import { getSession } from "@/actions/actions"
import { SavedCards } from "@/components/account/card"
export default async function Page(){
    let user = await getSession();
    user=JSON.parse(JSON.stringify(user))
    return(
        <>
            <SavedCards user={user}/>
        </>
    )
}