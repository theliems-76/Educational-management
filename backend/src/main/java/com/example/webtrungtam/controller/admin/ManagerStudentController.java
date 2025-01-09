package com.example.webtrungtam.controller.admin;

import com.example.webtrungtam.dto.CreateStudentRequest;
import com.example.webtrungtam.dto.StudentRequest;
import com.example.webtrungtam.model.Student;
import com.example.webtrungtam.service.admin.ManagerStudentService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/admin/dashboard/student")
public class ManagerStudentController {
    @Autowired
    private ManagerStudentService managerStudentService;

//    @PostMapping("/create")
//    public ResponseEntity<Student> createStudent(
//            @RequestParam String idUser,
//            @RequestParam String classOfSchool,
//            @RequestParam String gender,
//            @RequestParam String school,
//            @RequestParam String dob) {
//        Student student = managerStudentService.createStudent(idUser, classOfSchool, gender, school, dob);
//        return ResponseEntity.ok(student);
//    }
    @PostMapping("/create")
    public ResponseEntity<?> createUserAndStudent(@Valid @RequestBody CreateStudentRequest request) {
        try {
            // Tạo Student liên kết với User mới
            Student student = managerStudentService.createStudent(request);
            return ResponseEntity.ok(student);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    @GetMapping("/{idStudent}")
    public ResponseEntity<Student> getStudent(
            @PathVariable String idStudent
    ) {
        Optional<Student> studentOpt = managerStudentService.getStudentById(idStudent);
        if (studentOpt.isPresent()) {
            return ResponseEntity.ok(studentOpt.get());
        } else {
            return ResponseEntity.status(404).body(null);
        }
    }
}