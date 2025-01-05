package com.example.webtrungtam.controller;

import com.example.webtrungtam.model.Notification;
import com.example.webtrungtam.model.NotificationStudent;
import com.example.webtrungtam.service.NotificationService;
import com.example.webtrungtam.service.NotificationStudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/notifications")
public class NotificationController {

    @Autowired
    private NotificationService notificationService;

    @Autowired
    private NotificationStudentService notificationStudentService;

    @GetMapping("/view-all")
    public List<Notification> getAllNotifications() {
        return notificationService.getAllNotifications();
    }

    @GetMapping("/view/{id}")
    public Notification getNotificationById(@PathVariable Integer id) {
        return notificationService.getNotificationById(id);
    }

    @PostMapping("/create")
    @PreAuthorize("hasAuthority('Teacher') or hasAuthority('Admin')")
    public Notification createNotification(@RequestBody Notification notification) {
        return notificationService.saveNotification(notification);
    }

    @PutMapping("/update/{id}")
    public Notification updateNotification(@PathVariable Integer id, @RequestBody Notification notification) {
        notification.setIdNotification(id);
        return notificationService.saveNotification(notification);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteNotification(@PathVariable Integer id) {
        notificationService.deleteNotification(id);
    }


}
