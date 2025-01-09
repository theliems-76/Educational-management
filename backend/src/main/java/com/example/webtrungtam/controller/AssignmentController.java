package com.example.webtrungtam.controller;

import com.example.webtrungtam.model.Assignment;
import com.example.webtrungtam.service.AssignmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/user/assignments")
public class AssignmentController {

    @Autowired
    private AssignmentService assignmentService;

    @GetMapping("/view-all")
    public List<Assignment> getAllAssignments() {
        return assignmentService.getAllAssignments();
    }

    @GetMapping("/view/{id}")
    public Assignment getAssignmentById(@PathVariable Integer id) {
        return assignmentService.getAssignmentById(id);
    }

    @PostMapping("/create")
    @PreAuthorize("hasAuthority('Teacher') or hasAuthority('Admin')")
    public Assignment createAssignment(@RequestBody Assignment assignment) {
        return assignmentService.saveAssignment(assignment);
    }

    @PutMapping("/update/{id}")
    public Assignment updateAssignment(@PathVariable Integer id, @RequestBody Assignment assignment) {
        assignment.setIdAssignment(id);
        return assignmentService.saveAssignment(assignment);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteAssignment(@PathVariable Integer id) {
        assignmentService.deleteAssignment(id);
    }

    @GetMapping("/search")
    public List<Assignment> searchAssignments(
            @RequestParam(required = false) String title,
            @RequestParam(required = false) LocalDate startDate,
            @RequestParam(required = false) LocalDate endDate) {

        return assignmentService.searchAssignments(title, startDate, endDate);
    }

}
