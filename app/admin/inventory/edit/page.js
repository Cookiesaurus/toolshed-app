import db from "@/app/config/db.mjs"
import EditItem from "@/components/admin/EditItem"
export default function Page({searchParams}){
    //make a select that gets the item info based on the id in the search param
    //pass that data into the EditItem Componenet
    return(
        <>  
            <EditItem/>
            <h1>{searchParams.tool_id}</h1>
        </>
    )
}