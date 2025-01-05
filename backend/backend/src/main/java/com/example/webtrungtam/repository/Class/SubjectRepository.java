package com.example.webtrungtam.repository.Class;

import com.example.webtrungtam.model.Subject;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SubjectRepository extends JpaRepository<Subject, Integer> {

    // Tìm môn học theo tên
    List<Subject> findBySubjectName(String subjectName);
}
