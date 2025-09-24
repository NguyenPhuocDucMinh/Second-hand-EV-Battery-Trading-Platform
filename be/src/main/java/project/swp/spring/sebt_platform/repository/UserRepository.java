package project.swp.spring.sebt_platform.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import project.swp.spring.sebt_platform.model.UserEntity;

import java.util.Optional;

public interface UserRepository extends JpaRepository<UserEntity,Long> {

    UserEntity findUserByEmail(String email);
    UserEntity findUserByUserName(String userName);

    @Query(value = "SELECT * FROM users WHERE user_name COLLATE Latin1_General_CS_AS = :username", nativeQuery = true)
    UserEntity findByUsernameCaseSensitive(@Param("username") String username);


}
