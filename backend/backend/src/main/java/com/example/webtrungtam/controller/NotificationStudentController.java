package com.example.webtrungtam.controller;

import com.example.webtrungtam.model.Notification;
import com.example.webtrungtam.model.NotificationStudent;
import com.example.webtrungtam.model.Student;
import com.example.webtrungtam.repository.StudentRepository;
import com.example.webtrungtam.service.NotificationService;
import com.example.webtrungtam.service.NotificationStudentService;
import com.example.webtrungtam.service.admin.ManagerStudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/notification-students")
public class NotificationStudentController {

    @Autowired
    private NotificationStudentService notificationStudentService;

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private NotificationService notificationService;

    @GetMapping("/view-all")
    public List<NotificationStudent> getAllNotificationStudents() {
        return notificationStudentService.getAllNotificationStudents();
    }

    @GetMapping("/view/{id}")
    public NotificationStudent getNotificationStudentById(@PathVariable Integer id) {
        return notificationStudentService.getNotificationStudentById(id);
    }

    @PostMapping("/create")
    @PreAuthorize("hasAuthority('Teacher') or hasAuthority('Admin')")
    public NotificationStudent createNotificationStudent(@RequestBody NotificationStudent notificationStudent) {
        return notificationStudentService.saveNotificationStudent(notificationStudent);
    }

    @PutMapping("/update/{id}")
    public NotificationStudent updateNotificationStudent(@PathVariable Integer id, @RequestBody NotificationStudent notificationStudent) {
        notificationStudent.setId(id);
        return notificationStudentService.saveNotificationStudent(notificationStudent);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteNotificationStudent(@PathVariable Integer id) {
        notificationStudentService.deleteNotificationStudent(id);
    }

    // Gửi thông báo cho 1 học sinh
    @PostMapping("/send")
    @PreAuthorize("hasAuthority('Teacher') or hasAuthority('Admin')")
    public NotificationStudent sendNotificationToStudent(
            @RequestParam Integer notificationId,
            @RequestParam String studentId) {

        Notification notification = notificationService.getNotificationById(notificationId);
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student không tồn tại!"));

        NotificationStudent notificationStudent = new NotificationStudent();
        notificationStudent.setNotification(notification);
        notificationStudent.setStudent(student);
        notificationStudent.setIsRead(false);

        return notificationStudentService.saveNotificationStudent(notificationStudent);
    }

    // Lấy thông báo của từng học sinh
    @GetMapping("/student/{studentId}")
    public List<NotificationStudent> getNotificationsByStudent(@PathVariable String studentId) {
        return notificationStudentService.findByStudentId(studentId);
    }

    // Đánh dấu đã đọc thông báo
    @PutMapping("/{id}/read")
    public NotificationStudent markAsRead(@PathVariable Integer id) {
        NotificationStudent notificationStudent = notificationStudentService.getNotificationStudentById(id);
        notificationStudent.setIsRead(true);
        return notificationStudentService.saveNotificationStudent(notificationStudent);
    }
}
