
const mysql=require("mysql");
const inquire=require("inquirer");
const console_table=require("console.table");

const connection=mysql.createConnection({
    host:"localhost",
    port:8889,
    user:"root",
    password:"root",
    database:"EMPLOYEE_TRACKER_DB"
});

connection.connect(function(err){
    if(err) {
        console.log(err);
    } else {

        connection.query(`SELECT * FROM EMPLOYEE_TRACKER_DB.EMPLOYEE;`,function(error,results) {
            if(error) {
                console.log(error);
            } else {
              console.log("Welcome to the Employee Tracker Database") 
                startQuestions();
            }
        })
    }

});
console.table([
        {
            Employee_ID: 0 ,FIRST_NAME: "Jayson",LAST_NAME: "Espada",Role_ID: 14, Manager_ID:1,
            
        }
    ]);console.table([
            {
                Employee_ID: 0 ,FIRST_NAME: "Jayson",LAST_NAME: "Espada",Role_ID: 24, Manager_ID:1,
                Employee_ID: 1 ,FIRST_NAME: "Yuly",LAST_NAME: "Cifuentes",Role_ID: 24, Manager_ID:1,
                Employee_ID:1 ,FIRST_NAME: "Jacob",LAST_NAME: "Espinosa",Role_ID: 24, Manager_ID:5,
                
            }
        ]);

function startQuestions(){
    inquire.prompt([{
        type:"list",
        name:"option",
        message:"What would like to do?",
        choices:["Add a Employee?","View Employee Chart?","Update Employee Role?"]
    }]).then((answer)=>{
        if (answer.option === "Add a Employee?") {
            addInformation();
            }
    })
}

function addInformation (){
    inquire.prompt([{
        type:"list",
        name:"option",
        message:"What inforamiton do you want to ADD to ?",
        choices:["Add a Department?","Add a Role?","Add a Employee?"]
    }]).then((answer)=>{
        if (answer.option === "Add a Employee?") {
            addEmployee();
            }
    })
}

function addEmployee(){
    inquire.prompt([
        {
            name: "firstName",
            type: "input",
            message: "Employee First Name"
        },
        {
            name: "lastname",
            type: "input",
            message: "Employee Last Name?"
        },
        {
            name: "role",
            type: "input",
            message: "Employee Role ID?"
        },
        {
            name: "mgrID",
            type: "input",
            message: " Manager's ID?",
            validate: function(value) {
                if (isNaN(value) === false) {
                  return true;
                  
                }
                return false;
              }
        }
    ])
    .then(function(answer){
    connection.query (
        "INSERT INTO EMPLOYEE(FIRST_NAME,LAST_NAME,ROLE_ID,MANAGER_ID)VALUES (?)",
        {
            FIRST_NAME: answer.firstName,
            LAST_NAME: answer.lastname,
            ROLE_ID: parseInt(answer.role) || 0,
            MANAGER_ID: parseInt(answer.mgrID) || 0
        },
        function (err){
            if (err) throw err;
            console.log("Employee added");
          
            
        }
    );
    });
}
