// links
const inquirer = require("inquirer");
const mysql = require("mysql2");
const consoleTable = ("console.table");
// database
const database = mysql.createConnection ({
    host: "localhost",
    user: "root",
    password: "sleepypanda",
    database: "employee_roster"
},);

// questions
function questionSection() {
    return inquirer.prompt ([{
        type: "list",
        message: "What action would you like to perform?",
        name: "selection",
        choices: ["view all departments", "view all roles", "view all employees", "add a department", "add a role", "add an employee", "update an employee role", "I don't want to do anything at this time"],
    },])
    .then(choice => {
        switch (choice.selection) {
            case "View all employees"
            db.query("SELECT employee.id AS ID, first_name AS `First Name`, last_name AS `Last Name`, title AS Title, salary AS Salary, name AS Department, manager_name AS Manager FROM employee JOIN role ON role.id = role_id JOIN department ON department.id = department_id JOIN manager ON manager.id = manager_id"),
            function (err, results) {
                if (err) {
                console.log(err);
                } else {
                console.log("All current employees");
                consoleTable(results);
                }
            }
        }
    })
}