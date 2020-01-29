CREATE TABLE `admins` (
  `id` varchar(255) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `company_id` varchar(255) NOT NULL,
  `email` varchar(255) UNIQUE NOT NULL,
  `password` varchar(255) UNIQUE NOT NULL,
);

CREATE TABLE `companies` (
  `id` varchar(255) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `address` VARCHAR(255) NOT NULL,
  `phone_no` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
);

CREATE TABLE `departments` (
  `id` varchar(255) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `company_id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL
);

CREATE TABLE `employees` (
  `id` varchar(255) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `department_id` INT NOT NULL,
  `company_id` INT NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone_no` varchar(255) NOT NULL,
  `is_active` BOOLEAN NOT NULL,
);