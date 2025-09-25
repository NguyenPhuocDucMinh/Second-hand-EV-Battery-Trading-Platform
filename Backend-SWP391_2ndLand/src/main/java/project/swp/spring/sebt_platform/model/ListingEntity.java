package project.swp.spring.sebt_platform.model;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import project.swp.spring.sebt_platform.model.dto.response.ListingCartResponseDTO;
import project.swp.spring.sebt_platform.model.enums.ListingStatus;
import project.swp.spring.sebt_platform.model.enums.ListingType;

@Entity
@Table(name = "listings",
    indexes = {
        @Index(name = "idx_listings_seller_id", columnList = "seller_id"),
        @Index(name = "idx_listings_status", columnList = "status"),
        @Index(name = "idx_listings_listing_type", columnList = "listing_type"),
        @Index(name = "idx_listings_location", columnList = "location"),
        @Index(name = "idx_listings_created_at", columnList = "created_at"),
        @Index(name = "idx_listings_status_expires_at", columnList = "status, expires_at")
    }
)
public class ListingEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "seller_id", nullable = false)
    private UserEntity seller;

    @OneToOne(fetch = FetchType.LAZY,cascade = CascadeType.ALL)
    @JoinColumn(name = "product_id", nullable = false)
    private ProductEntity product;

    @Column(length = 200, nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String mainImage;

    @OneToMany
    private List<ListingImageEntity> listingImages;

    @Column(length = 200, nullable = false)
    private String location;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private ListingStatus status = ListingStatus.DRAFT;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private ListingType listingType = ListingType.NORMAL;

    @Column(precision = 15, scale = 2, nullable = false)
    private BigDecimal price;

    @Column
    private Integer viewsCount = 0;

    @Column
    private LocalDateTime expiresAt;

    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(nullable = false)
    private LocalDateTime updatedAt;

    // Note: Enforce workflow externally. For full-text search add separate search index (outside DBML).
    // Getters and setters ...

    public Long getId() {
        return id;
    }

    public UserEntity getSeller() {
        return seller;
    }

    public ProductEntity getProduct() {
        return product;
    }

    public String getTitle() {
        return title;
    }

    public String getMainImage() {
        return mainImage;
    }

    public List<ListingImageEntity> getListingImages() {
        return listingImages;
    }

    public String getLocation() {
        return location;
    }

    public String getDescription() {
        return description;
    }

    public ListingStatus getStatus() {
        return status;
    }

    public ListingType getListingType() {
        return listingType;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public Integer getViewsCount() {
        return viewsCount;
    }

    public LocalDateTime getExpiresAt() {
        return expiresAt;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setSeller(UserEntity seller) {
        this.seller = seller;
    }

    public void setProduct(ProductEntity product) {
        this.product = product;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setMainImage(String mainImage) {
        this.mainImage = mainImage;
    }

    public void setListingImages(List<ListingImageEntity> listingImages) {
        this.listingImages = listingImages;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setStatus(ListingStatus status) {
        this.status = status;
    }

    public void setListingType(ListingType listingType) {
        this.listingType = listingType;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public void setViewsCount(Integer viewsCount) {
        this.viewsCount = viewsCount;
    }
}

