import NewItem from "@/components/admin/tools/NewItem";
import db from "@/app/config/db.mjs";
export default async function Page(){
    let categories = await db.selectFromDB("SELECT * FROM Categories");
    let brands = await db.selectFromDB("SELECT * FROM Brands");
    let types = await db.selectFromDB("SELECT * FROM Types");
    let  locations = await db.selectFromDB("SELECT * FROM SEAC_Tool_Shed.Tool_Locations");

    categories = JSON.parse(JSON.stringify(categories));
    brands = JSON.parse(JSON.stringify(brands));
    types = JSON.parse(JSON.stringify(types));
    locations = JSON.parse(JSON.stringify(locations));
    return (<>
        <NewItem categories={categories} brands={brands} types={types} locations={locations}/>
    </>)
}