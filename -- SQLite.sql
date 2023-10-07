-- SQLite
-- CREATE TABLE common (id INTEGER PRIMARY key AUTOINCREMENT, name TEXT, power INTEGER, img TEXT);
-- CREATE TABLE rare (id INTEGER PRIMARY key AUTOINCREMENT, name TEXT, power INTEGER, img TEXT);
-- CREATE TABLE legendary (id INTEGER PRIMARY key AUTOINCREMENT, name TEXT, power INTEGER, img TEXT);
-- CREATE TABLE boss (id INTEGER PRIMARY key AUTOINCREMENT, name TEXT, power INTEGER, img TEXT);

-- DELETE * FROM rare WHERE name = 'Zombie Drifter';
-- INSERT INTO common (name,power,img) VALUES ("Rat",1,"/imgs/rat.jpg");
-- INSERT INTO legendary (name,power,img) VALUES ("The Devil",19,"/imgs/diablo.jpg");
SELECT * FROM legendary;
SELECT * FROM rare;
SELECT * from common;
SELECT * from boss;