CREATE TABLE Organizations (
    id UUID NOT NULL DEFAULT RANDOM_UUID() PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

INSERT INTO Organizations (id, name) VALUES ('202f1bbb-15d1-46aa-bc83-1d14bfcc3639', 'Oppdrettsorganisasjon #1');
INSERT INTO Organizations (id, name) VALUES ('1ed9c333-dd05-44a8-ae57-1dc5eb585614', 'Oppdrettsorganisasjon #2');
INSERT INTO Organizations (id, name) VALUES ('62af5c96-3eb2-4aa3-81e1-ee9d014ad40f', 'Oppdrettsorganisasjon #3');

CREATE TABLE Facility_Organizations (
    id UUID NOT NULL DEFAULT RANDOM_UUID() PRIMARY KEY,
    facility_id UUID NOT NULL REFERENCES Facilities(id) ON DELETE CASCADE,
    organization_id UUID NOT NULL REFERENCES Organizations(id)
);

INSERT INTO Facility_Organizations (id, facility_id, organization_id) VALUES ('f65f97ac-d225-42d1-b9c3-c0ba379a4f1f', 'aa7d4833-4474-493c-b5a8-f0c6b1ea3461', '202f1bbb-15d1-46aa-bc83-1d14bfcc3639');
INSERT INTO Facility_Organizations (id, facility_id, organization_id) VALUES ('d9733fc6-9f67-41a2-9775-164a06980112', 'aa7d4833-4474-493c-b5a8-f0c6b1ea3461', '1ed9c333-dd05-44a8-ae57-1dc5eb585614');
INSERT INTO Facility_Organizations (id, facility_id, organization_id) VALUES ('c936dbc9-2206-49f0-b143-0e8166bab1ad', '009361c3-a7b7-4330-95ef-efc482b7eefc', '62af5c96-3eb2-4aa3-81e1-ee9d014ad40f');
