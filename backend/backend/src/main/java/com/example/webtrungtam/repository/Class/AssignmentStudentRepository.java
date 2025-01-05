package com.example.webtrungtam.repository.Class;

import com.example.webtrungtam.model.AssignmentStudent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AssignmentStudentRepository extends JpaRepository<AssignmentStudent, Integer> {
}
