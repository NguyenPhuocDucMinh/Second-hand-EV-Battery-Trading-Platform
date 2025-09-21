package project.swp.spring.sebt_platform.service;

import project.swp.spring.sebt_platform.model.UserEntity;

public interface AuthService {
    public UserEntity login(String userName, String password);
    public boolean register(String userName, String password, String email,String pins);
    public boolean verifyEmail(String email, String pins);
    public boolean logout();
    public String getCurrentUserName();
    public String getCurrentUserEmail();
    Long getCurrentUserId();
}
