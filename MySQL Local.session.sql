CREATE DATABASE test;
USE test;

CREATE TABLE testing(nummer DOUBLE, word VARCHAR(20));

INSERT INTO testing VALUES(1, "nummer1");
INSERT INTO testing VALUES(2, "nummer2");
INSERT INTO testing VALUES(3, "nummer3");
INSERT INTO testing VALUES(4, "nummer4");
INSERT INTO testing VALUES(5, "nummer5");

DELIMITER //

CREATE PROCEDURE insert_numbers()
BEGIN
    DECLARE i INT DEFAULT 1;

        WHILE i <= 50 DO
            INSERT INTO testing VALUES(i, CONCAT('nummer', i));
        SET i = i + 1;
    END WHILE;
END //

DELIMITER ;

CALL insert_numbers();