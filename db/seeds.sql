
INSERT INTO department (name)
VALUES ("Raven"),
       ("Libra"),
       ("Adjudicator"),
       ("King"),
       ("MC");
-- list of employees roles, their saleries, and their department IDs
INSERT INTO role (title, salary, department_id)
VALUES ("Private Detective", 100000, 1),
       ("Senior Attorney", 200000, 2),
       ("Psychiatrist", 300000, 3),
       ("Company Owner", 400000, 4),
       ("Attorney", 500000, 5);
-- list of employee managers
INSERT INTO manager (manager_name)
VALUES ("NSB"),
       ("Celestine"),
       ("Giann"),
       ("Austin"),
       ("Artem");
-- employee data
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Luke", "Pearce", 1, 1),
       ("Artem", "Wing", 2, 2),
       ("Vyn", "Richter", 3, 3),
       ("Marius", "Von-Hagen", 4, 4),
       ("Rosa", "Clemmings", 5, 5);

