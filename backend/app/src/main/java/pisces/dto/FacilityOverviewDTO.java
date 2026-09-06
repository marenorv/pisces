package pisces.dto;

import pisces.domain.Location;

import java.time.LocalDate;
import java.util.UUID;

public record FacilityOverviewDTO(
        UUID id,
        String name,
        LocalDate registeredDate,
        Location location
) {}
