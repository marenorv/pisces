package pisces.dto;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

public record FacilityUpdateDTO(
        UUID id,
        String name,
        LocalDate registeredDate,
        List<UUID> organizations,
        List<UUID> fishes,
        UUID location
) {}
