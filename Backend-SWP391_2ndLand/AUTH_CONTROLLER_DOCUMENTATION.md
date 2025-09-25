# AuthController Documentation

## Overview
The AuthController handles all authentication-related operations for the Second-hand EV & Battery Trading Platform. It provides endpoints for user registration, email verification, login, logout, and session management with enhanced security features and Vietnamese language support.

## Class Structure
```java
@RestController
@RequestMapping("api/auth")
public class AuthController
```

**Package:** `project.swp.spring.sebt_platform.controller`

**Dependencies:**
- `AuthService` - Authentication business logic
- `UserService` - User management operations  
- `MailService` - Email sending functionality
- `Utils` - Utility functions (PIN generation, etc.)

## Endpoints Overview

| Method | Endpoint | Description | Authentication Required |
|--------|----------|-------------|------------------------|
| POST | `/api/auth/register` | Register new user account | No |
| POST | `/api/auth/verify-email` | Verify email with PIN | No (Session-based) |
| POST | `/api/auth/login` | User login | No |
| POST | `/api/auth/logout` | User logout | Yes |
| GET | `/api/auth/current-user` | Get current user info | Yes |
| GET | `/api/auth/check-session` | Check session validity | No |

---

## 1. User Registration

### Endpoint
**POST** `/api/auth/register`

### Description
Creates a new user account and initiates the email verification process by sending a PIN to the user's email address.

### Request Body
```json
{
    "email": "user@example.com",
    "password": "securePassword123"
}
```

### Validation Rules
- **Email**: Required, must be valid email format
- **Password**: Required, minimum 6 characters
- **Email Format**: Must match regex pattern `^[A-Za-z0-9+_.-]+@(.+)$`

### Success Response (200 OK)
```json
{
    "message": "Please check your email for verification.",
    "success": true
}
```

### Error Responses

#### 400 Bad Request - Missing Password
```json
{
    "message": "Password is required",
    "success": false
}
```

#### 400 Bad Request - Missing Email
```json
{
    "message": "Email is required",
    "success": false
}
```

#### 400 Bad Request - Invalid Email Format
```json
{
    "message": "Invalid email format",
    "success": false
}
```

#### 400 Bad Request - Weak Password
```json
{
    "message": "Password must be at least 6 characters",
    "success": false
}
```

#### 500 Internal Server Error
```json
{
    "message": "Registration failed",
    "success": false
}
```

### Business Logic
1. **Input Validation**: Validates email format and password strength
2. **PIN Generation**: Generates a 6-digit verification PIN using `utils.generatePins()`
3. **Session Storage**: Stores PIN, password, and email in HTTP session for verification
4. **Email Sending**: Sends verification email with PIN using `mailService.sendVerificationEmail()`
5. **Response**: Returns success message prompting user to check email

### Session Data Stored
- `pins`: Generated verification PIN
- `password`: User's password (temporarily stored for registration completion)
- `email`: User's email address

### Example Usage
```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john.doe@example.com",
    "password": "mySecurePass123"
  }'
```

---

## 2. Email Verification

### Endpoint
**POST** `/api/auth/verify-email`

### Description
Verifies the user's email address using the PIN sent during registration and completes the user account creation process.

### Request Body
```json
{
    "email": "user@example.com",
    "pins": "123456"
}
```

### Validation Rules
- **Email**: Required, must match session email
- **PIN**: Required, must match session PIN

### Success Response (200 OK)
```json
{
    "message": "Email verified, register successfully",
    "success": true
}
```

### Error Responses

#### 400 Bad Request - Missing PIN
```json
{
    "message": "PIN is required",
    "success": false
}
```

#### 400 Bad Request - Missing Email
```json
{
    "message": "Email is required",
    "success": false
}
```

#### 400 Bad Request - No Registration Session
```json
{
    "message": "No verification process found. Please register again.",
    "success": false
}
```

#### 200 OK - Incorrect PIN (Note: Returns 200 but with error message)
```json
{
    "message": "OTP does not match.",
    "success": false
}
```

#### 400 Bad Request - Verification Failed
```json
{
    "message": "Invalid PIN or email",
    "success": false
}
```

#### 500 Internal Server Error
```json
{
    "message": "Verification failed",
    "success": false
}
```

### Business Logic
1. **Input Validation**: Ensures PIN and email are provided
2. **Session Retrieval**: Gets stored PIN, email, and password from session
3. **PIN Verification**: Compares provided PIN with session PIN
4. **Account Creation**: Calls `authService.register()` to create the user account
5. **Session Cleanup**: Invalidates session after successful verification

