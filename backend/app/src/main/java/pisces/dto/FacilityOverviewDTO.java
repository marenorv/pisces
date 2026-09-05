package pisces.dto;

import java.time.LocalDate;
import java.util.UUID;

public record FacilityOverviewDTO(
        UUID id,
        String name,
        LocalDate registeredDate
) {}
