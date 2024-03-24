var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "SEAC_Tool_Shed"
});

var url = new URL("https://toolshed.com/inventory/category?category_name=Crafting");
var search = new URLSearchParams(url.search);
var categoryName = search.get('category_name');


con.connect(function(err) {
  if (err) throw err;
  con.query("SELECT t.Tool_Name, c.Category_Name FROM Tools AS t INNER JOIN Tool_Categories as tc ON t.Tool_ID = tc.Tool_ID INNER JOIN Categories as c ON tc.Category_ID = c.Category_ID WHERE c.Category_Name = '" + categoryName + "'"
  , function (err, result, fields) {
    if (err) throw err;
    console.log(result);
  });
});