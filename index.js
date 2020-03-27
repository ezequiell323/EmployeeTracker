
var mysql = require("mysql");




var connection = mysql.createConnection({
  host: "localhost",
  port: 8889,
  user: "root",
  password: "root",
  database: "EMPLOYEE_TRACKER"
});

connection.connect(function(err){
  if (err){
    console.log(err);
  }else {
    console.log("Connection to MySQL successfully");
  }
})