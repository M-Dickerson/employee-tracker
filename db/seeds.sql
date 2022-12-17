-- a list of the employees departments
INSERT INTO department (name)
VALUES ("Raven"),
       ("Libra"),
       ("Adjudicator"),
       ("King"),
       ("Attorney"),
       ("SCPD");
-- a list of the employees roles, their saleries, and their department IDs
INSERT INTO role (title, salary, department_id)
VALUES ("Private Detective", 100000, 1),
       ("Senior Attorney", 200000, 2),
       ("Psychiatrist", 300000, 3),
       ("Company Owner", 400000, 4),
       ("Attorney", 500000, 5);
-- a list of the employees managers
INSERT INTO manager (manager_name)
VALUES ("NSB"),
       ("Celestine"),
       ("Himself"),
       ("Austin"),
       ("Artem");
-- a list of employees names, their role IDs, and their manager IDs
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Luke", "Pearce", 1, 1),
       ("Artem", "Wing", 2, 2),
       ("Vyn", "Richter", 3, 3),
       ("Marius", "Von-Hagen", 4, 4),
       ("Rosa", "Pearce", 5, 5),
       ("Kiki", "Bennett", 5, 5),
       ("Darius", "Morgan", 6, 1),
       ("Aaron", "Yishmir", 1, 1);