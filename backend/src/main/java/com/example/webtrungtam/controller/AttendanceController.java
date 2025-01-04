package com.example.webtrungtam.controller;

import com.example.webtrungtam.model.Attendance;
import com.example.webtrungtam.service.AttendanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/attendance")
public class AttendanceController {

    @Autowired
    private AttendanceService attendanceService;

    // Lấy tất cả điểm danh
    @GetMapping("/view-all")
    public ResponseEntity<List<Attendance>> getAllAttendances() {
        return ResponseEntity.ok(attendanceService.getAllAttendances());
    }

    // Lấy điểm danh theo ID chi tiết lớp học
    @GetMapping("/view/class-detail/{id}")
    public ResponseEntity<List<Attendance>> getAttendancesByClassDetailId(@PathVariable int id) {
        return ResponseEntity.ok(attendanceService.getAttendancesByClassDetailId(id));
    }

    // Lấy điểm danh theo ID sinh viên
    @GetMapping("/view/student/{studentId}")
    public ResponseEntity<List<Attendance>> getAttendancesByStudentId(@PathVariable String studentId) {
        return ResponseEntity.ok(attendanceService.getAttendancesByStudentId(studentId));
    }

    // Lấy điểm danh theo ngày
    @GetMapping("/view/date")
    public ResponseEntity<List<Attendance>> getAttendancesByDate(@RequestParam LocalDate date) {
        return ResponseEntity.ok(attendanceService.getAttendancesByDate(date));
    }

    // Thêm điểm danh mới
    @PostMapping("/create")
    public ResponseEntity<Attendance> addAttendance(
            @RequestParam int classDetailId,
            @RequestParam String studentId,
            @RequestParam LocalDate date,
            @RequestParam String status) {
        Attendance attendance = attendanceService.addAttendance(classDetailId, studentId, date, status);
        return ResponseEntity.ok(attendance);
    }

    // Cập nhật trạng thái điểm danh
    @PutMapping("/update/{id}")
    public ResponseEntity<Attendance> updateAttendance(
            @PathVariable int id,
            @RequestParam String status) {
        Attendance updatedAttendance = attendanceService.updateAttendance(id, status);
        return ResponseEntity.ok(updatedAttendance);
    }

    // Xóa điểm danh
    @DeleteMapping("/delete{id}")
    public ResponseEntity<String> deleteAttendance(@PathVariable int id) {
        attendanceService.deleteAttendance(id);
        return ResponseEntity.ok("Attendance deleted successfully.");
    }

    // điểm danh
    @PostMapping("/attendance")
    public ResponseEntity<String> markAttendance(
            @RequestParam int classDetailId,
            @RequestParam String studentId,
            @RequestParam String status) {
        attendanceService.markAttendance(classDetailId, studentId, status);
        return ResponseEntity.ok("Marked");
    }

}
