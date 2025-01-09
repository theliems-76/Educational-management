package com.example.webtrungtam.service;

import com.example.webtrungtam.model.NotificationStudent;
import com.example.webtrungtam.repository.Class.NotificationStudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NotificationStudentService {

    @Autowired
    private NotificationStudentRepository notificationStudentRepository;

    public List<NotificationStudent> getAllNotificationStudents() {
        return notificationStudentRepository.findAll();
    }

    public NotificationStudent getNotificationStudentById(Integer id) {
        return notificationStudentRepository.findById(id).orElse(null);
    }

    public NotificationStudent saveNotificationStudent(NotificationStudent notificationStudent) {
        return notificationStudentRepository.save(notificationStudent);
    }

    public void deleteNotificationStudent(Integer id) {
        notificationStudentRepository.deleteById(id);
    }

    public List<NotificationStudent> findByStudentId(String studentId) {
        return notificationStudentRepository.findByStudentId(studentId);
    }
}
