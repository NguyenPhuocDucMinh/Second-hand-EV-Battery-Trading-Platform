package project.swp.spring.sebt_platform.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import project.swp.spring.sebt_platform.model.UserEntity;
import project.swp.spring.sebt_platform.repository.UserRepository;
import project.swp.spring.sebt_platform.service.UserService;


@Service
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;

    @Autowired
    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public boolean updateProfile(UserEntity userEntity) {
        return false;
    }

    @Override
    public UserEntity findUserById(Long id) {
        return null;
    }

    @Override
    public UserEntity findUserByEmail(String email) {
        return null;
    }

    @Override
    public UserEntity findUserByUserNameCaseSensitive(String userName) {
        return userRepository.findByUsernameCaseSensitive(userName);
    }

}
