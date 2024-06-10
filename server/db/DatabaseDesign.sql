CREATE TYPE ROLE AS ENUM ('user', 'admin');
CREATE TABLE users ( 
    id SERIAL PRIMARY KEY, 
    username VARCHAR(255) NOT NULL UNIQUE, 
    password VARCHAR(255) NOT NULL, 
    email VARCHAR(255) NOT NULL UNIQUE, 
  
    role ROLE NOT NULL DEFAULT 'user',
    registered_on DATE NOT NULL 
);
CREATE TABLE create_excursions (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    image_data BYTEA,
    duration_minutes INT CHECK (duration_minutes >= 0) NOT NULL,
    rating INT CHECK (rating BETWEEN 0 AND 10) NOT NULL DEFAULT 0,
	price INT CHECK (price BETWEEN 0 AND 999999) NOT NULL DEFAULT 0
);

CREATE TABLE excursion_dates (
    id SERIAL PRIMARY KEY,
    create_excursion_id INT REFERENCES create_excursions(id) ON DELETE CASCADE,
    excursion_date DATE NOT NULL
);

CREATE TABLE project_workers(
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    create_excursions_id INT NOT NULL,
--  role ROLE NOT NULL DEFAULT 'user';
    CONSTRAINT fk_users FOREIGN KEY(user_id) REFERENCES users(id),
    CONSTRAINT fk_create_excursions FOREIGN KEY(create_excursions_id) REFERENCES create_excursions(id)
); 