package com.example.webtrungtam.repository.Class;

import com.example.webtrungtam.model.ClassEntity;
import com.example.webtrungtam.model.Subject;
import com.example.webtrungtam.model.Teacher;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ClassRepository extends JpaRepository<ClassEntity, Integer> {
    // Tìm lớp học theo tên lớp (className)
    List<ClassEntity> findByClassNameContaining(String className);

    // Tìm lớp học theo ID giáo viên (teacherId)
    List<ClassEntity> findByTeacher(Teacher teacher);

    // Tìm tất cả các lớp học của một giáo viên cụ thể
    List<ClassEntity> findAllByTeacher(Teacher teacher);

    // Kiểm tra lớp học có tồn tại dựa trên tên lớp và giáo viên
    boolean existsByClassNameAndTeacher(String className, Teacher teacher);
}
