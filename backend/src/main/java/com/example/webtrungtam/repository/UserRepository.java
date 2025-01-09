package com.example.webtrungtam.repository;

import com.example.webtrungtam.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, String> {

    // Tìm kiếm người dùng bằng tên đăng nhập
    Optional<User> findByUsername(String username);

    // Tìm kiếm theo từ khóa trong username
    @Query("SELECT u FROM User u " +
            "WHERE LOWER(u.username) LIKE LOWER(CONCAT('%', :username, '%')) " +
            "ORDER BY u.username ASC")
    List<User> findByUsernameContaining(@Param("username") String username);

    // Kiểm tra ID tồn tại
    @Query("SELECT COUNT(u) > 0 FROM User u WHERE u.id = :id")
    boolean existsByStringId(@Param("id") String idUser);
    // Tìm User dựa trên idUser
    Optional<User> findByIdUser(String idUser);

    // Kiểm tra sự tồn tại của idUser
    boolean existsByIdUser(String idUser);

    // Tìm User có idUser lớn nhất
    @Query("SELECT u FROM User u ORDER BY u.idUser DESC")
    Optional<User> findTopByOrderByIdUserDesc();
}
