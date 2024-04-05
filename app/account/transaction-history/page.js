import Transactions from "@/components/account/Transactions"
import db from "@/app/config/db.mjs"
import { getSession } from "@/actions/actions"
export default async function Page(){
    const user = await getSession();

    return (
        <>
            <Transactions user={user}/>
        </>
    )
}
