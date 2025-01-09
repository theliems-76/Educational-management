package com.example.webtrungtam.repository.Class;

import com.example.webtrungtam.model.DocumentStudent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DocumentStudentRepository extends JpaRepository<DocumentStudent, Integer> {
}
