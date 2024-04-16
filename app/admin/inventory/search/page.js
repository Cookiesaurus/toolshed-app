import db from "@/app/config/db.mjs";
import dynamic from "next/dynamic";
const Search = dynamic(() => import("@/components/admin/tools/SearchTools"), {
  ssr: false
});

export default async function Page({ searchParams }) {
  let tool =searchParams.searchTerm;
  let toolSearchResults;
  if(tool){
    toolSearchResults = await db.selectFromDB(`SELECT Tools.Tool_ID, Tools.Tool_Name, Home.Location_Name AS Home_Location, Current.Location_Name AS Current_Location, Tools.Brand_Name, GROUP_CONCAT(DISTINCT Types.Type_Name SEPARATOR ', ') AS Types, Tool_Statuses.Tool_Status_Details FROM Tools 
    INNER JOIN Tool_Locations AS Home ON Tools.Home_Location = Home.Tool_Location
    INNER JOIN Tool_Locations AS Current ON Tools.Current_Location = Current.Tool_Location
    INNER JOIN Tool_Statuses ON Tools.Tool_Status=Tool_Statuses.Tool_Status
    INNER JOIN Tool_Types ON Tools.Tool_ID=Tool_Types.Tool_ID
    INNER JOIN Types ON Tool_Types.Type_ID=Types.Type_ID
    GROUP BY Tools.Tool_ID
    HAVING 
        Tools.Tool_Name REGEXP "${tool}" AND Tools.Tool_Name REGEXP "${tool}" AND Tools.Tool_Name REGEXP "${tool}"`)
  }else{
    toolSearchResults = await db.selectFromDB(`SELECT Tools.Tool_ID, Tools.Tool_Name, Home.Location_Name AS Home_Location, Current.Location_Name AS Current_Location, Tools.Brand_Name, GROUP_CONCAT(DISTINCT Types.Type_Name SEPARATOR ', ') AS Types, Tool_Statuses.Tool_Status_Details FROM Tools 
    INNER JOIN Tool_Locations AS Home ON Tools.Home_Location = Home.Tool_Location
    INNER JOIN Tool_Locations AS Current ON Tools.Current_Location = Current.Tool_Location
    INNER JOIN Tool_Statuses ON Tools.Tool_Status=Tool_Statuses.Tool_Status
    INNER JOIN Tool_Types ON Tools.Tool_ID=Tool_Types.Tool_ID
    INNER JOIN Types ON Tool_Types.Type_ID=Types.Type_ID
    GROUP BY Tools.Tool_ID
    HAVING 
        Tools.Tool_Name REGEXP '^$' AND Tools.Tool_Name REGEXP '^$' AND Tools.Tool_Name REGEXP '^$'`)
  }


      
      toolSearchResults = JSON.parse(JSON.stringify(toolSearchResults))
  return (
    <>
      <h1>Search Results: {toolSearchResults.length}</h1>
      <Search inventory={toolSearchResults}/>
    </>
  );
}
