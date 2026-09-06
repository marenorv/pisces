package pisces.dto;

import pisces.domain.Fish;
import pisces.domain.Location;
import pisces.domain.Organization;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

public record FacilityDetailsDTO(
        UUID id,
        String name,
        LocalDate registeredDate,
        List<Organization> organizations,
        List<Fish> fishes,
        Location location
) {}
