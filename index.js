
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
        Employee_ID: 0 ,FIRST_NAME: "Raul",LAST_NAME: "Nino",Role_ID: 24, Manager_ID:1
    }
]);
//Start with options
function startQuestions(){
    inquire.prompt([{
        type:"list",
        name:"option",
        message:"What would like to do?",
        choices:["Add a Department, Role or Employee?","View Department, Roles, or Employee?","Update Employee Role?"]
    }]).then((answer)=>{
        if (answer.option === "Add a Department, Role or Employee?") {
            addInformation();
            }
    })
}
// Selecting where to add to
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
//get information for adding employee
function addEmployee(){
    inquire.prompt([
        {
            name: "empFirst",
            type: "input",
            message: "What is your First Name?"
        },
        {
            name: "empLast",
            type: "input",
            message: "What is your Last Name?"
        },
        {
            name: "empRole",
            type: "input",
            message: "What is your Role ID?"
        },
        {
            name: "managerID",
            type: "input",
            message: "What is your Manager's ID?",
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
            FIRST_NAME: answer.empFirst,
            LAST_NAME: answer.empLast,
            ROLE_ID: parseInt(answer.empRole) || 0,
            MANAGER_ID: parseInt(answer.managerID) || 0
        },
        function (err){
            if (err) throw err;
            console.log("Employee added");
          
            
        }
    );
    });
}
/*results.forEach((EMPLOYEE,index)=>{
    console.log(`ID: ${EMPLOYEE.ID} : ${EMPLOYEE.FIRST_NAME}, ${EMPLOYEE.LAST_NAME}| ${EMPLOYEE.ROLE_ID} |${EMPLOYEE.MANAGER_ID}`);
})*/