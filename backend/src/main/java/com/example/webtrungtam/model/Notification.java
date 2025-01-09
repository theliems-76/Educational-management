package com.example.webtrungtam.model;

import io.jsonwebtoken.lang.Classes;
import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "notifications")
public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idNotification;

    @ManyToOne
    @JoinColumn(name = "class_id", nullable = false)
    private ClassEntity classEntity;

//    @ManyToOne
//    @JoinColumn(name = "teacher_id", nullable = false)
//    private Teacher teacher;
    @Column(name = "teacher_id", length = 8, columnDefinition = "CHAR(8)",nullable = false)
    private String teacherId;

    @Column(columnDefinition = "NVARCHAR(255)",nullable = false)
    private String title;

    @Lob
    @Column(columnDefinition = "NVARCHAR(MAX)")
    private String content;

    @Temporal(TemporalType.DATE)
    private Date times = new Date();

    @Column(nullable = false)
    private String notificationType;
}