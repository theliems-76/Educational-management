package com.example.webtrungtam.controller.admin.Class;

import com.example.webtrungtam.model.ClassDetail;
import com.example.webtrungtam.model.ClassEntity;
import com.example.webtrungtam.service.admin.Class.ClassDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/admin/class-details")
public class ClassDetailController {

    @Autowired
    private ClassDetailService classDetailService;

    @GetMapping("/view/all")
    public ResponseEntity<List<ClassDetail>> getAllClassDetails() {
        List<ClassDetail> details = classDetailService.getAllClassDetails();
        return ResponseEntity.ok(details);
    }

    // Lấy chi tiết lớp học theo ID lớp
    @GetMapping("/view-class/{idClass}")
    public ResponseEntity<List<ClassDetail>> getClassDetailsByClassId(@PathVariable int idClass) {
        List<ClassDetail> details = classDetailService.getClassDetailsByClassId(idClass);
        return ResponseEntity.ok(details);
    }

    // Lấy chi tiết lớp học theo ID lịch học
    @GetMapping("/view-schedule/{scheduleId}")
    public ResponseEntity<List<ClassDetail>> getClassDetailsByScheduleId(@PathVariable int scheduleId) {
        List<ClassDetail> details = classDetailService.getClassDetailsByScheduleId(scheduleId);
        return ResponseEntity.ok(details);
    }

    // Lấy chi tiết lớp học theo ID giáo viên
    @GetMapping("/view-teacher/{teacherId}")
    public ResponseEntity<List<ClassDetail>> getClassDetailsByTeacherId(@PathVariable String teacherId) {
        List<ClassDetail> details = classDetailService.getClassDetailsByTeacherId(teacherId);
        return ResponseEntity.ok(details);
    }

    // Lấy chi tiết lớp học theo ngày cụ thể
    @GetMapping("/view-date")
    public ResponseEntity<List<ClassDetail>> getClassDetailsByDate(@RequestParam LocalDate date) {
        List<ClassDetail> details = classDetailService.getClassDetailsByDate(date);
        return ResponseEntity.ok(details);
    }

    // Lấy chi tiết lớp học theo trạng thái điểm danh
    @GetMapping("/view-status")
    public ResponseEntity<List<ClassDetail>> getClassDetailsByAttendanceStatus(@RequestParam String statusAttendance) {
        List<ClassDetail> details = classDetailService.getClassDetailsByAttendanceStatus(statusAttendance);
        return ResponseEntity.ok(details);
    }

    // Thêm mới chi tiết lớp học
    @PostMapping("/create")
    public ResponseEntity<ClassDetail> createClassDetail(
            @RequestParam int classId,
            @RequestParam int scheduleId,
            @RequestParam String teacherId,
            @RequestParam LocalDate classDate,
            @RequestParam LocalTime startTime,
            @RequestParam LocalTime endTime,
            @RequestParam String statusAttendance) {

        ClassDetail createdDetail = classDetailService.createClassDetail(
                classId, scheduleId, teacherId, classDate, startTime, endTime, statusAttendance);
        return ResponseEntity.ok(createdDetail);
    }

    // Cập nhật chi tiết lớp học
    @PutMapping("/update/{id}")
    public ResponseEntity<ClassDetail> updateClassDetail(
            @PathVariable int id,
            @RequestBody ClassDetail updatedDetail) {
        ClassDetail detail = classDetailService.updateClassDetail(id, updatedDetail);
        return ResponseEntity.ok(detail);
    }

    // Xóa chi tiết lớp học theo ID
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteClassDetail(@PathVariable int id) {
        classDetailService.deleteClassDetail(id);
        return ResponseEntity.ok("Class detail with ID " + id + " has been deleted.");
    }


    // hiển thị lịch học theo tháng
    @GetMapping("/schedule/month")
    public ResponseEntity<List<ClassDetail>> getScheduleByMonth(
            @RequestParam int classId,
            @RequestParam int month,
            @RequestParam int year) {
        List<ClassDetail> schedule = classDetailService.getClassDetailsByDateRange(
                LocalDate.of(year, month, 1),
                LocalDate.of(year, month, LocalDate.of(year, month, 1).lengthOfMonth()));

        return ResponseEntity.ok(schedule);
    }
}
