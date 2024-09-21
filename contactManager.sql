-- makes the database
CREATE DATABASE IF NOT EXISTS contactManager;

USE contactManager;

-- users table
CREATE TABLE IF NOT EXISTS users (
    ID INT NOT NULL AUTO_INCREMENT,
    DateCreated DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    DateLastLoggedIn DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FirstName VARCHAR(50) NOT NULL DEFAULT '',
    LastName VARCHAR(50) NOT NULL DEFAULT '',
    Login VARCHAR(50) NOT NULL DEFAULT '',
    Password VARCHAR(50) NOT NULL DEFAULT '',
    PRIMARY KEY (ID)
) Engine = InnoDB;

-- contacts table
CREATE TABLE IF NOT EXISTS contacts (
    ID INT NOT NULL AUTO_INCREMENT,
    FirstName VARCHAR(50) NOT NULL DEFAULT '',
    LastName VARCHAR(50) NOT NULL DEFAULT '',
    Phone VARCHAR(50) NOT NULL DEFAULT '',
    Email VARCHAR(50) NOT NULL DEFAULT '',
    DateCreated DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UserID INT NOT NULL DEFAULT 0,
    PRIMARY KEY (ID)
) Engine = InnoDB;

-- Dummy Data
INSERT INTO users (FirstName, LastName, Login, Password) VALUES
('Leo', 'Salazar', 'lsalazar', 'test'),
('John', 'Doe', 'jdoe', 'test'),
('Joe', 'Schmoe', 'jschmoe', 'test');

INSERT INTO contacts (FirstName, LastName, Phone, Email, UserID) VALUES
('a', 'b', '1234567890', 'a@b.com', '1'),
('c', 'd', '2345678901', 'c@d.com', '1'),
('e', 'f', '3456789012', 'e@f.com', '1'),
('g', 'h', '4567890123', 'g@h.com', '2'),
('i', 'j', '5678901234', 'i@j.com', '2'),
('k', 'l', '6789012345', 'k@l.com', '2'),
('m', 'n', '7890123456', 'm@n.com', '3'),
('o', 'p', '8901234567', 'o@p.com', '3'),
('q', 'r', '9012345678', 'q@r.com', '3');