### Session Dependencies
Requires session data from registration:
- `pins`: Verification PIN from registration
- `email`: User's email address
- `password`: User's password for account creation

### Example Usage
```bash
curl -X POST http://localhost:8080/api/auth/verify-email \
  -H "Content-Type: application/json" \
  -H "Cookie: JSESSIONID=your-session-id" \
  -d '{
    "email": "john.doe@example.com",
    "pins": "123456"
  }'
```

---

## 3. User Login

### Endpoint
**POST** `/api/auth/login`

### Description
Authenticates a user with their email and password, creates a new session, and returns user information.

### Request Body
```json
{
    "email": "user@example.com",
    "password": "securePassword123"
}
```

### Validation Rules
- **Email**: Required, must be registered user email
- **Password**: Required, must match user's password
- **Account Status**: User must have ACTIVE status

### Success Response (200 OK)
```json
{
    "id": 1,
    "username": "user@example.com",
    "email": "user@example.com",
    "role": "MEMBER",
    "status": "ACTIVE",
    "sessionId": "A1B2C3D4E5F6"
}
```

### Error Responses

#### 400 Bad Request - Missing Credentials
```json
{
    "message": "Email and password are required",
    "success": false
}
```

#### 401 Unauthorized - Invalid Credentials
```json
{
    "message": "email or password is incorrect",
    "success": false
}
```

#### 403 Forbidden - Account Not Activated
```json
{
    "message": "Account not activated. Please verify your email first.",
    "success": false
}
```

#### 500 Internal Server Error
```json
{
    "message": "Login failed",
    "success": false
}
```

### Business Logic
1. **Input Validation**: Ensures email and password are provided
2. **Authentication**: Calls `authService.login()` to verify credentials
3. **Status Check**: Verifies user status is ACTIVE
4. **Session Creation**: Creates new HTTP session with user data
5. **Response Generation**: Returns user information with session ID

### Session Data Created
- `userId`: User's database ID
- `username`: User's username
- `email`: User's email address
- `role`: User's role (MEMBER/ADMIN)
- `status`: User's status (ACTIVE/INACTIVE/etc.)

### Example Usage
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john.doe@example.com",
    "password": "mySecurePass123"
  }'
```

---

## 4. Get Current User

### Endpoint
**GET** `/api/auth/current-user`

### Description
Retrieves the current logged-in user's information from the active session.

### Request
No request body required. Uses session data.

### Success Response (200 OK)
```json
{
    "id": 1,
    "username": "user@example.com",
    "email": "user@example.com",
    "role": "MEMBER",
    "status": "ACTIVE",
    "sessionId": "A1B2C3D4E5F6"
}
```

### Error Responses

#### 401 Unauthorized - No Session
```json
{
    "message": "No active session",
    "success": false
}
```

#### 401 Unauthorized - Invalid Session
```json
{
    "message": "Invalid session",
    "success": false
}
```

#### 500 Internal Server Error
```json
{
    "message": "Failed to get user information",
    "success": false
}
```

### Business Logic
1. **Session Retrieval**: Gets current HTTP session
2. **Session Validation**: Checks if session exists and contains user data
3. **Data Extraction**: Retrieves user information from session attributes
4. **Response Creation**: Creates and returns user session response DTO

### Authentication Required
This endpoint requires a valid session with user data.

### Example Usage
```bash
curl -X GET http://localhost:8080/api/auth/current-user \
  -H "Cookie: JSESSIONID=your-session-id"
```

---

## 5. Check Session

### Endpoint
**GET** `/api/auth/check-session`

### Description
Checks if the current session is valid and contains user authentication data.

### Request
No request body required.

### Success Responses

#### Valid Session (200 OK)
```json
{
    "valid": true,
    "message": "Valid session"
}
```

#### Invalid/No Session (200 OK)
```json
{
    "valid": false,
    "message": "No session"
}
```

#### Session Check Failed (200 OK)
```json
{
    "valid": false,
    "message": "Session check failed"
}
```

### Business Logic
1. **Session Retrieval**: Gets current HTTP session
2. **Session Validation**: Checks if session exists and contains userId
3. **Status Response**: Returns session validity status

### Response Class
```java
public static class SessionCheckResponse {
    private boolean valid;
    private String message;
    
