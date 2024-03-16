CREATE TABLE IF NOT EXISTS `mydb`.`model` (
  `ModelID` INT NOT NULL AUTO_INCREMENT,
  `Name` VARCHAR(255) NULL,
  `TrainedTime` datetime NULL,
  `TrainedStatus` VARCHAR(45) NULL,
  PRIMARY KEY (`ModelID`))
ENGINE = InnoDB;


CREATE TABLE IF NOT EXISTS `mydb`.`popularitems` (
  `ItemID` INT NOT NULL AUTO_INCREMENT,
  `BookTitle` VARCHAR(255) NULL,
  `BookAuthor` VARCHAR(255) NULL,
  `ImageURLM` text NULL,
  `num_ratings` int,
  `avg_rating` float,
  PRIMARY KEY (`ItemID`))
ENGINE = InnoDB;