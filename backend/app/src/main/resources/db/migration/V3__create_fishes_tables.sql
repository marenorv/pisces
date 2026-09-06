CREATE TABLE Fishes (
    id UUID NOT NULL DEFAULT RANDOM_UUID() PRIMARY KEY,
    nb_label VARCHAR(100) NOT NULL,
    en_label VARCHAR(100) NOT NULL
);

INSERT INTO Fishes (id, nb_label, en_label) VALUES ('70fe52f0-b646-4b7f-9d38-564f29153797', 'Gullfisk', 'Goldfish');
INSERT INTO Fishes (id, nb_label, en_label) VALUES ('027133d9-94ab-4d70-8b59-cb0290d450a4', 'Torsk', 'Cod');
INSERT INTO Fishes (id, nb_label, en_label) VALUES ('b28b8016-c1c3-40b6-baa7-6d46c82af390', 'Laks', 'Salmon');
INSERT INTO Fishes (id, nb_label, en_label) VALUES ('7c39419c-056b-4515-b15f-3cdd99b6c25f', 'Ørret', 'Trout');
INSERT INTO Fishes (id, nb_label, en_label) VALUES ('7acbc884-e686-4f0a-acad-fc0b7c6bed53', 'Makrell', 'Mackerel');
INSERT INTO Fishes (id, nb_label, en_label) VALUES ('73de91f6-b062-4a9e-837a-f047274e55bd', 'Gjedde', 'pike');
INSERT INTO Fishes (id, nb_label, en_label) VALUES ('95668c8f-5937-43c7-9d32-f44f1d334970', 'Murene', 'Moray');
INSERT INTO Fishes (id, nb_label, en_label) VALUES ('417e8659-e20f-4f56-9591-78ec2b8af7dd', 'Sild', 'Herring');
INSERT INTO Fishes (id, nb_label, en_label) VALUES ('cdaaced5-216e-4deb-a8d8-84316658e3d8', 'Småsild', 'Yawling');
INSERT INTO Fishes (id, nb_label, en_label) VALUES ('09f20926-115b-46db-9656-5d783d6fcd86', 'Uer', 'Red-fish');
INSERT INTO Fishes (id, nb_label, en_label) VALUES ('341e8b47-6dcc-4f57-8e04-fa1af8a0d07f', 'Ål', 'Eel');

CREATE TABLE Facility_Fishes (
    id UUID NOT NULL DEFAULT RANDOM_UUID() PRIMARY KEY,
    facility_id UUID NOT NULL REFERENCES Facilities(id) ON DELETE CASCADE,
    fishes_id UUID NOT NULL REFERENCES Fishes(id)
);

INSERT INTO Facility_Fishes (id, facility_id, fishes_id) VALUES ('f65f97ac-d225-42d1-b9c3-c0ba379a4f1f', 'aa7d4833-4474-493c-b5a8-f0c6b1ea3461', '70fe52f0-b646-4b7f-9d38-564f29153797');
INSERT INTO Facility_Fishes (id, facility_id, fishes_id) VALUES ('d9733fc6-9f67-41a2-9775-164a06980112', 'aa7d4833-4474-493c-b5a8-f0c6b1ea3461', '027133d9-94ab-4d70-8b59-cb0290d450a4');
INSERT INTO Facility_Fishes (id, facility_id, fishes_id) VALUES ('e138cf24-eafd-4ad3-a290-9574407b324e', 'aa7d4833-4474-493c-b5a8-f0c6b1ea3461', '7c39419c-056b-4515-b15f-3cdd99b6c25f');
INSERT INTO Facility_Fishes (id, facility_id, fishes_id) VALUES ('c936dbc9-2206-49f0-b143-0e8166bab1ad', '009361c3-a7b7-4330-95ef-efc482b7eefc', '027133d9-94ab-4d70-8b59-cb0290d450a4');
