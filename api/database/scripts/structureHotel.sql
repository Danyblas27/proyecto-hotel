DROP DATABASE IF EXISTS hotel_system;

CREATE DATABASE IF NOT EXISTS hotel_system CHARACTER
SET
  utf8mb4 COLLATE utf8mb4_unicode_ci;

USE hotel_system;

SET
  default_storage_engine = INNODB;

CREATE DATABASE IF NOT EXISTS hotel_system;

USE hotel_system;

-- Tabla: UserModel
CREATE TABLE
  users (
    id INT(11) PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM ('Admin', 'Recepcion') NOT NULL,
    active BOOLEAN DEFAULT TRUE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  ) ENGINE = InnoDB DEFAULT CHARACTER
SET
  = utf8mb4 COLLATE = utf8mb4_unicode_ci;

-- Tabla: ClientModel
CREATE TABLE
  clients (
    id INT(11) PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(100) NOT NULL UNIQUE,
    name VARCHAR(100),
    last_name VARCHAR(100),
    country VARCHAR(100),
    code_number VARCHAR(20),
    telephone_number VARCHAR(20),
    type_doc_official VARCHAR(50),
    id_doc_official VARCHAR(50)
  ) ENGINE = InnoDB DEFAULT CHARACTER
SET
  = utf8mb4 COLLATE = utf8mb4_unicode_ci;

-- Tabla: RoomModel
CREATE TABLE
  rooms (
    id INT(11) PRIMARY KEY AUTO_INCREMENT,
    type VARCHAR(100),
    capacity INT,
    price DECIMAL(10, 2),
    description TEXT,
    available BOOLEAN DEFAULT TRUE
  ) ENGINE = InnoDB DEFAULT CHARACTER
SET
  = utf8mb4 COLLATE = utf8mb4_unicode_ci;

-- Tabla: PayMethodModel
CREATE TABLE
  pay_methods (
    id INT(11) PRIMARY KEY AUTO_INCREMENT,
    type VARCHAR(100),
    description TEXT
  ) ENGINE = InnoDB DEFAULT CHARACTER
SET
  = utf8mb4 COLLATE = utf8mb4_unicode_ci;

  