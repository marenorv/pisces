package pisces.domain;

import java.time.LocalDate;

public class Facility {

    private final Long id;

    private final String name;

    private final LocalDate registeredDate;

    public Facility(Long id, String name, LocalDate registeredDate) {
        this.id = id;
        this.name = name;
        this.registeredDate = registeredDate;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public LocalDate getRegisteredDate() {
        return registeredDate;
    }
}
