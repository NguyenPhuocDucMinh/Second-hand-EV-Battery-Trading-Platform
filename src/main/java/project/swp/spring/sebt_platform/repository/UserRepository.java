package project.swp.spring.sebt_platform.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import project.swp.spring.sebt_platform.model.UserEntity;

public interface UserRepository extends JpaRepository<UserEntity,Long> {

    UserEntity findUserByEmail(String email);
    UserEntity findUserByUserName(String userName);
}
