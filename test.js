
var mysql = require("mysql");
var inquire = require("inquirer");



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
            start()
          } 
      })
  }

});

//results.forEach((EMPLOYEE_TRACKER,index)=>{
 // start()
  
//})
//console.log(`ID: ${EMPLOYEE_TRACKER.ID} First Name: ${EMPLOYEE_TRACKER.FIRST_NAME},Last Name: ${EMPLOYEE_TRACKER.LAST_NAME}|Role ID: ${EMPLOYEE_TRACKER.ROLE_ID} |Manager ID:${EMPLOYEE_TRACKER.MANAGER_ID}`);
                  


function start() {
    inquire
      .prompt([{
        name: "option",
        type: "list",
        message: "Lets get start",
        choices: ["Add an Employee?", "View Employee","Update Employee"]
      }])
      .then((answer)=> {
        // based on their answer, either call the bid or the post functions
        if (answer.Option === "Add an Employee?") {
          addEmployee();
        }      
      })
  }

   function addEmployee(){
    inquire.prompt([
      {
        name:"firstName",
        type:"input",
        message:"Type your first name?"
      },{
        name:"lastName",
        type:"input",
        message:"Type your last name?"
      },{
        name:"role",
        type:"input",
        message:"Type your Role ?"
      },{
        name:"id",
        type:"input",
        message:"Type your ID?"
        
          }
    ])
    .then(function(answer){
    connection.query (
        "INSERT INTO EMPLOYEE(FIRST_NAME,LAST_NAME,ROLE_ID,MANAGER_ID)VALUES (?)",
        {
            FIRST_NAME: answer.firstName,
            LAST_NAME: answer.lastName,
            ROLE_ID: parseInt(answer.role) || 0,
            MANAGER_ID: parseInt(answer.id) || 0
        },
        function (err){
            if (err) throw err;
            console.log("Employee added");
          
            
        }
    );
    });
}
      