import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "animals")
public class animal {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long animalId;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String description;

    @Column(nullable = false)
    private String origin;

    @Column(nullable = false)
    private String dangerLevel;

    public Animal() {
    }

    public Animal(String name, String description, String origin, String dangerLevel) {
        this.name = name;
        this.description = description;
        this.origin = origin;
        this.dangerLevel = dangerLevel;
    }

        this.name = name;
        this.description = description;
        this.origin = origin;
    }

    // Getters and Setters
    public Long getAnimalId() {
        return animalId;
    }

    public void setAnimalId(Long animalId) {
        this.animalId = animalId;
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