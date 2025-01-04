package com.example.webtrungtam.repository;

import com.example.webtrungtam.model.Student;
import com.example.webtrungtam.model.Teacher;
import org.jetbrains.annotations.NotNull;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface StudentRepository extends JpaRepository<Student, String> {

    // Tìm danh sách tất cả học sinh
    @Override
    List<Student> findAll();

    @Query("SELECT t FROM Teacher t")
    List<Student> findAllStudent();

    @Query("SELECT s FROM Student s JOIN s.user u")
    List<Student> findStudentsWithUsers();

    // Tìm số thứ tự cao nhất theo tiền tố của ID (YYKK)
    @Query("SELECT MAX(CAST(SUBSTRING(s.idStudent, 5, 4) AS int)) FROM Student s WHERE s.idStudent LIKE CONCAT(?1, '%')")
    Integer findMaxSequenceNumberByYearAndClass(String yearClassPrefix);

    // Tìm Student theo idUser
    Optional<Student> findByUserIdUser(String idUser);

    // SQL - Truy vấn trực tiếp trên bảng trong CSDL
    @Query(value = "SELECT * FROM Student WHERE id_student = :id", nativeQuery = true)
    Student findStudentById(@Param("id") String id);


    // Tìm học sinh theo giới tính
    List<Student> findByGender(String gender);

    // Tìm học sinh theo trường học
    List<Student> findBySchool(String school);

    // Tìm học sinh theo lớp học
    List<Student> findByClassOfSchool(String classOfSchool);
}