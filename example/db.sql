CREATE TABLE companies (
  id INT(255) UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  address VARCHAR(255) NOT NULL,
  phone_no VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL
);

CREATE TABLE admins (
  id INT(255) UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
  company_id INT(255) UNSIGNED NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  CONSTRAINT fk_admins_company FOREIGN KEY (company_id) REFERENCES companies(id)
);

CREATE TABLE departments (
  id INT(255) UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
  company_id INT(255) UNSIGNED NOT NULL,
  name VARCHAR(255) NOT NULL,
  CONSTRAINT fk_departments_company FOREIGN KEY (company_id) REFERENCES companies(id)
);

CREATE TABLE employees (
  id INT(255) UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
  department_id INT(255) UNSIGNED NOT NULL,
  company_id INT(255) UNSIGNED NOT NULL,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone_no VARCHAR(255) NOT NULL,
  is_active BOOLEAN NOT NULL,
  CONSTRAINT fk_employees_department FOREIGN KEY (department_id) REFERENCES departments(id),
  CONSTRAINT fk_employees_company FOREIGN KEY (company_id) REFERENCES companies(id)
);

CREATE TABLE groups (
  id INT(255) UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL
);

CREATE TABLE employees_groups (
  id INT(255) UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
  group_id INT(255) UNSIGNED NOT NULL,
  employee_id INT(255) UNSIGNED NOT NULL,
  CONSTRAINT fk_employees_groups_group FOREIGN KEY (group_id) REFERENCES groups(id),
  CONSTRAINT fk_employees_groups_employee FOREIGN KEY (employee_id) REFERENCES employees(id)
);