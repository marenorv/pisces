package pisces.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "counts")
public class Count {

    @Id
    private Long id;

    @Column(name = "`value`")
    private int value;

    protected Count() {
    }

    public Count(Long id, int value) {
        this.id = id;
        this.value = value;
    }

    public Long getId() {
        return id;
    }

    public int getValue() {
        return value;
    }

    public void setValue(int value) {
        this.value = value;
    }
}
