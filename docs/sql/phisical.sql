-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema control_student
-- -----------------------------------------------------

DROP DATABASE control_student;

-- -----------------------------------------------------
-- Schema control_student
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `control_student` DEFAULT CHARACTER SET utf8 ;
USE `control_student` ;

-- -----------------------------------------------------
-- Table `control_student`.`tb_employees_type`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `control_student`.`tb_employees_type` (
  `employees_type_id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50) NOT NULL,
  `description` VARCHAR(150) NOT NULL,
  `external_id` VARCHAR(36) NOT NULL DEFAULT (UUID()),
  PRIMARY KEY (`employees_type_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `control_student`.`tb_buses`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `control_student`.`tb_buses` (
  `buses_id` INT NOT NULL AUTO_INCREMENT,
  `code` VARCHAR(45) NOT NULL,
  `name` VARCHAR(100) NOT NULL,
  `limit_vacancies` INT NOT NULL,
  `external_id` VARCHAR(36) NOT NULL DEFAULT (UUID()),
  PRIMARY KEY (`buses_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `control_student`.`tb_employees`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `control_student`.`tb_employees` (
  `employees_id` INT NOT NULL AUTO_INCREMENT,
  `employees_type_id` INT NOT NULL,
  `buses_id` INT NOT NULL,
  `name` VARCHAR(75) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `password` VARCHAR(300) NOT NULL,
  `external_id` VARCHAR(36) NOT NULL DEFAULT (UUID()),
  `created_at` DATETIME NOT NULL DEFAULT NOW(),
  `updated_at` DATETIME NULL DEFAULT NOW() ON UPDATE NOW(),
  `deleted_at` DATETIME NULL,
  PRIMARY KEY (`employees_id`),
  INDEX `fk_tb_employees_tb_employees_type_idx` (`employees_type_id` ASC) VISIBLE,
  INDEX `fk_tb_employees_tb_buses1_idx` (`buses_id` ASC) VISIBLE,
  CONSTRAINT `fk_tb_employees_tb_employees_type`
    FOREIGN KEY (`employees_type_id`)
    REFERENCES `control_student`.`tb_employees_type` (`employees_type_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_tb_employees_tb_buses1`
    FOREIGN KEY (`buses_id`)
    REFERENCES `control_student`.`tb_buses` (`buses_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `control_student`.`tb_periods`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `control_student`.`tb_periods` (
  `periods_id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `external_id` VARCHAR(36) NOT NULL NOT NULL DEFAULT (UUID()),
  PRIMARY KEY (`periods_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `control_student`.`tb_classes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `control_student`.`tb_classes` (
  `classes_id` INT NOT NULL AUTO_INCREMENT,
  `period_id` INT NOT NULL,
  `buses_id` INT NOT NULL,
  `name` VARCHAR(70) NOT NULL,
  `external_id` VARCHAR(36) NOT NULL DEFAULT (UUID()),
  PRIMARY KEY (`classes_id`),
  INDEX `fk_tb_classes_tb_periods1_idx` (`period_id` ASC) VISIBLE,
  INDEX `fk_tb_classes_tb_buses1_idx` (`buses_id` ASC) VISIBLE,
  CONSTRAINT `fk_tb_classes_tb_periods1`
    FOREIGN KEY (`period_id`)
    REFERENCES `control_student`.`tb_periods` (`periods_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_tb_classes_tb_buses1`
    FOREIGN KEY (`buses_id`)
    REFERENCES `control_student`.`tb_buses` (`buses_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `control_student`.`tb_students`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `control_student`.`tb_students` (
  `students_id` INT NOT NULL AUTO_INCREMENT,
  `classes_id` INT NOT NULL,
  `name` VARCHAR(100) NOT NULL,
  `ra` VARCHAR(50) NOT NULL,
  `class` VARCHAR(45) NOT NULL,
  `external_id` VARCHAR(36) NOT NULL DEFAULT (UUID()),
  `created_at` DATETIME NOT NULL DEFAULT NOW(),
  `updated_at` DATETIME NULL DEFAULT NOW() ON UPDATE NOW(),
  `deleted_at` DATETIME NULL,
  PRIMARY KEY (`students_id`),
  INDEX `fk_tb_students_tb_classes1_idx` (`classes_id` ASC) VISIBLE,
  CONSTRAINT `fk_tb_students_tb_classes1`
    FOREIGN KEY (`classes_id`)
    REFERENCES `control_student`.`tb_classes` (`classes_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `control_student`.`tb_classes_type`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `control_student`.`tb_classes_type` (
  `classes_type_id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `description` VARCHAR(100) NOT NULL,
  `external_id` VARCHAR(36) NOT NULL DEFAULT (UUID()),
  `created_at` DATETIME NOT NULL DEFAULT NOW(),
  `deleted_at` DATETIME NULL,
  PRIMARY KEY (`classes_type_id`),
  INDEX `fk_tb_students_tb_classes1_typex` (`classes_type_id` ASC) VISIBLE)
ENGINE = InnoDB;

ALTER TABLE control_student.tb_classes ADD COLUMN classes_type_id INT NULL AFTER buses_id;

ALTER TABLE control_student.tb_classes ADD CONSTRAINT fk_tb_classes_classes_type_id FOREIGN KEY (classes_type_id)
REFERENCES control_student.tb_classes_type (classes_type_id);

ALTER TABLE control_student.tb_classes CHANGE classes_type_id classes_type_id INT NOT NULL;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
