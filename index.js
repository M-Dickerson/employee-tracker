// links
const inquirer = require("inquirer");
const mysql = require("mysql2");
const consoleTable = ("console.table");
// database
const database = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "sleepypanda",
    database: "employee_roster"
},);

// questions
function questionSection() {
    return inquirer.prompt([{
        type: "list",
        message: "What action would you like to perform?",
        name: "selection",
        choices: ["View All Departments", "View All Roles", "View All Employees", "Add A Department", "Add A Role", "Add An Employee", "Update an Employee Role", "Exit"],
    },])
        .then(choice => {
            switch (choice.selection) {
                case "View all employees":
                    database.query("SELECT employee.id AS ID, first_name AS `First Name`, last_name AS `Last Name`, title AS Title, salary AS Salary, name AS Department, manager_name AS Manager FROM employee JOIN role ON role.id = role_id JOIN department ON department.id = department_id JOIN manager ON manager.id = manager_id", function (err, results) {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log("All current employees");
                            consoleTable(results);
                        }
                    });
                    break;
                case "Add Employee":
                    addEmployee();
                    break;
                case "Update employee role":
                    updateEmployee();
                    break;
                case "view all roles":
                    database.query("SELECT role.id AS ID, title AS Title, name AS Department, salary AS Salary FROM role JOIN department ON department.id = department_id", function (err, results) {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log("All employee roles")
                        }
                    });
                    break;
                case "Add Department":
                    addDepartment();
                    break;
                case "Exit":
                    console.log("Done");
                    console.clear();
                    break;
            }
        });
};
function updateEmployee() {
    database.query("SELECT * FROM employee", (err, results) => {
        if (err) { console.log(err); }
        return inquirer.prompt([{
            type: "list",
            name: "update",
            choices: function () {
                var choiceArr = []
                for (let i = 0; i < results.length; i++) {
                    choiceArr.push(results[i].last_name)
                }
                return choiceArr;
            },
            message: "Which employee do you want to update?"
        },
        {
            type: "input",
            message: `Which role do you want to assign?`,
            name: "role",
        },
        ])
            .then(response => {
                const updateBlank = []
                updateBlank.push(response.update)
                updateBlank.push(response.role)
                database.query(`UPDATE employee SET role_id = ? WHERE last_name = ?`, updateArray, (err, result) => {
                    if (err) {
                        console.log(err);
                    }
                });
            })
    })
}
function addDepartment() {
    return inquirer.prompt([
        {
            type: 'input',
            message:
                `What is the name of the department?`,
            name: 'departmentName',
        },
    ])
        .then(response => {
            database.query(`INSERT INTO department (name) VALUES (?)`, response.departmentName, (err, result) => {
                if (err) {
                    console.log(err);
                }
            });
        }
        )
}

//add role prompts
function addRole() {
    database.query('SELECT * FROM department', (err, results) => {
        if (err) {
            console.log(err);
        }
        return inquirer.prompt([
            {
                type: 'input',
                message: `what is the name of the role?`,
                name: 'name',
            },
            {
                type: 'input',
                message: `what is the salary of the role?`,
                name: 'salary',
            },
            {
                type: 'list',
                name: 'department',
                choices: function () {
                    var choiceArr = []
                    for (let i = 0; i < results.length; i++) {
                        choiceArr.push(
                            {
                                name: results[i].name,
                                value: results[i].id,
                            })
                    }
                    return choiceArr;
                },
                message: "Select Department:"
            }
        ])
            .then(response => {
                roleAnswerArray = []
                roleAnswerArray.push(response.roleName)
                roleAnswerArray.push(JSON.parse(response.roleSalary))
                roleAnswerArray.push(response.department)
                database.query(`INSERT INTO role (title, salary, department_ID) VALUES (?,?,?)`, roleAnswerArray, (err, result) => {
                    if (err) {
                        console.log(err);
                    }
                });
            })
    });
}

//add employee prompts
function addEmployee() {
    database.query('SELECT * FROM role', (err, results) => {
        if (err) {
            console.log(err);
        }
        return inquirer.prompt([
            {
                type: 'input',
                message: `What is the employee's first name?`,
                name: 'firstName',
            },
            {
                type: 'input',
                message: `What is the employee's last name?`,
                name: 'lastName',
            },
            {
                type: 'list',
                name: 'role',
                choices: function () {
                    var choiceArr = []
                    for (let i = 0; i < results.length; i++) {
                        choiceArr.push({
                            name: results[i].title,
                            value: results[i].id,
                        })

                    }
                    return choiceArr;
                },
                message: "select role"
            },
            {
                type: 'input',
                message:
                    `Who is their Manager?
    1) R2-D2
    2) BB-8"
    3) C-3PO
    4) D-O
    5) R5-D4      
    Please Enter Number Selection:`,
                name: 'manager',
            },
        ])
            .then(response => {
                empAnswerArray = []
                empAnswerArray.push(response.firstName)
                empAnswerArray.push(response.lastName)
                empAnswerArray.push(response.role)
                empAnswerArray.push(response.manager)
                database.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`, empAnswerArray, (err, result) => {
                    if (err) {
                        console.log(err);
                    }
                });
            })
    });
}
//
questionSection();