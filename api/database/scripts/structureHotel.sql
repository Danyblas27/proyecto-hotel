  DROP DATABASE IF EXISTS hotel_system;

  CREATE DATABASE hotel_system CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
  USE hotel_system;

  SET default_storage_engine = INNODB;

  -- Tabla: UserModel
  CREATE TABLE users (
    id INT(11) PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('Admin', 'Recepcion') NOT NULL,
    active BOOLEAN DEFAULT TRUE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

  -- Tabla: ClientModel
  CREATE TABLE clients (
    id INT(11) PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(100) NOT NULL UNIQUE,
    name VARCHAR(100),
    last_name VARCHAR(100),
    country VARCHAR(100),
    code_number CHAR(2),
    telephone_number CHAR(10),
    type_doc_official VARCHAR(50),
    id_doc_official ENUM('INE', 'PASAPORTE') NOT NULL
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

  -- Tabla: RoomModel
  CREATE TABLE rooms (
    id INT(11) PRIMARY KEY AUTO_INCREMENT,
    type ENUM('SIMPLE', 'DOBLE', 'SUITE') NOT NULL,
    number VARCHAR(3) NOT NULL UNIQUE,
    capacity TINYINT(1) UNSIGNED NOT NULL ,
    price DECIMAL(10, 2) DEFAULT 0.00 NOT NULL,
    description TEXT NOT NULL,
    available BOOLEAN DEFAULT TRUE
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

  -- Tabla: PayMethodModel
  CREATE TABLE pay_methods (
    id INT(11) PRIMARY KEY AUTO_INCREMENT,
    type VARCHAR(100),
    description TEXT
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

  -- Tabla: BookingModel
  CREATE TABLE bookings (
    id INT(11) PRIMARY KEY AUTO_INCREMENT,
    entry_date DATE NOT NULL,
    departure_date DATE NOT NULL,
    status ENUM('Pending', 'Confirmed', 'Cancelled', 'Completed') NOT NULL,
    room_id INT(11),
    client_id INT(11),
    user_id INT(11),
    total_amount DECIMAL(10, 2),
    id_doc_official VARCHAR(50),
    pay_method_id INT(11),
    FOREIGN KEY (room_id) REFERENCES rooms(id),
    FOREIGN KEY (client_id) REFERENCES clients(id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (pay_method_id) REFERENCES pay_methods(id)
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

  -- Tabla: AdditionalServiceModel
  CREATE TABLE additional_services (
    id INT(11) PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100),
    description TEXT,
    price DECIMAL(10, 2)
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

  -- Tabla: AdditionalServicesBookingModel
  CREATE TABLE additional_services_booking (
    id INT(11) PRIMARY KEY AUTO_INCREMENT,
    booking_id INT(11),
    additional_service_id INT(11),
    price DECIMAL(10, 2),
    FOREIGN KEY (booking_id) REFERENCES bookings(id),
    FOREIGN KEY (additional_service_id) REFERENCES additional_services(id)
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
