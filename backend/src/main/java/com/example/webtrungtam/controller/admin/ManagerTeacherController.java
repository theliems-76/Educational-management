
package com.example.webtrungtam.controller.admin;

import com.example.webtrungtam.dto.CreateTeacherRequest;
import com.example.webtrungtam.model.Teacher;
import com.example.webtrungtam.repository.TeacherRepository;
import com.example.webtrungtam.service.admin.ManagerTeacherService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.webtrungtam.model.User;
import com.example.webtrungtam.model.Message;
import com.example.webtrungtam.service.UserService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/admin/dashboard/teacher")
public class ManagerTeacherController {
    @Autowired
    private ManagerTeacherService managerTeacherService;

    @Autowired
    private UserService userService;
    @PostMapping("/create")
    public ResponseEntity<?> createUserAndTeacher(@Valid @RequestBody CreateTeacherRequest request) {
        try {
            // Tạo Student liên kết với User mới
            Teacher teacher = managerTeacherService.createTeacher(request);
            return ResponseEntity.ok(teacher);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/{idTeacher}")
    public ResponseEntity<Teacher> getStudent(@PathVariable String idTeacher) {
        Optional<Teacher> teacherOpt = managerTeacherService.getTeacherById(idTeacher);
        if (teacherOpt.isPresent()) {
            return ResponseEntity.ok(teacherOpt.get());
        } else {
            return ResponseEntity.status(404).body(null);
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteTeacher(@PathVariable String id) {
        try {
            managerTeacherService.deleteTeacher(id);
            return ResponseEntity.ok("Giáo viên đã được xóa thành công!");
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Không tìm thấy giáo viên với ID: " + id);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Có lỗi xảy ra trong quá trình xóa giáo viên.");
        }
    }

    @GetMapping("/search")
    public ResponseEntity<?> searchTeachersByUsername(@RequestParam("username") String username) {
        List<User> teachers = userService.searchTeachersByUsername(username);
        return ResponseEntity.ok(teachers);
    }

    @GetMapping("/all")
    public ResponseEntity<?> getAllTeachers() {
        List<Teacher> teachers = managerTeacherService.getAllTeachers();
        return ResponseEntity.ok(teachers);
    }

    @GetMapping("/with-users")
    public ResponseEntity<?> getTeachersWithUsers() {
        List<Teacher> teachers = managerTeacherService.getTeachersWithUsers();
        return ResponseEntity.ok(teachers);
    }

    // Lấy giáo viên theo ID
    @GetMapping("/{id}")
    public Optional<Teacher> getTeacherById(@PathVariable String id) {
        return managerTeacherService.getTeacherById(id);
    }

    // Cập nhật giáo viên
    @PutMapping("/{id}")
    public Teacher updateTeacher(@PathVariable String id, @RequestBody Teacher teacher) {
        teacher.setIdTeacher(id);
        return managerTeacherService.saveTeacher(teacher);
    }

    // Lọc giáo viên theo môn học
    @GetMapping("/subject/{subject}")
    public List<Teacher> findTeachersBySubject(@PathVariable String subject) {
        return managerTeacherService.findTeachersBySubject(subject);
    }
}