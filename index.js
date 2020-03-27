
var mysql = require("mysql");




var connection = mysql.createConnection({
  host: "localhost",
  port: 8889,
  user: "root",
  password: "root",
  database: "EMPLOYEE_TRACKER"
});
connection.connect(function(err){
  if(err) {
      console.log(err);
  } else {

      connection.query(`SELECT * FROM EMPLOYEE_TRACKER.EMPLOYEE;`,function(error,results) {
          if(error) {
              console.log(error);
          } else {
              results.forEach((EMPLOYEE_TRACKER,index)=>{
                  console.log(`ID: ${EMPLOYEE_TRACKER.ID} : ${EMPLOYEE_TRACKER.FIRST_NAME}, ${EMPLOYEE_TRACKER.LAST_NAME}| ${EMPLOYEE_TRACKER.ROLE_ID} |${EMPLOYEE_TRACKER.MANAGER_ID}`);
              })
          } connection.destroy();
      })
  }

});