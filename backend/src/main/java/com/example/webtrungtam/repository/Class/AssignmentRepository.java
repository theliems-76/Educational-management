package com.example.webtrungtam.repository.Class;

import com.example.webtrungtam.model.Assignment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface AssignmentRepository extends JpaRepository<Assignment, Integer> {

    List<Assignment> findByTitleContaining(String title);

    List<Assignment> findByAssignmentDateBetween(LocalDate startDate, LocalDate endDate);

    List<Assignment> findByTitleContainingAndAssignmentDateBetween(String title, LocalDate startDate, LocalDate endDate);

}
