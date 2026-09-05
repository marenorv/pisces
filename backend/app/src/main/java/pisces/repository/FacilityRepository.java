package pisces.repository;

import org.springframework.jdbc.core.simple.JdbcClient;
import org.springframework.stereotype.Repository;
import pisces.domain.Organization;
import pisces.dto.FacilityDTO;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Repository
public class FacilityRepository {

    private final JdbcClient jdbcClient;

    public FacilityRepository(JdbcClient jdbcClient) {
        this.jdbcClient = jdbcClient;
    }

    public List<FacilityDTO> getAll() {
        return jdbcClient.sql("""
                        SELECT f.id AS facility_id, f.name AS facility_name, f.registered_date,
                               o.id AS org_id, o.name AS org_name
                        FROM Facilities f
                        LEFT JOIN Facility_Organizations fo ON fo.facility_id = f.id
                        LEFT JOIN Organizations o ON o.id = fo.organization_id
                        """)
                .query(FacilityRepository::mapFacilities);
    }

    public FacilityDTO getById(UUID id) {
        return jdbcClient.sql("""
                        SELECT f.id AS facility_id, f.name AS facility_name, f.registered_date,
                               o.id AS org_id, o.name AS org_name
                        FROM Facilities f
                        LEFT JOIN Facility_Organizations fo ON fo.facility_id = f.id
                        LEFT JOIN Organizations o ON o.id = fo.organization_id
                        WHERE f.id = :id
                        """)
                .param("id", id)
                .query(FacilityRepository::mapFacilities)
                .getFirst();
    }

    private static List<FacilityDTO> mapFacilities(ResultSet rs) throws SQLException {
        Map<UUID, FacilityDTO> facilitiesById = new LinkedHashMap<>();

        while (rs.next()) {
            UUID facilityId = rs.getObject("facility_id", UUID.class);
            FacilityDTO facility = facilitiesById.get(facilityId);
            if (facility == null) {
                facility = new FacilityDTO(
                        facilityId,
                        rs.getString("facility_name"),
                        rs.getDate("registered_date").toLocalDate(),
                        new ArrayList<>()
                );
                facilitiesById.put(facilityId, facility);
            }

            UUID orgId = rs.getObject("org_id", UUID.class);
            if (orgId != null) {
                facility.organizations().add(new Organization(orgId, rs.getString("org_name")));
            }
        }

        return new ArrayList<>(facilitiesById.values());
    }

}
