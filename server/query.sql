--Create Table
CREATE TABLE restaurant(
    id BIGSERIAL NOT NULL,
    name VARCHAR(50) NOT NULL,
    location VARCHAR(50) NOT NULL,
    price_range INT NOT NULL
);

--Insert In table

INSERT INTO restaurant(name, location, price_range) VALUES('Dhaba', 'Banani', 500);