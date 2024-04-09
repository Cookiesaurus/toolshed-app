import Profile from "@/components/account/Profile";
import { getSession } from "@/actions/actions";
export default async function Page(){
    let user = await getSession();
    user=JSON.parse(JSON.stringify(user))
    return (
        <>
            <Profile user={user}/>
        </>
    )
}