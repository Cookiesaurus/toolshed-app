import Link from "next/link";
import Filters from "@/components/Filters/filters";
import Sort from "@/components/Filters/sort";
import InventoryItems from "@/components/InventoryItems/InventoryItems";
import db from "../config/db.mjs";
import ToolCard from "@/components/ToolCard/ToolCard";
import { getSession } from "@/actions/actions";
import { Suspense } from "react";
import InventoryLoading from "@/components/InventoryItems/InventoryLoading";

//Helper function - not needed for now
/*const checkForParams = (searchParams) => {
    const cat = String(searchParams.category);
    const typ = String(searchParams.type);
    const bra = String(searchParams.brand);
    const status = String(searchParams.in_stock);
    const loc = String(searchParams.location);
    const searchBar = String(searchParams.search);
    // console.log("Cat : ", cat);
    // console.log("Type : ", typ);
    // console.log("Bra : ", bra);
    // console.log("Status : ", status);
    // console.log("Log : ", loc);
    // console.log("Search bar : ", searchBar);
    let params = [];
    if (cat || typ || bra || status || loc || searchBar) {
        if (cat && cat != "") params.push("category");
        if (typ && typ != "") params.push("types");
        if (bra && bra != "") params.push("brand");
        if (status && status != "") params.push("status");
        if (loc && loc != "") params.push("location");
        if (searchBar && searchBar != "") params.push("searchBar");
        console.log(params);
        return true;
    } else return false;
}; */

