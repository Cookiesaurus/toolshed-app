import db from "@/app/config/db.mjs"
import EditItem from "@/components/admin/tools/EditItem"
export default async  function Page({searchParams}){
    //make a select that gets the item info based on the id in the search param
    //pass that data into the EditItem Componenet
    let categories = await db.selectFromDB("SELECT * FROM Categories");
    let brands = await db.selectFromDB("SELECT * FROM Brands");
    let types = await db.selectFromDB("SELECT * FROM Types");
    let  locations = await db.selectFromDB("SELECT * FROM SEAC_Tool_Shed.Tool_Locations");

    let toolID = searchParams.tool_id

    categories = JSON.parse(JSON.stringify(categories));
    brands = JSON.parse(JSON.stringify(brands));
    types = JSON.parse(JSON.stringify(types));
    locations = JSON.parse(JSON.stringify(locations));
    return(
        <>  
            <EditItem categories={categories} brands={brands} types={types} locations={locations} toolID={toolID}/>
        </>
    )
}