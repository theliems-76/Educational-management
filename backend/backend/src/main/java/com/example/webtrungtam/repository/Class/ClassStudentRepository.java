package com.example.webtrungtam.repository.Class;

import com.example.webtrungtam.model.ClassEntity;
import com.example.webtrungtam.model.ClassStudent;
import com.example.webtrungtam.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ClassStudentRepository extends JpaRepository<ClassStudent, Integer> {

    // Tìm danh sách lớp mà học sinh tham gia dựa trên ID học sinh
    List<ClassStudent> findByIdStudent_IdStudent(String idStudent);

    // Tìm tất cả các bản ghi liên quan đến một học sinh cụ thể
    List<ClassStudent> findByIdStudent(Student student);

    List<ClassStudent> findByIdClass_IdClass(int idClass); // Tìm theo id của Class
    boolean existsByIdClassAndIdStudent(ClassEntity idClass, Student idStudent);

    Optional<ClassStudent> findByIdClassAndIdStudent(ClassEntity idClass, Student idStudent);
}
