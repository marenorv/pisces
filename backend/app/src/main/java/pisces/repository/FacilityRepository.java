package pisces.repository;

import org.springframework.jdbc.core.simple.JdbcClient;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import pisces.domain.Fish;
import pisces.domain.Location;
import pisces.domain.Organization;
import pisces.dto.FacilityDetailsDTO;
import pisces.dto.FacilityOverviewDTO;
import pisces.dto.FacilityUpdateDTO;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalDate;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.UUID;

@Repository
public class FacilityRepository {

    private final JdbcClient jdbcClient;

    public FacilityRepository(JdbcClient jdbcClient) {
        this.jdbcClient = jdbcClient;
    }

    public List<FacilityOverviewDTO> getAll() {
        return jdbcClient.sql("""
                        SELECT f.id, f.name, f.registered_date,
                               l.id AS location_id, l.nb_label AS location_nb_label, l.en_label AS location_en_label
                        FROM Facilities f
                        JOIN Locations l ON l.id = f.location_id
                        """)
                .query((rs, rowNum) -> new FacilityOverviewDTO(
                        rs.getObject("id", UUID.class),
                        rs.getString("name"),
                        rs.getDate("registered_date").toLocalDate(),
                        mapLocation(rs)
                ))
                .list();
    }

    public FacilityDetailsDTO getById(UUID id) {
        record FacilityRow(String name, LocalDate registeredDate, Location location) {}

        FacilityRow facility = jdbcClient.sql("""
                        SELECT f.name, f.registered_date,
                               l.id AS location_id, l.nb_label AS location_nb_label, l.en_label AS location_en_label
                        FROM Facilities f
                        JOIN Locations l ON l.id = f.location_id
                        WHERE f.id = :id
                        """)
                .param("id", id)
                .query((rs, rowNum) -> new FacilityRow(
                        rs.getString("name"),
                        rs.getDate("registered_date").toLocalDate(),
                        mapLocation(rs)
                ))
                .single();

        var organizations = getOrganizationsForFacility(id);
        var fishes = getFishesForFacility(id);

        return new FacilityDetailsDTO(id, facility.name(), facility.registeredDate(), organizations, fishes, facility.location());
    }

    private List<Organization> getOrganizationsForFacility(UUID id) {
        return jdbcClient.sql("""
                        SELECT o.id, o.name
                        FROM Facility_Organizations fo
                        JOIN Organizations o ON o.id = fo.organization_id
                        WHERE fo.facility_id = :id
                        """)
                .param("id", id)
                .query((rs, rowNum) -> new Organization(rs.getObject("id", UUID.class), rs.getString("name")))
                .list();
    }

    private List<Fish> getFishesForFacility(UUID id) {
        return jdbcClient.sql("""
                        SELECT f.id, f.nb_label, f.en_label
                        FROM Facility_Fishes ff
                        JOIN Fishes f ON f.id = ff.fishes_id
                        WHERE ff.facility_id = :id
                        """)
                .param("id", id)
                .query((rs, rowNum) -> new Fish(rs.getObject("id", UUID.class), rs.getString("nb_label"), rs.getString("en_label")))
                .list();
    }

    @Transactional
    public FacilityDetailsDTO updateFacility(FacilityUpdateDTO payload) {
        UUID id = payload.id();

        int updated = jdbcClient.sql("""
                        UPDATE Facilities
                        SET name = :name,
                            registered_date = :registeredDate,
                            location_id = :locationId
                        WHERE id = :id
                        """)
                .param("id", id)
                .param("name", payload.name())
                .param("registeredDate", payload.registeredDate())
                .param("locationId", payload.location())
                .update();

        if (updated == 0) {
            throw new NoSuchElementException("No facility with id " + id);
        }

        replaceOrganizationsForFacility(id, payload.organizations());
        replaceFishesForFacility(id, payload.fishes());

        return getById(id);
    }

    @Transactional
    public FacilityDetailsDTO addFacility(FacilityUpdateDTO payload) {
        GeneratedKeyHolder keyHolder = new GeneratedKeyHolder();
        jdbcClient.sql("""
          INSERT INTO Facilities (name, registered_date, location_id)
          VALUES (:name, :registeredDate, :locationId)
          """)
                .param("name", payload.name())
                .param("registeredDate", payload.registeredDate())
                .param("locationId", payload.location())
                .update(keyHolder, "id");

        UUID id = keyHolder.getKeyAs(UUID.class);

        replaceOrganizationsForFacility(id, payload.organizations());
        replaceFishesForFacility(id, payload.fishes());

        return getById(id);
    }

    @Transactional
    public void deleteFacility(UUID id) {
        var updated = jdbcClient.sql("""
                        DELETE FROM Facilities
                        WHERE id = :id
                        """)
                .param("id", id)
                .update();

        if (updated == 0) {
            throw new NoSuchElementException("No facility with id " + id);
        }

        // The Facility_Organizations / Facility_Fishes FKs are ON DELETE CASCADE,
        // so deleting the Facilities row clears the join rows automatically.
        // No cleanup needed.
    }


    private void replaceOrganizationsForFacility(UUID facilityId, List<UUID> organizationIds) {
        /*
         * Deleting from a cross-reference table is a no-op when used to create
         * cross-references for a new facility, but that since it's cheap,
         * it's an acceptable trade-off. to be able to keep the same function.
         */
        jdbcClient.sql("DELETE FROM Facility_Organizations WHERE facility_id = :id")
                .param("id", facilityId)
                .update();

        if (organizationIds == null) {
            return;
        }
        for (UUID orgId : organizationIds) {
            jdbcClient.sql("""
                            INSERT INTO Facility_Organizations (facility_id, organization_id)
                            VALUES (:facilityId, :organizationId)
                            """)
                    .param("facilityId", facilityId)
                    .param("organizationId", orgId)
                    .update();
        }
    }

    private void replaceFishesForFacility(UUID facilityId, List<UUID> fishIds) {
        jdbcClient.sql("DELETE FROM Facility_Fishes WHERE facility_id = :id")
                .param("id", facilityId)
                .update();

        if (fishIds == null) {
            return;
        }
        for (UUID fishId : fishIds) {
            jdbcClient.sql("""
                            INSERT INTO Facility_Fishes (facility_id, fishes_id)
                            VALUES (:facilityId, :fishesId)
                            """)
                    .param("facilityId", facilityId)
                    .param("fishesId", fishId)
                    .update();
        }
    }

    private static Location mapLocation(ResultSet rs) throws SQLException {
        return new Location(
                rs.getObject("location_id", UUID.class),
                rs.getString("location_nb_label"),
                rs.getString("location_en_label")
        );
    }
}
