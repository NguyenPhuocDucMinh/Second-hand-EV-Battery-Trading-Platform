package project.swp.spring.sebt_platform.model;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDate;
import java.time.LocalDateTime;
import project.swp.spring.sebt_platform.model.enums.ApprovalStatus;

@Entity
@Table(name = "post_requests",
    indexes = {
        @Index(name = "idx_post_requests_status", columnList = "status"),
        @Index(name = "idx_post_requests_requested_date", columnList = "requested_date")
    }
)
public class PostRequestEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY,cascade = CascadeType.ALL)
    @JoinColumn(name = "listing_id", nullable = false)
    private ListingEntity listing;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private ApprovalStatus status = ApprovalStatus.PENDING;

    @Column(columnDefinition = "TEXT")
    private String adminNotes;

    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column
    private LocalDateTime reviewedAt;

    // Note: If multiple revisions allowed: consider versioning or unique active per listing.
    // Getters and setters ...


    public Long getId() {
        return id;
    }

    public LocalDateTime getReviewedAt() {
        return reviewedAt;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public String getAdminNotes() {
        return adminNotes;
    }

    public ApprovalStatus getStatus() {
        return status;
    }

    public ListingEntity getListing() {
        return listing;
    }

    public void setListing(ListingEntity listing) {
        this.listing = listing;
    }

    public void setStatus(ApprovalStatus status) {
        this.status = status;
    }

    public void setAdminNotes(String adminNotes) {
        this.adminNotes = adminNotes;
    }
}

