package com.example.webtrungtam.controller.admin.Class;

import com.example.webtrungtam.model.Schedule;
import com.example.webtrungtam.service.admin.Class.ScheduleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/schedule-controller")
public class ScheduleController {
    @Autowired
    private ScheduleService scheduleService;

    // Lấy tất cả lịch học
    @GetMapping("/view/all")
    public ResponseEntity<List<Schedule>> getAllSchedules() {
        return ResponseEntity.ok(scheduleService.getAllSchedules());
    }

    // Lấy lịch học theo lớp
    @GetMapping("/view/class/{idClass}")
    public ResponseEntity<List<Schedule>> getSchedulesByClassId(@PathVariable int idClass) {
        return ResponseEntity.ok(scheduleService.getSchedulesByClassId(idClass));
    }

    // Lấy lịch học theo ngày
    @GetMapping("/view/date")
    public ResponseEntity<List<Schedule>> getSchedulesByStartDate(@RequestParam LocalDate startDate) {
        return ResponseEntity.ok(scheduleService.getSchedulesByStartDate(startDate));
    }

    // Thêm lịch học
    @PostMapping("create")
    public ResponseEntity<Schedule> addSchedule(@RequestBody Schedule schedule) {
        return ResponseEntity.ok(scheduleService.addSchedule(schedule));
    }

    // Cập nhật lịch học
    @PutMapping("/update/{idSchedule}")
    public ResponseEntity<Schedule> updateSchedule(@PathVariable int idSchedule, @RequestBody Schedule updatedSchedule) {
        return ResponseEntity.ok(scheduleService.updateSchedule(idSchedule, updatedSchedule));
    }

    // Xóa lịch học
    @DeleteMapping("/delete/{idSchedule}")
    public ResponseEntity deleteSchedule(@PathVariable int id) {
        scheduleService.deleteSchedule(id);
        return ResponseEntity.ok("Đã xóa lịch");
    }

}