    // Constructor and getters
}
```

### Example Usage
```bash
curl -X GET http://localhost:8080/api/auth/check-session \
  -H "Cookie: JSESSIONID=your-session-id"
```

---

## 6. User Logout

### Endpoint
**POST** `/api/auth/logout`

### Description
Logs out the current user by invalidating their session.

### Request
No request body required.

### Success Response (200 OK)
```json
{
    "message": "Logout successful",
    "success": true
}
```

### Error Responses

#### 500 Internal Server Error
```json
{
    "message": "Logout failed",
    "success": false
}
```

### Business Logic
1. **Session Retrieval**: Gets current HTTP session
2. **Session Invalidation**: Invalidates session if it exists
3. **Cleanup**: Clears all session attributes
4. **Response**: Returns logout success confirmation

### Example Usage
```bash
curl -X POST http://localhost:8080/api/auth/logout \
  -H "Cookie: JSESSIONID=your-session-id"
```

---

## Data Transfer Objects (DTOs)

### Request DTOs

#### UserRegisterFormDTO
```java
public record UserRegisterFormDTO(
    String email,
    String password
) {}
```

#### UserLoginFormDTO
```java
public record UserLoginFormDTO(
    String email,
    String password
) {}
```

#### UserVerifyEmailFormDTO
```java
public record UserVerifyEmailFormDTO(
    String email,
    String pins
) {}
```

### Response DTOs

#### UserSessionResponseDTO
```java
public class UserSessionResponseDTO {
    private Long id;
    private String username;
    private String email;
    private UserRole role;
    private UserStatus status;
    private String sessionId;
}
```

#### SuccessResponseDTO
```java
public class SuccessResponseDTO {
    private String message;
    private boolean success = true;
}
```

#### ErrorResponseDTO
```java
public class ErrorResponseDTO {
    private String message;
    private boolean success = false;
}
```

---

## Session Management

### Session Configuration
- **Session Name**: JSESSIONID (default Spring session)
- **Session Storage**: Server memory
- **Session Timeout**: Configurable (default: 30 minutes)
- **Session Scope**: HTTP request/response cycle

### Session Security Features
- **Session Creation**: New session created only on successful login
- **Session Validation**: Checked on protected endpoints
- **Session Invalidation**: Properly cleaned up on logout
- **Data Protection**: Sensitive data properly stored and retrieved

### Session Attributes
| Attribute | Type | Description | Set During |
|-----------|------|-------------|------------|
| `userId` | Long | User's database ID | Login |
| `username` | String | User's username | Login |
| `email` | String | User's email | Login |
| `role` | UserRole | User's role (MEMBER/ADMIN) | Login |
| `status` | UserStatus | User's status | Login |
| `pins` | String | Verification PIN | Registration |
| `password` | String | User's password | Registration (temporary) |

---

## Error Handling

### Exception Handling Strategy
All endpoints use try-catch blocks with:
- **Specific Error Messages**: Clear, user-friendly error descriptions
- **Proper HTTP Status Codes**: 400, 401, 403, 500 as appropriate
- **Logging**: Server-side error logging with `System.err.println()`
- **Consistent Response Format**: Standardized error response structure

### Common Error Scenarios

#### Validation Errors (400 Bad Request)
- Missing required fields
- Invalid data format
- Business rule violations

#### Authentication Errors (401 Unauthorized)
- Invalid credentials
- No active session
- Session expired

#### Authorization Errors (403 Forbidden)
- Account not activated
- Insufficient permissions

#### Server Errors (500 Internal Server Error)
- Database connection issues
- Email service failures
- Unexpected exceptions

---

## Security Features

### Input Validation
- **Email Format**: Regex validation for email addresses
- **Password Strength**: Minimum 6 characters required
- **Required Fields**: Null and empty string checks
- **Data Sanitization**: Trim whitespace from inputs

### Session Security
- **Secure Session Creation**: Sessions created only when needed
- **Session Invalidation**: Proper cleanup on logout
- **Session Validation**: Checked before accessing protected resources
- **Data Isolation**: User data properly isolated per session

### Error Information Disclosure
- **Generic Error Messages**: No sensitive information in error responses
- **Server-side Logging**: Detailed errors logged server-side only
- **Status Code Consistency**: Appropriate HTTP status codes used

---

## Integration Points

### Service Dependencies

#### AuthService
- `login(email, password)`: Authenticates user credentials
- `register(password, email)`: Creates new user account

#### UserService
- User management operations
- User data retrieval and updates

#### MailService
- `sendVerificationEmail(email, pins)`: Sends verification email with PIN

#### Utils
- `generatePins()`: Generates 6-digit verification PIN
- Other utility functions

### Database Integration
- User authentication data stored in `users` table
- Session data temporarily stored in memory
- Email verification PINs managed through session

---

## Testing Scenarios

### Registration Flow Testing
```bash
# 1. Register user
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com", "password": "test123"}'

