package project.swp.spring.sebt_platform.model;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "Verify_pins")
public class VerifyPinsEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    private UserEntity user;

    @Column(name = "pins", nullable = false)
    private String pins;

    @Column(name = "expired_at", nullable = false, updatable = false)
    private LocalDateTime expiredAt;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    public VerifyPinsEntity(String pins, LocalDateTime expiredAt) {
        this.pins = pins;
        this.expiredAt = expiredAt;
    }

    public VerifyPinsEntity() {
    }

    public Long getId() {
        return id;
    }

    public String getPins() {
        return pins;
    }

    public LocalDateTime getExpiredAt() {
        return expiredAt;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setUser(UserEntity user) {
        this.user = user;
    }

    public void setPins(String pins) {
        this.pins = pins;
    }

    public void setExpiredAt(LocalDateTime expiredAt) {
        this.expiredAt = expiredAt;
    }
}