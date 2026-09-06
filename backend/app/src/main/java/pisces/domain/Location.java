package pisces.domain;

import java.util.UUID;

public class Location {

    private final UUID id;

    private final String nbLabel;
    private final String enLabel;

    public Location(UUID id, String nbLabel, String enLabel) {
        this.id = id;
        this.nbLabel = nbLabel;
        this.enLabel = enLabel;
    }

    public UUID getId() {
        return id;
    }

    public String getNbLabel() {
        return nbLabel;
    }

    public String getEnLabel() {
        return enLabel;
    }
}
