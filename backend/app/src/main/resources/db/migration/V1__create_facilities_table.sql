CREATE TABLE facilities (
    id BIGINT NOT NULL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    registered_date DATE NOT NULL
);

INSERT INTO facilities (id, name, registered_date) VALUES (0, 'Marens merder', '2024-01-10');
INSERT INTO facilities (id, name, registered_date) VALUES (1, 'Bergen oppdret', '2024-02-15');
INSERT INTO facilities (id, name, registered_date) VALUES (2, 'Æøå fiskeri', '2024-03-20');
INSERT INTO facilities (id, name, registered_date) VALUES (3, 'Test test test', '2024-04-25');
INSERT INTO facilities (id, name, registered_date) VALUES (4, 'Gullfiskanlegg', '2024-05-30');
