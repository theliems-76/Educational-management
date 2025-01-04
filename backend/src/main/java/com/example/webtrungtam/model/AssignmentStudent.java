package com.example.webtrungtam.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "assignment_student")
public class AssignmentStudent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "assignment_id", nullable = false)
    private Assignment assignment;

    @ManyToOne
    @JoinColumn(name = "student_id", nullable = false)
    private Student student;

    @Temporal(TemporalType.DATE)
    private LocalDate completion;

    @Column(columnDefinition = "NVARCHAR(MAX)")
    private String texts;

    @Column
    private Float grade;

    @Column(nullable = false)
    private String statuses;
}
