package com.example.webtrungtam.repository.Class;

import com.example.webtrungtam.model.NotificationStudent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NotificationStudentRepository extends JpaRepository<NotificationStudent, Integer> {
    List<NotificationStudent> findByStudentId(String studentId);

}

