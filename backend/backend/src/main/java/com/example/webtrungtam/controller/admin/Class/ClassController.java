package com.example.webtrungtam.controller.admin.Class;

import com.example.webtrungtam.dto.CreateClassRequest;
import com.example.webtrungtam.dto.UpdateClassRequest;
import com.example.webtrungtam.model.ClassEntity;
import com.example.webtrungtam.service.admin.Class.ClassDetailService;
import com.example.webtrungtam.service.admin.Class.ManagerClassService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/class")
public class ClassController {

    @Autowired
    private ManagerClassService managerClassService;

    @Autowired
    private ClassDetailService classDetailService;

    // Lấy tất cả lớp học
    @GetMapping("/view/all")
    public ResponseEntity<List<ClassEntity>> getAllClasses() {
        List<ClassEntity> classes = managerClassService.getAllClasses();
        return ResponseEntity.ok(classes);
    }

    // Tìm lớp học theo ID
    @GetMapping("/search/{id}")
    public ResponseEntity<ClassEntity> getClassById(@PathVariable int id) {
        ClassEntity classEntity = managerClassService.getClassById(id);
        return ResponseEntity.ok(classEntity);
    }

    // Tìm lớp học theo tên lớp
    @GetMapping("/search")
    public ResponseEntity<List<ClassEntity>> getClassesByName(@RequestParam String name) {
        List<ClassEntity> classes = managerClassService.getClassesByName(name);
        return ResponseEntity.ok(classes);
    }

    // Tìm tất cả lớp học của một giáo viên
    @GetMapping("/teacher/{teacherId}")
    public ResponseEntity<List<ClassEntity>> getAllClassesByTeacher(@PathVariable String teacherId) {
        List<ClassEntity> classes = managerClassService.getAllClassesByTeacher(teacherId);
        return ResponseEntity.ok(classes);
    }

    @PostMapping("/create-class")
    public ResponseEntity<String> createClass(
            @RequestBody CreateClassRequest request) {

        // Tạo lớp học
        ClassEntity classEntity = managerClassService.createClass(request.getClassRequest());

        // Tạo lịch học tự động
        classDetailService.generateClassSchedule(
                classEntity.getIdClass(),
                request.getStartDate(),
                request.getSchedules());

        return ResponseEntity.ok("Class and schedule created successfully!");
    }


    // Cập nhật lớp học
    @PutMapping("/update/{id}")
    public ResponseEntity<ClassEntity> updateClass(
            @PathVariable int id,
            @RequestBody UpdateClassRequest request) {
        ClassEntity updatedClass = managerClassService.updateClass(id, request);
        return ResponseEntity.ok(updatedClass);
    }

    // Xóa lớp học
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteClass(@PathVariable int id) {
        managerClassService.deleteClass(id);
        return ResponseEntity.ok("Class with ID " + id + " has been deleted.");
    }

    // Thêm sinh viên vào lớp học
    @PostMapping("/{classId}/add-students/{studentId}")
    public ResponseEntity<String> addStudentToClass(
            @PathVariable int classId,
            @PathVariable String studentId) {
        managerClassService.addStudentToClass(classId, studentId);
        return ResponseEntity.ok("Student added to class successfully.");
    }

    // Xóa sinh viên khỏi lớp học
    @DeleteMapping("/{classId}/delete-students/{studentId}")
    public ResponseEntity<String> removeStudentFromClass(
            @PathVariable int classId,
            @PathVariable String studentId) {
        managerClassService.removeStudentFromClass(classId, studentId);
        return ResponseEntity.ok("Student removed from class successfully.");
    }
}