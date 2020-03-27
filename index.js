
var mysql = require("mysql");
var inquirer = require("inquirer");



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
                  console.log(`ID: ${EMPLOYEE_TRACKER.ID} First Name: ${EMPLOYEE_TRACKER.FIRST_NAME},Last Name: ${EMPLOYEE_TRACKER.LAST_NAME}|Role ID: ${EMPLOYEE_TRACKER.ROLE_ID} |Manager ID:${EMPLOYEE_TRACKER.MANAGER_ID}`);
              
                })
          } 
      })
  }

});

start()


function start() {
    inquirer
      .prompt({
        name: "employeelist",
        type: "list",
        message: "Would you like to add  employee?",
        choices: ["Employee", "Manager",]
      })
      .then(function(answer) {
        // based on their answer, either call the bid or the post functions
        if (answer.postOrBid === "Employee") {
          postAuction();
        }
        else if(answer.postOrBid === "Manager") {
          bidAuction();
        } else{
          connection.end();
        }
      });
  }