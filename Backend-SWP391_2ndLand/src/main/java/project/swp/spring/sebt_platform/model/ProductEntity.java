package project.swp.spring.sebt_platform.model;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import java.time.LocalDateTime;

@Entity
@Table(name = "products",
    indexes = {
        @Index(name = "idx_products_category_id", columnList = "category_id")
    }
)
public class ProductEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "ev_id")
    private EvVehicleEntity evVehicle;

    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "battery_id")
    private BatteryEntity battery;

    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    // Note: Logical constraint (enforce at DB): exactly ONE of (ev_id, battery_id) must be NOT NULL.

    // Constructors
    public ProductEntity() {}

    public ProductEntity(EvVehicleEntity evVehicle) {
        this.evVehicle = evVehicle;
    }
    public ProductEntity(BatteryEntity battery) {
        this.battery = battery;
    }
    // Getters and setters


    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public BatteryEntity getBattery() {
        return battery;
    }

    public EvVehicleEntity getEvVehicle() {
        return evVehicle;
    }

    public Long getId() {
        return id;
    }

    public void setEvVehicle(EvVehicleEntity evVehicle) {
        this.evVehicle = evVehicle;
    }

    public void setBattery(BatteryEntity battery) {
        this.battery = battery;
    }
}
