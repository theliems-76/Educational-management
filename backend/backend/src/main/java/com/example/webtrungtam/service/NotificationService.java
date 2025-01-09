package com.example.webtrungtam.service;

import com.example.webtrungtam.model.Notification;
import com.example.webtrungtam.repository.Class.NotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NotificationService {

    @Autowired
    private NotificationRepository notificationRepository;

    public List<Notification> getAllNotifications() {
        return notificationRepository.findAll();
    }

    public Notification getNotificationById(Integer id) {
        return notificationRepository.findById(id).orElse(null);
    }

    public Notification saveNotification(Notification notification) {
        return notificationRepository.save(notification);
    }

    public void deleteNotification(Integer id) {
        notificationRepository.deleteById(id);
    }
}
