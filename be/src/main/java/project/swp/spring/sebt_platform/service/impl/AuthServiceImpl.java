package project.swp.spring.sebt_platform.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import project.swp.spring.sebt_platform.model.UserEntity;
import project.swp.spring.sebt_platform.model.VerifyPinsEntity;
import project.swp.spring.sebt_platform.repository.UserRepository;
import project.swp.spring.sebt_platform.repository.VerifyPinsRepository;
import project.swp.spring.sebt_platform.service.AuthService;
import project.swp.spring.sebt_platform.service.MailService;
import project.swp.spring.sebt_platform.util.Utils;

import java.time.LocalDateTime;

@Service
public class AuthServiceImpl implements AuthService {

    @Autowired
    private final Utils utils;

    @Autowired
    private final UserRepository userRepository;

    @Autowired
    private final MailService mailService;

    @Autowired
    private final VerifyPinsRepository verifyPinsRepository;

    public AuthServiceImpl(Utils utils, UserRepository userRepository, MailService mailService, VerifyPinsRepository verifyPinsRepository) {
        this.utils = utils;
        this.userRepository = userRepository;
        this.mailService = mailService;
        this.verifyPinsRepository = verifyPinsRepository;
    }

    @Override
    public UserEntity login(String email, String password) {
        try{
            UserEntity user = userRepository.findUserByEmail(email);
            if(user == null) return null;

            password = utils.encript(password, user.getSalt());

            if(user.getPassword().equals(password)){
                return user;
            } else {
                return null;
            }
        } catch(Exception e){
            System.out.println(e.getMessage());
            return null;
        }
    }

    @Override
    public boolean register(String password, String email, String pins) {
        try{
            // create salt and hash password
            String salt = utils.generateSalt();
            String hashedPassword = utils.encript(password, salt);
            UserEntity newUser = new UserEntity( hashedPassword, email, salt);

            // create verify pins (plain text for email)
            String hashedPins = utils.encript(pins, salt);
            LocalDateTime expireTime = utils.getExpireTimeByDuration(30);
            VerifyPinsEntity verifyPinsEntity = new VerifyPinsEntity(hashedPins, expireTime);

            // set relationship
            verifyPinsEntity.setUser(newUser);
            newUser.setVerifyPins(verifyPinsEntity);
            userRepository.save(newUser);

            return true;
        } catch(Exception e){
            System.out.println("Registration error: " + e.getMessage());
            return false;
        }
    }

    @Override
    public boolean verifyEmail(String email, String pins) {
        // Check if user exists
        UserEntity user = userRepository.findUserByEmail(email);
        if(user == null) return false;
        if(user.getStatus().equals("actived")) return true;

        // Check if pins match and not expired
        VerifyPinsEntity userPins = verifyPinsRepository.findByUser_Id(user.getId());
        if(userPins.getExpiredAt().isBefore(LocalDateTime.now())) return false;

        // Encrypt input pins and compare
        pins = utils.encript(pins, user.getSalt());
        if(pins.equals(userPins.getPins())){
            user.setStatus("actived");
            userRepository.save(user);
            return true;
        }

        return false;
    }

    @Override
    public boolean logout() {
        return false;
    }

    @Override
    public String getCurrentUserName() {
        return "";
    }

    @Override
    public String getCurrentUserEmail() {
        return "";
    }

    @Override
    public Long getCurrentUserId() {
        return 0L;
    }
}
