package pisces.repository;

import org.springframework.jdbc.core.simple.JdbcClient;
import org.springframework.stereotype.Repository;
import pisces.domain.Fish;
import pisces.domain.Location;
import pisces.domain.Organization;

import java.util.List;
import java.util.UUID;

@Repository
public class OptionsRepository {

    private final JdbcClient jdbcClient;

    public OptionsRepository(JdbcClient jdbcClient) {
        this.jdbcClient = jdbcClient;
    }

    public List<Location> getLocations() {
        return jdbcClient.sql("""
                        SELECT * 
                        FROM Locations 
                        """)
                .query((rs, rowNum) -> new Location(
                        rs.getObject("id", UUID.class),
                        rs.getString("nb_label"),
                        rs.getString("en_label")
                ))
                .list();
    }

    public List<Fish> getFishes() {
        return jdbcClient.sql("""
                        SELECT * 
                        FROM Fishes
                        """)
                .query((rs, rowNum) -> new Fish(
                        rs.getObject("id", UUID.class),
                        rs.getString("nb_label"),
                        rs.getString("en_label")
                ))
                .list();
    }

    public List<Organization> getOrganizations() {
        return jdbcClient.sql("""
                        SELECT * 
                        FROM Organizations
                        """)
                .query((rs, rowNum) -> new Organization(
                        rs.getObject("id", UUID.class),
                        rs.getString("name")
                ))
                .list();
    }

}
