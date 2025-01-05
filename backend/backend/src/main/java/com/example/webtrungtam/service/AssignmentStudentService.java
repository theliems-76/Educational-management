package com.example.webtrungtam.service;

import com.example.webtrungtam.model.AssignmentStudent;
import com.example.webtrungtam.repository.Class.AssignmentStudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AssignmentStudentService {

    @Autowired
    private AssignmentStudentRepository assignmentStudentRepository;

    public List<AssignmentStudent> getAllAssignmentStudents() {
        return assignmentStudentRepository.findAll();
    }

    public AssignmentStudent getAssignmentStudentById(Integer id) {
        return assignmentStudentRepository.findById(id).orElse(null);
    }

    public AssignmentStudent saveAssignmentStudent(AssignmentStudent assignmentStudent) {
        return assignmentStudentRepository.save(assignmentStudent);
    }

    public void deleteAssignmentStudent(Integer id) {
        assignmentStudentRepository.deleteById(id);
    }
}
