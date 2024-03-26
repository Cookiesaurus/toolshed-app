/*var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "SEAC_Tool_Shed"
});*/

const categories = ['Carpentry/Woodworking', 'Crafting', 'Drywall'];
const brands = ['CRAFTSMAN', 'BLACK+DECKER'];
const types = ['Drills'];
const status = 1;
const locations = ['Main Location', 'Mobile'];
const searchBar = 'Power Drills';
const searchBarArray = searchBar.split(' ');

  
let sqlQuery = "SELECT Tools.Tool_ID, Tools.Tool_Name, Tools.Brand_Name, Tool_Locations.Location_Name, Tool_Statuses.Tool_Status_Details, GROUP_CONCAT(DISTINCT Categories.Category_Name SEPARATOR ', ') AS Categories, GROUP_CONCAT(DISTINCT Types.Type_Name SEPARATOR ', ') AS Types, Tools.Tool_Link FROM Tools INNER JOIN Tool_Locations ON Tools.Home_Location = Tool_Locations.Tool_Location INNER JOIN Tool_Statuses ON Tools.Tool_Status=Tool_Statuses.Tool_Status INNER JOIN Tool_Categories ON Tools.Tool_ID=Tool_Categories.Tool_ID INNER JOIN Categories ON Tool_Categories.Category_ID=Categories.Category_ID INNER JOIN Tool_Types ON Tools.Tool_ID=Tool_Types.Tool_ID INNER JOIN Types ON Tool_Types.Type_ID=Types.Type_ID";

let whereClause = ' WHERE';
if(searchBar != null) {
    whereClause += ' (';
    for(let i = 0; i < searchBarArray.length; i++){
        whereClause += ` Tools.Tool_Name LIKE '%` + searchBarArray[i] + `%' OR Categories.Category_Name LIKE '%` + searchBarArray[i] + `%' OR Tools.Brand_Name LIKE '%` + searchBarArray[i] + `%' OR Types.Type_Name LIKE '%` + searchBarArray[i] + `%' OR`;
    }
    whereClause = whereClause.replace(/OR\s*$/, '');
    whereClause += ') AND';
}
if (categories.length > 0) {
    whereClause += ` Categories.Category_Name IN (${categories.map(cat => `'${cat}'`).join(', ')}) AND`;
}
if (types.length > 0) {
    whereClause += ` Types.Type_Name IN (${types.map(type => `'${type}'`).join(', ')}) AND`;
}
if (brands.length > 0) {
    whereClause += ` Tools.Brand_Name IN (${brands.map(brand => `'${brand}'`).join(', ')}) AND`;
}
if (locations.length > 0) {
    whereClause += ` Tool_Locations.Location_Name IN (${locations.map(loc => `'${loc}'`).join(', ')}) AND`;
}

whereClause = whereClause.replace(/AND\s*$/, '');
sqlQuery += whereClause;
sqlQuery += 'GROUP BY Tools.Tool_ID;';
console.log(sqlQuery);


//con.connect(function(err) {
//  if (err) throw err;
//  con.query("SELECT t.Tool_Name, c.Category_Name FROM Tools AS t INNER JOIN Tool_Categories as tc ON t.Tool_ID = tc.Tool_ID INNER JOIN Categories as c ON tc.Category_ID = c.Category_ID WHERE c.Category_Name = '" + categoryName + "'"
//  , function (err, result, fields) {
//    if (err) throw err;
//    console.log(result);
//  });
//});