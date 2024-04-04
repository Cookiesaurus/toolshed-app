import NewItem from "@/components/admin/NewItem";
import db from "@/app/config/db.mjs";
export default async function Page(){
    const categories = await db.selectFromDB("SELECT * FROM Categories");
    const brands = await db.selectFromDB("SELECT * FROM Brands");
    const types = await db.selectFromDB("SELECT * FROM Types");
    const locations = await db.selectFromDB("SELECT * FROM SEAC_Tool_Shed.Tool_Locations");
    return (<>
        <NewItem categories={categories} brands={brands} types={types} locations={locations}/>
    </>)
}