# 2. Verify email (use PIN from email)
curl -X POST http://localhost:8080/api/auth/verify-email \
  -H "Content-Type: application/json" \
  -H "Cookie: JSESSIONID=session-from-register" \
  -d '{"email": "test@example.com", "pins": "123456"}'
```

### Login Flow Testing
```bash
# 1. Login
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com", "password": "test123"}'

# 2. Check current user
curl -X GET http://localhost:8080/api/auth/current-user \
  -H "Cookie: JSESSIONID=session-from-login"

# 3. Logout
curl -X POST http://localhost:8080/api/auth/logout \
  -H "Cookie: JSESSIONID=session-from-login"
```

### Session Management Testing
```bash
# Check session validity
curl -X GET http://localhost:8080/api/auth/check-session \
  -H "Cookie: JSESSIONID=your-session-id"
```

---

## Configuration Requirements

### Application Properties
```properties
# Session configuration
server.servlet.session.timeout=30m
server.servlet.session.cookie.name=JSESSIONID
server.servlet.session.cookie.secure=false
server.servlet.session.cookie.http-only=true

# Email configuration
spring.mail.host=smtp.gmail.com
spring.mail.port=587
spring.mail.username=${MAIL_USERNAME}
spring.mail.password=${EMAIL_API_KEY}
```

### Environment Variables
```bash
MAIL_USERNAME=your-email@gmail.com
EMAIL_API_KEY=your-app-password
DB_USERNAME=database-username
DB_PASSWORD=database-password
```

---

## Best Practices

### Implementation Guidelines
1. **Always validate input** before processing
2. **Use proper HTTP status codes** for responses
3. **Log errors server-side** while keeping client errors generic
4. **Invalidate sessions** properly on logout
5. **Check session validity** on protected endpoints
6. **Handle exceptions gracefully** with try-catch blocks

### Security Guidelines
1. **Never expose sensitive data** in error messages
2. **Validate session data** before using it
3. **Use HTTPS in production** for secure communication
4. **Implement proper session timeout** to prevent stale sessions
5. **Sanitize and validate all inputs** to prevent injection attacks

### Performance Guidelines
1. **Use session efficiently** - don't store unnecessary data
2. **Minimize database calls** by reusing session data when possible
3. **Implement proper caching** for frequently accessed data
4. **Use appropriate response codes** to enable client-side caching

---

## Troubleshooting

### Common Issues

#### "No active session" Error
- **Cause**: Session expired or doesn't exist
- **Solution**: Login again to create new session
- **Prevention**: Implement session timeout handling on client side

#### "OTP does not match" Error
- **Cause**: Incorrect PIN or session expired during registration
- **Solution**: Start registration process again
- **Prevention**: Implement proper session timeout for registration flow

#### "Account not activated" Error
- **Cause**: User hasn't completed email verification
- **Solution**: Complete email verification process
- **Prevention**: Clear messaging about verification requirement

#### Email not received during registration
- **Cause**: Email service issues or spam filtering
- **Solution**: Check spam folder, verify email configuration
- **Prevention**: Implement email delivery status checking

### Debugging Tips
1. **Check server logs** for detailed error information
2. **Verify session cookies** are being sent with requests
3. **Confirm email service configuration** for registration issues
4. **Test with different browsers** to isolate session issues
5. **Use network tools** to inspect request/response details

---

## Future Enhancements

### Potential Improvements
1. **Rate Limiting**: Implement request rate limiting for security
2. **JWT Tokens**: Consider JWT tokens for stateless authentication
3. **Multi-factor Authentication**: Add 2FA support
4. **Password Reset**: Implement password reset functionality
5. **Account Lockout**: Add account lockout after failed login attempts
6. **Session Persistence**: Consider database-backed session storage
7. **Email Templates**: Enhance email templates with better design
8. **Internationalization**: Add multi-language support for error messages

### API Versioning
Consider implementing API versioning for future changes:
- `/api/v1/auth/` for current version
- `/api/v2/auth/` for future enhancements

This documentation covers the complete functionality of the AuthController and should be updated as the implementation evolves.
