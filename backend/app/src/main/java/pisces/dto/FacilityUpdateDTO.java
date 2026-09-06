package pisces.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PastOrPresent;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

public record FacilityUpdateDTO(
        UUID id,
        @NotNull String name,
        @NotNull
        @PastOrPresent(message = "registeredDate cannot be in the future")
        LocalDate registeredDate,
        @NotNull List<UUID> organizations,
        @NotNull List<UUID> fishes,
        @NotNull UUID location
) {}
