package pisces.repository;

import org.springframework.jdbc.core.simple.JdbcClient;
import org.springframework.stereotype.Repository;
import pisces.domain.Fish;
import pisces.domain.Location;
import pisces.domain.Organization;
import pisces.dto.FacilityDetailsDTO;
import pisces.dto.FacilityOverviewDTO;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalDate;
import java.util.List;
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

    private static Location mapLocation(ResultSet rs) throws SQLException {
        return new Location(
                rs.getObject("location_id", UUID.class),
                rs.getString("location_nb_label"),
                rs.getString("location_en_label")
        );
    }

}
