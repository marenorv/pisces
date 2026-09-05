package pisces.repository;

import org.springframework.jdbc.core.simple.JdbcClient;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import pisces.domain.Count;

@Repository
public class CountRepository {

    private final JdbcClient jdbcClient;

    public CountRepository(JdbcClient jdbcClient) {
        this.jdbcClient = jdbcClient;
    }

    @Transactional
    public Count increment() {
        jdbcClient.sql("UPDATE counts SET \"value\" = \"value\" + 1 WHERE id = :id")
                .param("id", 0L)
                .update();

        return getCurrent();
    }

    @Transactional
    public Count getCurrent() {
        return jdbcClient.sql("SELECT id, \"value\" FROM counts WHERE id = :id")
                .param("id", 0L)
                .query((rs, rowNum) -> new Count(rs.getLong("id"), rs.getInt("value")))
                .single();
    }
}
