DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS articles_categories;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS articles;
DROP TABLE IF EXISTS users;

CREATE TABLE users(
  id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  email varchar(50) UNIQUE NOT NULL,
  password_hash varchar(50) NOT NULL,
  first_name varchar(50) NOT NULL,
  last_name varchar(50) NOT NULL,
  avatar varchar(50) NOT NULL
);
CREATE TABLE articles(
  id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  user_id integer NOT NULL,
  title varchar(255) NOT NULL,
  picture varchar(100) NOT NULL,
  announce text NOT NULL,
  full_text text NOT NULL,
  created_date timestamp DEFAULT current_timestamp,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
CREATE TABLE comments(
  id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  article_id integer NOT NULL,
  user_id integer NOT NULL,
  text text NOT NULL,
  created_date timestamp DEFAULT current_timestamp,
  FOREIGN KEY (article_id) REFERENCES articles(id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);
CREATE TABLE categories(
  id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name varchar(255) UNIQUE NOT NULL
);
CREATE TABLE articles_categories(
  article_id integer NOT NULL,
  category_id integer NOT NULL,
  PRIMARY KEY (article_id, category_id),
  FOREIGN KEY (article_id) REFERENCES articles(id),
  FOREIGN KEY (category_id) REFERENCES categories(id)
);
CREATE INDEX ON articles(title);
