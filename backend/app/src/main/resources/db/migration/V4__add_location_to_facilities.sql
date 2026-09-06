CREATE TABLE Locations (
    id UUID NOT NULL DEFAULT RANDOM_UUID() PRIMARY KEY,
    nb_label VARCHAR(100) NOT NULL,
    en_label VARCHAR(100) NOT NULL
);

INSERT INTO Locations (id, nb_label, en_label) VALUES ('4e6f9c21-3b7a-4d18-9f2e-5c8a1b0d7e34', 'Land', 'Land');
INSERT INTO Locations (id, nb_label, en_label) VALUES ('a1b2c3d4-e5f6-4789-8abc-def012345678', 'Sjø', 'Sea');

ALTER TABLE Facilities ADD COLUMN location_id UUID REFERENCES Locations(id);

UPDATE Facilities SET location_id = 'a1b2c3d4-e5f6-4789-8abc-def012345678'
WHERE id IN ('aa7d4833-4474-493c-b5a8-f0c6b1ea3461', '009361c3-a7b7-4330-95ef-efc482b7eefc');

UPDATE Facilities SET location_id = '4e6f9c21-3b7a-4d18-9f2e-5c8a1b0d7e34'
WHERE id IN ('195c79a8-3864-4172-9ba8-faafb82aab8e', 'e585a98f-e55a-4a6f-b112-90f2b41eaa47', '72e77cc6-449c-4218-b3b7-6894ae8dacbb');

ALTER TABLE Facilities ALTER COLUMN location_id SET NOT NULL;
