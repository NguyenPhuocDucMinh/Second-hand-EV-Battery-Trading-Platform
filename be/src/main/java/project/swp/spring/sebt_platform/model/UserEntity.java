package project.swp.spring.sebt_platform.model;
import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import java.time.LocalDateTime;

@Entity
@Table (name = "users")
public class UserEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_name", nullable = false, unique = true)
    private String userName;

    @Column(name = "password", nullable = false)
    private String password;

    @Column(name = "email", nullable = false, unique = true)
    private String email;

    @Column (name = "role", nullable = false)
    private String role;

    @Column (name = "bank_account", nullable = true)
    private String bankAccount;

    @Column (name = "phone_number", nullable = true)
    private String phoneNumber;

    @Column (name = "avatar", nullable = true)
    private String avatar;

    @Column (name = "address", nullable = true)
    private String address;

    @Column (name = "status", nullable = false)
    private String status;

    @Column (name = "personal_pins", nullable = true)
    private String personalPins;

    @OneToOne(mappedBy = "user",cascade = CascadeType.ALL)
    private VerifyPinsEntity verifyPins;

    @Column (name = "salt", updatable = false, nullable = false)
    private String salt;

    @Column (name = "created_at", updatable = false,nullable = false)
    @CreationTimestamp
    private LocalDateTime createdAt;

    // Constructors
    public UserEntity() {}

    public UserEntity(String userName, String password, String email, String salt) {
        this.userName = userName;
        this.password = password;
        this.email = email;
        this.salt = salt;
        this.role = "member";
        this.status = "blocked";
        this.avatar = "unknown.png";
        this.verifyPins = new VerifyPinsEntity();
    }

    public Long getId() {
        return this.id;
    }

    public String getUsername() {
        return userName;
    }

    public String getPassword() {
        return password;
    }

    public String getEmail() {
        return email;
    }

    public String getRole() {
        return role;
    }

    public String getBankAccount() {
        return bankAccount;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public String getAvatar() {
        return avatar;
    }

    public String getAddress() {
        return address;
    }

    public  String getStatus() {
        return status;
    }

    public String getPersonalPins() {
        return personalPins;
    }

    public VerifyPinsEntity getVerifyPins() {
        return verifyPins;
    }

    public String getSalt() {
        return salt;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setUsername(String userName) {
        this.userName = userName;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setBankAccount(String bankAccount) {
        this.bankAccount = bankAccount;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public void setVerifyPins(VerifyPinsEntity verifyPins) {
        this.verifyPins = verifyPins;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public void setPersonalPins(String personalPins) {
        this.personalPins = personalPins;
    }

    public void setSalt(String salt) {
        this.salt = salt;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }
}
