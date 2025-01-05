package com.example.webtrungtam.controller;

import com.example.webtrungtam.model.AssignmentStudent;
import com.example.webtrungtam.model.Notification;
import com.example.webtrungtam.model.NotificationStudent;
import com.example.webtrungtam.model.Student;
import com.example.webtrungtam.service.AssignmentStudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/assignment-students")
public class AssignmentStudentController {

    @Autowired
    private AssignmentStudentService assignmentStudentService;

    @GetMapping("/view-all")
    public List<AssignmentStudent> getAllAssignmentStudents() {
        return assignmentStudentService.getAllAssignmentStudents();
    }

    @GetMapping("/view/{id}")
    public AssignmentStudent getAssignmentStudentById(@PathVariable Integer id) {
        return assignmentStudentService.getAssignmentStudentById(id);
    }

    @PostMapping("/create")
    @PreAuthorize("hasAuthority('Teacher') or hasAuthority('Admin')")
    public AssignmentStudent createAssignmentStudent(@RequestBody AssignmentStudent assignmentStudent) {
        return assignmentStudentService.saveAssignmentStudent(assignmentStudent);
    }

    @PutMapping("/update/{id}")
    public AssignmentStudent updateAssignmentStudent(@PathVariable Integer id, @RequestBody AssignmentStudent assignmentStudent) {
        assignmentStudent.setId(id);
        return assignmentStudentService.saveAssignmentStudent(assignmentStudent);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteAssignmentStudent(@PathVariable Integer id) {
        assignmentStudentService.deleteAssignmentStudent(id);
    }


}
