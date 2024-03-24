/*var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "SEAC_Tool_Shed"
});*/

const categories = ['Drill Extention', 'Roofing'];
const brands = [];
const types = ['Test'];
const status = 1;
const locations = ['Main Location'];


let whereClause = 'WHERE';
if (categories.length > 0) {
    whereClause += ` c.Category_Name IN (${categories.map(cat => `'${cat}'`).join(', ')}) AND`;
}
if (brands.length > 0) {
    whereClause += ` t.Brand_Name IN (${brands.map(brand => `'${brand}'`).join(', ')}) AND`;
}
if (types.length > 0) {
    whereClause += ` ty.Type_Name IN (${types.map(type => `'${type}'`).join(', ')}) AND`;
}
if (status < 1) {
    whereClause += ` t.Tool_Status = ${status} AND`;
}
if (locations.length > 0) {
    whereClause += ` tl.Location_Name IN (${locations.map(loc => `'${loc}'`).join(', ')}) AND`;
}

whereClause = whereClause.replace(/AND\s*$/, '');

console.log(whereClause);

//con.connect(function(err) {
//  if (err) throw err;
//  con.query("SELECT t.Tool_Name, c.Category_Name FROM Tools AS t INNER JOIN Tool_Categories as tc ON t.Tool_ID = tc.Tool_ID INNER JOIN Categories as c ON tc.Category_ID = c.Category_ID WHERE c.Category_Name = '" + categoryName + "'"
//  , function (err, result, fields) {
//    if (err) throw err;
//    console.log(result);
//  });
//});