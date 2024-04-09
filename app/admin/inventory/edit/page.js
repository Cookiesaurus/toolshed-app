import db from "@/app/config/db.mjs"
import EditItem from "@/components/admin/EditItem"
export default async  function Page({searchParams}){
    //make a select that gets the item info based on the id in the search param
    //pass that data into the EditItem Componenet
    const categories = await db.selectFromDB("SELECT * FROM Categories");
    const brands = await db.selectFromDB("SELECT * FROM Brands");
    const types = await db.selectFromDB("SELECT * FROM Types");
    const locations = await db.selectFromDB("SELECT * FROM SEAC_Tool_Shed.Tool_Locations");
    return(
        <>  
            <EditItem categories={categories} brands={brands} types={types} locations={locations}/>
        </>
    )
}