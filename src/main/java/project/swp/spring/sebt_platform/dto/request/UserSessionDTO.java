package project.swp.spring.sebt_platform.dto.request;

public record UserSessionDTO(
    Long id,
    String username,
    String email,
    String role,
    String status,
    String sessionId
) {}