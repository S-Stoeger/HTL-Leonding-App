package at.htlleonding.omnial.model;

import jakarta.persistence.*;

@Entity
public class Room {
    @Id
    @SequenceGenerator(name = "room_seq", sequenceName = "room_seq")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "room_seq")
    private Long id;

    private String name;
    private String description;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
