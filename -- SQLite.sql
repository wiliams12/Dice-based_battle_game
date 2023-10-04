-- SQLite
-- CREATE TABLE common (id INTEGER PRIMARY key AUTOINCREMENT, name TEXT, power INTEGER, img TEXT);
-- CREATE TABLE rare (id INTEGER PRIMARY key AUTOINCREMENT, name TEXT, power INTEGER, img TEXT);
-- CREATE TABLE legendary (id INTEGER PRIMARY key AUTOINCREMENT, name TEXT, power INTEGER, img TEXT);
-- CREATE TABLE boss (id INTEGER PRIMARY key AUTOINCREMENT, name TEXT, power INTEGER, img TEXT);

-- INSERT INTO common (name,power,img) VALUES ("Rat",1,"/imgs/rat.jpg");
INSERT INTO boss (name,power,img) VALUES ("Obsidianheart the Earthshaker",22,"/imgs/boss.jpg");
SELECT * FROM legendary;
SELECT * FROM rare;
SELECT * from common;
SELECT * from boss;