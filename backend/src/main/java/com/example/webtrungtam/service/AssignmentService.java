package com.example.webtrungtam.service;

import com.example.webtrungtam.model.Assignment;
import com.example.webtrungtam.repository.Class.AssignmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class AssignmentService {

    @Autowired
    private AssignmentRepository assignmentRepository;

    public List<Assignment> getAllAssignments() {
        return assignmentRepository.findAll();
    }

    public Assignment getAssignmentById(Integer id) {
        return assignmentRepository.findById(id).orElse(null);
    }

    public Assignment saveAssignment(Assignment assignment) {
        return assignmentRepository.save(assignment);
    }

    public void deleteAssignment(Integer id) {
        assignmentRepository.deleteById(id);
    }

    public List<Assignment> searchAssignments(String title, LocalDate startDate, LocalDate endDate) {
        if (title != null && startDate != null && endDate != null) {
            return assignmentRepository.findByTitleContainingAndAssignmentDateBetween(title, startDate, endDate);
        } else if (title != null) {
            return assignmentRepository.findByTitleContaining(title);
        } else if (startDate != null && endDate != null) {
            return assignmentRepository.findByAssignmentDateBetween(startDate, endDate);
        } else {
            return assignmentRepository.findAll();
        }
    }

}
