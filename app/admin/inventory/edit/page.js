import db from "@/app/config/db.mjs"
import EditItem from "@/components/admin/tools/EditItem"
export default async  function Page({searchParams}){
    //make a select that gets the item info based on the id in the search param
    //pass that data into the EditItem Componenet
    let categories = await db.selectFromDB("SELECT * FROM Categories");
    let brands = await db.selectFromDB("SELECT * FROM Brands");
    let types = await db.selectFromDB("SELECT * FROM Types");
    let  locations = await db.selectFromDB("SELECT * FROM SEAC_Tool_Shed.Tool_Locations");

    let toolID = searchParams.tool_id;
    let tool = await db.selectFromDB(`SELECT Tools.Tool_ID, Tools.Tool_Name, Tools.Brand_Name, Tools.Tool_Manual, Home.Location_Name AS Home_Location, Current.Location_Name AS Current_Location, 
    Tool_Statuses.Tool_Status_Details, GROUP_CONCAT(DISTINCT Categories.Category_Name SEPARATOR ', ') AS Category_Name, GROUP_CONCAT(DISTINCT Types.Type_Name SEPARATOR ', ') 
    AS Types, Tools.Tool_Weight, Tools.Tool_Size, Tools.Tool_Replacement_Cost, Tools.Tool_Link, Tools.Is_Floating FROM Tools 
    INNER JOIN Tool_Locations AS Home ON Tools.Home_Location = Home.Tool_Location
    INNER JOIN Tool_Locations AS Current ON Tools.Current_Location = Current.Tool_Location
    INNER JOIN Tool_Statuses ON Tools.Tool_Status=Tool_Statuses.Tool_Status
    INNER JOIN Tool_Categories ON Tools.Tool_ID=Tool_Categories.Tool_ID
    INNER JOIN Categories ON Tool_Categories.Category_ID=Categories.Category_ID
    INNER JOIN Tool_Types ON Tools.Tool_ID=Tool_Types.Tool_ID
    INNER JOIN Types ON Tool_Types.Type_ID=Types.Type_ID WHERE Tools.Tool_ID = ${toolID}`);

    categories = JSON.parse(JSON.stringify(categories));
    brands = JSON.parse(JSON.stringify(brands));
    types = JSON.parse(JSON.stringify(types));
    locations = JSON.parse(JSON.stringify(locations));
    tool = JSON.parse(JSON.stringify(tool))
    const objectData = tool.reduce((acc, obj) => {
        const newObj = {};
        for (const key in obj) {
          newObj[key] = obj[key];
        }
        acc = newObj;
        return acc;
      }, {});
    return(
        <>  
            <EditItem 
            categories={categories} 
            brands={brands} 
            types={types} 
            locations={locations}
            toolID={toolID}
            tool={objectData}
             />
        </>
    )
}