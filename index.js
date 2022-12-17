// links
const inquirer = require("inquirer");
const mysql = require('mysql2');
const consoleTable = ('console.table');
// database
const database = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'sleepypanda',
    database: 'employee_roster'
  },
);
// initial questions
function questionSection() {
    return inquirer.prompt([
    {
        type: 'list',
        message: `What action would you like to perform?`,
        name: 'base',
        choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add A Department', 'Add A Role', 'Add An Employee', 'Update an Employee Role', 'Exit'],
    },
])
    .then(choice => {
        console.clear();
        switch (choice.base) {
        // lists all current employees
            case "View All Employees":
                database.query('SELECT employee.id AS ID, first_name AS `First Name`, last_name AS `Last Name`, title AS Title, salary As Salary, name AS Department, manager_name AS Manager FROM employee JOIN role ON role.id = role_id JOIN department ON department.id = department_id JOIN manager ON manager.id = manager_id', 
                function (err, results) {
                     if (err) {
                        console.log(err);
                    } else {
                        console.log(`All the current employees are listed here`);
                        console.table(results);
                    }
                });
                setTimeout(() => {
                    console.log(`-------------------------------------------`);
                    questionSection();
                }, 5);
              break;
            // adds an employee
            case "Add An Employee":
                addEmployee();
                break;
            // updates an existing employees role
            case "Update an Employee Role":
                updateEmployee();
                break;
            // views all roles
            case "View All Roles":
                console.clear();
                database.query('SELECT role.id AS ID, title AS Title, name AS Department, salary AS Salary FROM role JOIN department ON department.id = department_id', function (err, results) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log(`All employee roles`);
                        console.table(results);
                    }
                });
                setTimeout(() => {
                    console.log(`-------------------------------------------`);
                    questionSection();
                }, 5);
                break;
            // adds role
            case "Add A Role":
                addRole();
                break;
            // view
            case "View All Departments":
                console.clear();
                database.query('SELECT department.id AS ID, name AS Department FROM department', function (err, results) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log(`All current departments`);
                        console.table(results);
                    }
            });
            setTimeout(() => {
                console.log(`-------------------------------------------`);
                questionSection();
            }, 5);
            break;
            // 
            case "Add A Department":
                addDepartment();
                break;
            case "Exit":
                console.clear();
                console.log(`Done`);
                break;
            }
        });
};
// updates the selected employees role
function updateEmployee() {
    database.query('SELECT * FROM employee', (err, results) => {
        if (err) {console.log(err);}
        return inquirer.prompt([
        {
            type: 'rawlist',
            name: 'update',
            choices: function () {
                var choiceArr = []
                for (let i = 0; i < results.length; i++) {
                    choiceArr.push(results[i].last_name)
                }
                return choiceArr;
            },
            message: `Which employee do you want to update?`
        },
        {
            type: 'input',
            message: `Which role do you want to assign?`,
            name: 'updateRole',
        },
        ])
            .then(response => {
                const updateBlank = []
                updateBlank.push(response.update)
                updateBlank.push(response.updateRole)
                database.query(`UPDATE employee SET role_id = ? WHERE last_name = ?`, updateBlank, (err, result) => {
                    if (err) {
                        console.log(err);
                    }
                });
                setTimeout(() => {
                    console.clear();
                    questionSection();
                }, 5);
            });
    });
};
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
            setTimeout(() => {
                console.clear();
                questionSection();
            }, 5);
        });
};
//add role prompts
function addRole() {
    database.query("SELECT * FROM department", (err, results) => {
        if (err) {
            console.log(err);
        }
        return inquirer.prompt([
            {
                type: 'input',
                message: `what is the name of the role?`,
                name: 'roleName',
            },
            {
                type: 'input',
                message: `what is the salary of the role?`,
                name: 'roleSalary',
            },
            {
                type: 'rawlist',
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
                setTimeout(() => {
                    console.clear();
                    questionSection();
                }, 5);
            })
    });
};

//add employee prompts
function addEmployee() {
    database.query('SELECT * FROM role', (err, results) => {
        if (err) {console.log(err);}
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
                type: 'rawlist',
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
                message: `Who is their Manager?,
        1. NSB
        2. Celestine 
        3. Giann
        4. Austin
        5.Artem
        Enter the number of the manager you want:`,
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
                setTimeout(() => {
                    console.clear();
                    questionSection();
                }, 5);
            })
    });
};
//
questionSection();