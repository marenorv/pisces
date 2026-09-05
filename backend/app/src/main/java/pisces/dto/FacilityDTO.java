package pisces.dto;

import pisces.domain.Organization;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

public record FacilityDTO(
        UUID id,
        String name,
        LocalDate registeredDate,
        List<Organization> organizations
) {}
