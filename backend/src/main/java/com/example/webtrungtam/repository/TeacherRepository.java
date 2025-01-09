package com.example.webtrungtam.repository;

import com.example.webtrungtam.model.Student;
import com.example.webtrungtam.model.Teacher;
import org.jetbrains.annotations.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
public interface TeacherRepository extends JpaRepository<Teacher, String> {

    // Tìm danh sách tất cả học sinh
    @Override
    List<Teacher> findAll();

    @Query("SELECT t FROM Teacher t")
    List<Teacher> findAllTeachers();

    @Query("SELECT t FROM Teacher t JOIN t.user u")
    List<Teacher> findTeachersWithUsers();

    // Tìm số thứ tự cao nhất theo tiền tố của ID (YYKK)
    @Query("SELECT MAX(CAST(SUBSTRING(t.idTeacher, 5, 4) AS int)) FROM Teacher t WHERE t.idTeacher LIKE CONCAT(?1, '%')")
    Integer findMaxSequenceNumberByYearAndClass(String yearClassPrefix);

    // Tìm Student theo idUser
    Optional<Teacher> findByUserIdUser(String idUser);

    //@NotNull Optional<Teacher> findById(@NotNull String idTeacher);
    @Query(value = "SELECT * FROM Teacher WHERE id_teacher = :id", nativeQuery = true)
    Teacher findTeacherById(@Param("id") String id);

    @Query(value = "SELECT t.* FROM teacher t " +
            "INNER JOIN [Users] u ON t.user_id = u.id_user " +  // Sử dụng tên bảng SQL "Users"
            "WHERE LOWER(u.username) LIKE LOWER(CONCAT('%', :username, '%')) " +
            "ORDER BY u.username ASC, t.id_teacher ASC",
            nativeQuery = true)
    Page<Teacher> searchTeachersByName(@Param("username") String username, Pageable pageable);

    // Tìm giáo viên theo giới tính
    List<Teacher> findByGender(String gender);

    // Tìm giáo viên theo môn học
    List<Teacher> findBySubjectName(String subjectName);

    // Tìm giáo viên theo trường học
    List<Teacher> findBySchool(String school);

}