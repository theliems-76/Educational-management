package com.example.webtrungtam.controller;

import com.example.webtrungtam.model.Notification;
import com.example.webtrungtam.model.NotificationStudent;
import com.example.webtrungtam.model.Student;
import com.example.webtrungtam.service.NotificationService;
import com.example.webtrungtam.service.NotificationStudentService;
import com.example.webtrungtam.service.admin.ManagerStudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user/notifications")
public class NotificationController {

    @Autowired
    private NotificationService notificationService;

    @Autowired
    private NotificationStudentService notificationStudentService;

    @Autowired
    private ManagerStudentService managerStudentService;

    // Lấy tất cả thông báo
    @GetMapping("/view-all")
    public List<Notification> getAllNotifications() {
        return notificationService.getAllNotifications();
    }

    // Lấy thông báo theo ID
    @GetMapping("/view/{id}")
    public Notification getNotificationById(@PathVariable Integer id) {
        return notificationService.getNotificationById(id);
    }

    // Tạo và gửi thông báo đến một hoặc nhiều học sinh hoặc lớp
    @PostMapping("/send")
    @PreAuthorize("hasAuthority('Teacher') or hasAuthority('Admin')")
    public List<NotificationStudent> createAndSendNotification(
            @RequestParam String title,
            @RequestParam String content,
            @RequestParam String type,
            @RequestParam String teacherId,
            @RequestParam(required = false) List<String> studentIds,
            @RequestParam(required = false) Integer classId) {

        // Tạo thông báo mới
        Notification notification = new Notification();
        notification.setTitle(title);
        notification.setContent(content);
        notification.setNotificationType(type);
        notification.setTeacherId(teacherId);
        Notification savedNotification = notificationService.saveNotification(notification);

        // Gửi thông báo đến học sinh
        if (studentIds != null && !studentIds.isEmpty()) {
            return notificationStudentService.sendNotificationToMultipleStudents(savedNotification, studentIds);
        }

        // Gửi thông báo đến toàn bộ học sinh trong lớp nếu classId được truyền vào
        if (classId != null) {
            List<String> classStudentIds = managerStudentService.getStudentIdsByClassId(classId);
            return notificationStudentService.sendNotificationToMultipleStudents(savedNotification, classStudentIds);
        }



        throw new IllegalArgumentException("Phải cung cấp danh sách học sinh hoặc ID lớp học để gửi thông báo.");
    }

    // Cập nhật thông báo
    @PutMapping("/update/{id}")
    public Notification updateNotification(@PathVariable Integer id, @RequestBody Notification notification) {
        notification.setIdNotification(id);
        return notificationService.saveNotification(notification);
    }

    // Xóa thông báo
    @DeleteMapping("/delete/{id}")
    public void deleteNotification(@PathVariable Integer id) {
        notificationService.deleteNotification(id);
    }

    // Lấy thông báo của một học sinh
    @GetMapping("/student/{studentId}")
    public List<NotificationStudent> getNotificationsByStudent(@PathVariable String studentId) {
        return notificationStudentService.findByStudentId(studentId);
    }

    // Đánh dấu đã đọc thông báo
    @PutMapping("/{id}/read")
    public NotificationStudent markAsRead(@PathVariable Integer id) {
        return notificationStudentService.markAsRead(id);
    }
}
