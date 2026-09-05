package pisces.domain;

import java.time.LocalDate;
import java.util.UUID;

public class Facility {

    private final UUID id;

    private final String name;

    private final LocalDate registeredDate;

    public Facility(UUID id, String name, LocalDate registeredDate) {
        this.id = id;
        this.name = name;
        this.registeredDate = registeredDate;
    }

    public UUID getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public LocalDate getRegisteredDate() {
        return registeredDate;
    }
}
