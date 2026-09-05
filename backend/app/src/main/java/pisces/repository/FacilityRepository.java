package pisces.repository;

import org.springframework.jdbc.core.simple.JdbcClient;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import pisces.domain.Facility;

import java.util.List;

@Repository
public class FacilityRepository {

    private final JdbcClient jdbcClient;

    public FacilityRepository(JdbcClient jdbcClient) {
        this.jdbcClient = jdbcClient;
    }

    public List<Facility> getAll() {
        return jdbcClient.sql("SELECT * FROM facilities")
                .query((rs, rowNum) -> new Facility(rs.getLong("id"), rs.getString("name")))
                .list();
    }
}
