import Profile from "@/components/account/Profile";
import { getSession } from "@/actions/actions";
export default async function Page(){
    let user = await getSession();
    return (
        <>
            <Profile user={user}/>
        </>
    )
}