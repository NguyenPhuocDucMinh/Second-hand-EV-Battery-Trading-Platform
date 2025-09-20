package project.swp.spring.sebt_platform.service;

import project.swp.spring.sebt_platform.model.UserEntity;

import java.security.NoSuchAlgorithmException;


public interface UserService {
    public boolean updateProfile(UserEntity userEntity);
    public UserEntity findUserById(Long id);
    public UserEntity findUserByEmail(String email);
    public boolean userExists(String email, String username);
}
