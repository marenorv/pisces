package pisces.repository;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;
import pisces.domain.Fish;
import pisces.domain.Organization;
import pisces.dto.FacilityDetailsDTO;
import pisces.dto.FacilityOverviewDTO;
import pisces.dto.FacilityUpdateDTO;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;

/**
 * Integration test against an in-memory H2 database migrated by Flyway
 * (see src/test/resources/application.yml). Each test runs inside a transaction
 * that is rolled back afterwards, so the seeded migration data stays intact
 * between tests.
 */
@SpringBootTest
@Transactional
class FacilityRepositoryIT {

    // Rows seeded by db/migration (V1-V4).
    private static final UUID MARENS_MERDER = UUID.fromString("aa7d4833-4474-493c-b5a8-f0c6b1ea3461");
    private static final UUID ORG_1 = UUID.fromString("202f1bbb-15d1-46aa-bc83-1d14bfcc3639");
    private static final UUID ORG_2 = UUID.fromString("1ed9c333-dd05-44a8-ae57-1dc5eb585614");
    private static final UUID ORG_3 = UUID.fromString("62af5c96-3eb2-4aa3-81e1-ee9d014ad40f");
    private static final UUID LOCATION_LAND = UUID.fromString("4e6f9c21-3b7a-4d18-9f2e-5c8a1b0d7e34");
    private static final UUID LOCATION_SEA = UUID.fromString("a1b2c3d4-e5f6-4789-8abc-def012345678");
    private static final UUID FISH_COD = UUID.fromString("027133d9-94ab-4d70-8b59-cb0290d450a4");
    private static final UUID FISH_SALMON = UUID.fromString("b28b8016-c1c3-40b6-baa7-6d46c82af390");

    @Autowired
    private FacilityRepository repository;

    @Test
    @DisplayName("updateFacility wipes the existing organizations and sets the new ones")
    void updateFacilityReplacesOrganizations() {
        // Marens merder is seeded with organizations #1 and #2.
        assertThat(repository.getById(MARENS_MERDER).organizations())
                .extracting(Organization::getId)
                .containsExactlyInAnyOrder(ORG_1, ORG_2);

        FacilityUpdateDTO payload = new FacilityUpdateDTO(
                MARENS_MERDER,
                "Marens merder (oppdatert)",
                LocalDate.of(2024, 6, 1),
                List.of(ORG_3),
                List.of(FISH_SALMON),
                LOCATION_LAND
        );

        FacilityDetailsDTO result = repository.updateFacility(payload);

        assertThat(result.name()).isEqualTo("Marens merder (oppdatert)");
        assertThat(result.organizations())
                .extracting(Organization::getId)
                .containsExactly(ORG_3);
        assertThat(result.fishes())
                .extracting(Fish::getId)
                .containsExactly(FISH_SALMON);

        // Re-read to confirm it was persisted, not just echoed back.
        assertThat(repository.getById(MARENS_MERDER).organizations())
                .extracting(Organization::getId)
                .containsExactly(ORG_3);
    }

    @Test
    @DisplayName("addFacility creates a new facility with a generated id and the given organizations")
    void addFacilityCreatesFacilityWithOrganizations() {
        int facilitiesBefore = repository.getAll().size();

        FacilityUpdateDTO payload = new FacilityUpdateDTO(
                null,
                "Nytt anlegg",
                LocalDate.of(2025, 1, 15),
                List.of(ORG_1, ORG_2),
                List.of(FISH_COD),
                LOCATION_SEA
        );

        FacilityDetailsDTO created = repository.addFacility(payload);

        assertThat(created.id()).isNotNull();
        assertThat(created.name()).isEqualTo("Nytt anlegg");
        assertThat(created.registeredDate()).isEqualTo(LocalDate.of(2025, 1, 15));
        assertThat(created.location().getId()).isEqualTo(LOCATION_SEA);
        assertThat(created.organizations())
                .extracting(Organization::getId)
                .containsExactlyInAnyOrder(ORG_1, ORG_2);
        assertThat(created.fishes())
                .extracting(Fish::getId)
                .containsExactly(FISH_COD);

        // It is an additional row, and it is retrievable on its own.
        assertThat(repository.getAll())
                .hasSize(facilitiesBefore + 1)
                .extracting(FacilityOverviewDTO::id)
                .contains(created.id());

        assertThat(repository.getById(created.id()).organizations())
                .extracting(Organization::getId)
                .containsExactlyInAnyOrder(ORG_1, ORG_2);

        assertThat(repository.getById(created.id()).fishes())
                .extracting(Fish::getId)
                .containsExactlyInAnyOrder(FISH_COD);
    }
}
