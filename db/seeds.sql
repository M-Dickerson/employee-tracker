INSERT INTO department (name)
VALUES ("Raven"),
       ("Libra"),
       ("Adjudicator"),
       ("King"),
       ("MC");
INSERT INTO role (title, salary, department_id)
VALUES ("Private Detective", 100000, 5),
       ("Senior Attorney", 200000, 26),
       ("Psychiatrist", 300000, 27),
       ("Company Owner", 400000, 21),
       ("Attorney", 500000, 20);
INSERT INTO manager (manager_name)
VALUES ("NSB"),
       ("Celestine"),
       ("Giann"),
       ("Austin"),
       ("Artem");
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Luke", "P", 5, 1),
       ("Artem", "W", 26, 2),
       ("Vyn", "R", 27, 3),
       ("Marius", "V", 21, 4),
       ("Rosa", "C", 20, 5);

