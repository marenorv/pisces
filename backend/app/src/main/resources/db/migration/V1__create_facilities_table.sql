CREATE TABLE Facilities (
    id UUID NOT NULL DEFAULT RANDOM_UUID() PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    registered_date DATE NOT NULL
);

INSERT INTO Facilities (id, name, registered_date) VALUES ('aa7d4833-4474-493c-b5a8-f0c6b1ea3461', 'Marens merder', '2024-01-10');
INSERT INTO Facilities (id, name, registered_date) VALUES ('009361c3-a7b7-4330-95ef-efc482b7eefc', 'Bergen oppdret', '2024-02-15');
INSERT INTO Facilities (id, name, registered_date) VALUES ('195c79a8-3864-4172-9ba8-faafb82aab8e', 'Æøå fiskeri', '2024-03-20');
INSERT INTO Facilities (id, name, registered_date) VALUES ('e585a98f-e55a-4a6f-b112-90f2b41eaa47', 'Test test test', '2024-04-25');
INSERT INTO Facilities (id, name, registered_date) VALUES ('72e77cc6-449c-4218-b3b7-6894ae8dacbb', 'Gullfiskanlegg', '2024-05-30');
