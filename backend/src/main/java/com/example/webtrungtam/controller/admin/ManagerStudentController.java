package com.example.webtrungtam.controller.admin;

import com.example.webtrungtam.dto.CreateStudentRequest;
import com.example.webtrungtam.model.Student;
import com.example.webtrungtam.model.User;
import com.example.webtrungtam.service.UserService;
import com.example.webtrungtam.service.admin.ManagerStudentService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/admin/home/student")
public class ManagerStudentController {
    @Autowired
    private ManagerStudentService managerStudentService;

    @Autowired
    private UserService userService;

    // API tìm kiếm Student theo username
    @GetMapping("/search")
    public ResponseEntity<List<User>> searchStudentsByUsername(
            @RequestParam String username) {
        List<User> result = userService.searchStudentsByUsername(username);
        return ResponseEntity.ok(result);
    }

//    @PostMapping("/create")
//    public ResponseEntity<?> createUserAndStudent(@Valid @RequestBody CreateStudentRequest request) {
//        try {
//            // Tạo Student liên kết với User mới
//            Student student = managerStudentService.createStudent(request);
//            return ResponseEntity.ok(student);
//        } catch (RuntimeException e) {
//            return ResponseEntity.badRequest().body(e.getMessage());
//        }
//    }
    @PostMapping("/create")
    public ResponseEntity<?> createStudent(
            @Valid @RequestBody CreateStudentRequest request,
            @RequestHeader(value = "Role", required = false) String role) {

        // Log giá trị Header Role để kiểm tra
        System.out.println("Header Role: " + role);

        // Kiểm tra Role
        if (!"Admin".equals(role)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Không có quyền truy cập!");
        }

        Student student = managerStudentService.createStudent(request);
        return ResponseEntity.ok(student);
    }

    @GetMapping("/{idStudent}")
    public ResponseEntity<Student> getStudent(@PathVariable String idStudent) {
        Optional<Student> studentOpt = managerStudentService.getStudentById(idStudent);
        if (studentOpt.isPresent()) {
            return ResponseEntity.ok(studentOpt.get());
        } else {
            return ResponseEntity.status(404).body(null);
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteStudent(@PathVariable String id) {
        try {
            managerStudentService.deleteStudent(id);
            return ResponseEntity.ok("Học sinh đã được xóa thành công!");
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Không tìm thấy học sinh với ID: " + id);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Có lỗi xảy ra trong quá trình xóa học sinh.");
        }
    }


    @GetMapping("/all")
    public ResponseEntity<?> getAllStudents() {
        List<Student> students = managerStudentService.getAllStudents();
        return ResponseEntity.ok(students);
    }

    @GetMapping("/with-users")
    public ResponseEntity<?> getTeachersWithUsers() {
        List<Student> students = managerStudentService.getStudentsWithUsers();
        return ResponseEntity.ok(students);
    }


    // Cập nhật học sinh
    @PutMapping("/{id}")
    public Student updateStudent(@PathVariable String id, @RequestBody Student student) {
        student.setId(id);
        return managerStudentService.saveStudent(student);
    }


    // Lọc học sinh theo giới tính
    @GetMapping("/gender/{gender}")
    public List<Student> findStudentsByGender(@PathVariable String gender) {
        return managerStudentService.findStudentsByGender(gender);
    }
}