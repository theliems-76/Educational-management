package com.example.webtrungtam.service;

import com.example.webtrungtam.model.Notification;
import com.example.webtrungtam.model.NotificationStudent;
import com.example.webtrungtam.model.Student;
import com.example.webtrungtam.repository.Class.NotificationStudentRepository;
import com.example.webtrungtam.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class NotificationStudentService {

    @Autowired
    private NotificationStudentRepository notificationStudentRepository;

    @Autowired
    private StudentRepository studentRepository;

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

    public NotificationStudent markAsRead(Integer id) {
        NotificationStudent notificationStudent = notificationStudentRepository.findById(id).orElse(null);
        if (notificationStudent != null) {
            notificationStudent.setIsRead(true);
            return notificationStudentRepository.save(notificationStudent);
        }
        return null;
    }

    public List<NotificationStudent> sendNotificationToMultipleStudents(Notification notification, List<String> studentIds) {
        List<NotificationStudent> notificationStudents = new ArrayList<>();
        for (String studentId : studentIds) {
            Student student = studentRepository.findById(studentId).orElse(null);
            if (student != null) {
                NotificationStudent notificationStudent = new NotificationStudent();
                notificationStudent.setNotification(notification);
                notificationStudent.setStudent(student);
                notificationStudent.setIsRead(false);
                notificationStudents.add(notificationStudentRepository.save(notificationStudent));
            }
        }
        return notificationStudents;
    }
}
