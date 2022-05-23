-- sql commands used to create to weekend-to-do-app database

CREATE TABLE to_do(
	"id" serial PRIMARY KEY,
	"done" boolean DEFAULT false,
	"priority" varchar(5),
	"task" varchar(300)
);

-- CRUD tests
INSERT INTO to_do ( priority, task ) VALUES ( '1', 'Be kind to yourself' );

SELECT * FROM to_do;

UPDATE to_do SET done=true WHERE id=3;

DELETE FROM to_do WHERE id=6;