export default async function Page({ searchParams }) {
    // let checkParam = checkForParams(searchParams);
    // This would be all inventory items
    let categories = await db.selectFromDB("SELECT * FROM Categories");
    let brands = await db.selectFromDB("SELECT * FROM Brands");
    let types = await db.selectFromDB("SELECT * FROM Types");
    let locations = await db.selectFromDB("SELECT * FROM SEAC_Tool_Shed.Tool_Locations");

    categories = JSON.parse(JSON.stringify(categories));
    brands = JSON.parse(JSON.stringify(brands));
    types = JSON.parse(JSON.stringify(types));
    locations = JSON.parse(JSON.stringify(locations));

    const user = await getSession();
    let admin = user.user?.Privilege_Level;

    const cat = String(searchParams.category).split(",");
    const typ = String(searchParams.type).split(",");
    const bra = String(searchParams.brand).split(",");
    let status = String(searchParams.in_stock);
    let status2 = status;
    if (status != "on") {
        status = "off";
    }
    let useInven = true;
    let loc = String(searchParams.location).split(",");
    let searchBar = String(searchParams.search).trim().split(" ");
    let sqlQuery = `SELECT Tools.Tool_ID, Tools.Tool_Name, Tools.Is_Floating, Tools.Brand_Name, Tool_Locations.Location_Name, 
                    Tool_Statuses.Tool_Status_Details, GROUP_CONCAT(DISTINCT Categories.Category_Name SEPARATOR ', ') 
                    AS Categories, GROUP_CONCAT(DISTINCT Types.Type_Name SEPARATOR ', ') 
                    AS Types, Tools.Tool_Link FROM Tools INNER JOIN Tool_Locations ON 
                    Tools.Home_Location = Tool_Locations.Tool_Location INNER JOIN Tool_Statuses ON
                    Tools.Tool_Status=Tool_Statuses.Tool_Status INNER JOIN Tool_Categories ON Tools.Tool_ID=Tool_Categories.Tool_ID 
                    INNER JOIN Categories ON Tool_Categories.Category_ID=Categories.Category_ID INNER JOIN Tool_Types ON 
                    Tools.Tool_ID=Tool_Types.Tool_ID INNER JOIN Types ON Tool_Types.Type_ID=Types.Type_ID`;

    let whereClause = " WHERE";
    if (
        searchBar.length > 0 &&
        searchBar[0] != "undefined" &&
        searchBar[0] != ""
    ) {
        whereClause += " (";
        for (let i = 0; i < searchBar.length; i++) {
            whereClause +=
                " Tools.Tool_Name LIKE '%" +
                searchBar[i] +
                "%' OR Categories.Category_Name LIKE '%" +
                searchBar[i] +
                "%' OR Tools.Brand_Name LIKE '%" +
                searchBar[i] +
                "%' OR Types.Type_Name LIKE '%" +
                searchBar[i] +
                "%' OR";
        }
        whereClause = whereClause.replace(/OR\s*$/, "");
        whereClause += ") AND";
        useInven = false;
    }
    if (cat.length > 0 && cat[0] != "undefined" && cat[0] != "") {
        whereClause += ` Categories.Category_Name IN (${cat
            .map((cat) => `'${cat}'`)
            .join(", ")}) AND`;
        useInven = false;
    }
    if (typ.length > 0 && typ[0] != "undefined" && typ[0] != "") {
        whereClause += ` Types.Type_Name IN (${typ
            .map((type) => `'${type}'`)
            .join(", ")}) AND`;
        useInven = false;
    }
    if (bra.length > 0 && bra[0] != "undefined" && bra[0] != "") {
        whereClause += ` Tools.Brand_Name IN (${bra
            .map((brand) => `'${brand}'`)
            .join(", ")}) AND`;
        useInven = false;
    }
    if (loc.length > 0 && loc[0] != "undefined" && loc[0] != "") {
        whereClause += ` Tool_Locations.Location_Name IN (${loc
            .map((loc) => `'${loc}'`)
            .join(", ")}) AND`;
        useInven = false;
    }
    statusCreator(status2);
    if (status == "off") {
        if (admin > 2 && status2 != "undefined" && status2 != "") {
            if (status2 == "floating")
                whereClause += ` Tools.Is_Floating=1 AND`;
            else {
                let wc = statusCreator(status2);
                whereClause += wc;
            }
        } else if (admin > 2) {
            whereClause += ` Tool_Statuses.Tool_Status_Details IN ('Available', 'Checked Out', 'Disabled', 'Maintenance') AND`;
        } else {
            whereClause += ` Tool_Statuses.Tool_Status_Details IN ('Available', 'Checked Out') AND`;
        }
    } else if (status == "on") {
        whereClause += ` Tool_Statuses.Tool_Status_Details IN ('Available') AND`;
        useInven = false;
    }

    whereClause = whereClause.replace(/AND\s*$/, "");
    if (whereClause != " WHERE") sqlQuery += whereClause;
    sqlQuery += " GROUP BY Tools.Tool_ID;";
    let tools = await db.execute(sqlQuery);
    tools = tools[0];
    // Debug
    // console.log("Returned tools length: ", tools.length);
    const urlSelectedCat = searchParams.category;
    return (
        <>
            <div className="inventory-page">
                <div className="conditions-cont">
                    <div className="conditions">
                        <h1> </h1>
                    </div>
                </div>
                <div className="inventory-cont">
                    <Filters
                        categories={categories}
                        brands={brands}
                        types={types}
                        locations={locations}
                        totalTools={tools.length}
                        admin={admin > 3 ? true : false}
                    />
                    {useInven ? (
                        <Suspense fallback={<InventoryLoading/>}>
                            <InventoryItems
                                tools={tools}
                                admin={admin > 3 ? true : false}
                            />
                        </Suspense>
                    ) : (
                        <Suspense fallback={<InventoryLoading/>}>
                            <ToolCard
                                tools={tools}
                                admin={admin > 3 ? true : false}
                            />
                        </Suspense>
                    )}
                </div>
            </div>
        </>
    );
}

const statusCreator = (status) => {
    let st = status.split(",");
    let wc = ` Tool_Statuses.Tool_Status_Details IN (`;
    let wc_end = ` AND`;
    let fl = false;
    if (st.includes("disabled")) {
        wc += `'Disabled',`;
    }
    if (st.includes("maintenance")) {
        wc += `'Maintenance',`;
    }
    if (st.includes("floating")) {
        // addFloating();
        fl = true;
    }
    if (st.includes("available")) {
        wc += `'Available',`;
    }
    if(st.includes("checked out")){
        wc += `'Checked Out'`;
    }
    if (wc[wc.length - 1] == ",") {
        wc = wc.slice(0, wc.length - 1);
    }
    wc += `)`;
    wc += wc_end;
    if (fl) wc += addFloating();

    return wc;
};

const addFloating = () => {
    return ` Tools.Is_Floating=1`;
};



