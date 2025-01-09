package com.example.webtrungtam.repository;

import com.example.webtrungtam.model.Student;
import com.example.webtrungtam.model.StudentId;
import org.apache.catalina.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface StudentRepository extends JpaRepository<Student, StudentId> {

    // Tìm danh sách tất cả học sinh
    @Override
    List<Student> findAll();

    // Tìm số thứ tự cao nhất theo tiền tố của ID (YYKK)
    @Query("SELECT MAX(CAST(SUBSTRING(s.idStudent, 5, 4) AS int)) FROM Student s WHERE s.idStudent LIKE CONCAT(?1, '%')")
    Integer findMaxSequenceNumberByYearAndClass(String yearClassPrefix);

    // Tìm Student theo idUser
    Optional<Student> findByUserIdUser(String idUser);

}