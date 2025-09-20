package project.swp.spring.sebt_platform.controller;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import project.swp.spring.sebt_platform.dto.request.*;
import project.swp.spring.sebt_platform.model.UserEntity;
import project.swp.spring.sebt_platform.service.AuthService;
import project.swp.spring.sebt_platform.service.MailService;
import project.swp.spring.sebt_platform.service.UserService;
import project.swp.spring.sebt_platform.util.Utils;

@RestController
@RequestMapping("api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @Autowired
    private UserService userService;

    @Autowired
    private MailService mailService;

    @Autowired
    private Utils utils;

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody UserRegisterDTO user) {
        try {
            // Validation
            if (user.username() == null || user.username().trim().isEmpty()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ErrorResponse("Username is required"));
            }
            if (user.password() == null || user.password().trim().isEmpty()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ErrorResponse("Password is required"));
            }
            if (user.email() == null || user.email().trim().isEmpty()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ErrorResponse("Email is required"));
            }
            
            // Email format validation
            if (!user.email().matches("^[A-Za-z0-9+_.-]+@(.+)$")) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ErrorResponse("Invalid email format"));
            }
            
            // Password strength validation
            if (user.password().length() < 6) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ErrorResponse("Password must be at least 6 characters"));
            }
            
            // Username length validation
            if (user.username().length() < 3 || user.username().length() > 20) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ErrorResponse("Username must be between 3-20 characters"));
            }
            
            // Check if user already exists
            if (userService.userExists(user.email(), user.username())) {
                return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(new ErrorResponse("Email or username already exists"));
            }
            
            // Register user
            boolean success = authService.register(user.username(), user.password(), user.email());
            if (success) {
                return ResponseEntity.ok(new SuccessResponse(
                    "Registration successful. Please check your email for verification."));
            } else {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponse("Registration failed"));
            }
        } catch (Exception e) {
            System.err.println("Registration error: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ErrorResponse("Registration failed"));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody UserLoginDTO user, HttpServletRequest request) {
        try {
            if (user.email() == null || user.password() == null) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ErrorResponse("Email and password are required"));
            }
            
            UserEntity loggedInUser = authService.login(user.email(), user.password());
            if (loggedInUser == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new ErrorResponse("Invalid email or password"));
            }
            
            // Check if user is activated
            if (!"actived".equals(loggedInUser.getStatus())) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(new ErrorResponse("Account not activated. Please verify your email first."));
            }
            
            // Tạo session
            HttpSession session = request.getSession(true);
            session.setAttribute("userId", loggedInUser.getId());
            session.setAttribute("username", loggedInUser.getUsername());
            session.setAttribute("email", loggedInUser.getEmail());
            session.setAttribute("role", loggedInUser.getRole());
            session.setAttribute("status", loggedInUser.getStatus());
            
            // Tạo DTO response
            UserSessionDTO sessionDTO = new UserSessionDTO(
                loggedInUser.getId(),
                loggedInUser.getUsername(),
                loggedInUser.getEmail(),
                loggedInUser.getRole(),
                loggedInUser.getStatus(),
                session.getId()
            );
            
            return ResponseEntity.ok(sessionDTO);
        } catch (Exception e) {
            System.err.println("Login error: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ErrorResponse("Login failed"));
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletRequest request) {
        try {
            HttpSession session = request.getSession(false);
            if (session != null) {
                session.invalidate();
            }
            return ResponseEntity.ok(new SuccessResponse("Logout successful"));
        } catch (Exception e) {
            System.err.println("Logout error: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ErrorResponse("Logout failed"));
        }
    }

    @PostMapping("/verify-email")
    public ResponseEntity<?> verifyEmail(@Valid @RequestBody UserVerifyEmailDTO user) {
        try {
            if (user.pins() == null || user.pins().trim().isEmpty()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ErrorResponse("PIN is required"));
            }
            if (user.email() == null || user.email().trim().isEmpty()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ErrorResponse("Email is required"));
            }
            
            boolean success = authService.verifyEmail(user.email(), user.pins());
            if (success) {
                return ResponseEntity.ok(new SuccessResponse("Email verified successfully"));
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ErrorResponse("Invalid PIN or email"));
            }
        } catch (Exception e) {
            System.err.println("Email verification error: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ErrorResponse("Verification failed"));
        }
    }

    @GetMapping("/current-user")
    public ResponseEntity<?> getCurrentUser(HttpServletRequest request) {
        try {
            HttpSession session = request.getSession(false);
            if (session == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new ErrorResponse("No active session"));
            }
            
            Long userId = (Long) session.getAttribute("userId");
            String username = (String) session.getAttribute("username");
            String email = (String) session.getAttribute("email");
            String role = (String) session.getAttribute("role");
            String status = (String) session.getAttribute("status");
            
            if (userId == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new ErrorResponse("Invalid session"));
            }
            
            UserSessionDTO sessionDTO = new UserSessionDTO(
                userId, username, email, role, status, session.getId()
            );
            
            return ResponseEntity.ok(sessionDTO);
        } catch (Exception e) {
            System.err.println("Get current user error: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ErrorResponse("Failed to get user information"));
        }
    }

    @GetMapping("/check-session")
    public ResponseEntity<?> checkSession(HttpServletRequest request) {
        try {
            HttpSession session = request.getSession(false);
            if (session == null) {
                return ResponseEntity.ok(new SessionCheckResponse(false, "No session"));
            }
            
            Long userId = (Long) session.getAttribute("userId");
            boolean isValid = userId != null;
            
            return ResponseEntity.ok(new SessionCheckResponse(isValid, 
                isValid ? "Valid session" : "Invalid session"));
        } catch (Exception e) {
            System.err.println("Check session error: " + e.getMessage());
            return ResponseEntity.ok(new SessionCheckResponse(false, "Session check failed"));
        }
    }

    // Helper classes for response
    public static class SuccessResponse {
        private String message;
        private boolean success = true;

        public SuccessResponse(String message) {
            this.message = message;
        }

        public String getMessage() { return message; }
        public boolean isSuccess() { return success; }
    }

    public static class ErrorResponse {
        private String message;
        private boolean success = false;

        public ErrorResponse(String message) {
            this.message = message;
        }

        public String getMessage() { return message; }
        public boolean isSuccess() { return success; }
    }

    public static class SessionCheckResponse {
        private boolean valid;
        private String message;

        public SessionCheckResponse(boolean valid, String message) {
            this.valid = valid;
            this.message = message;
        }

        public boolean isValid() { return valid; }
        public String getMessage() { return message; }
    }

    public static class ResendVerificationRequest {
        private String email;

        public ResendVerificationRequest(String email) {
            this.email = email;
        }

        public String email() { return email; }
    }
}
