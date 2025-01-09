package com.example.webtrungtam.model;

import jakarta.persistence.*;
import lombok.*;

import java.sql.Time;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "class_detail",indexes = {})
public class ClassDetail {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_class_detail")
    private int idClassDetail;

    @ManyToOne
    @JoinColumn(name = "schedule_id",foreignKey = @ForeignKey(ConstraintMode.NO_CONSTRAINT))
    private Schedule schedule;

    @ManyToOne
    @JoinColumn(name = "class_id")
    private ClassEntity classEntity;

    @ManyToOne
    //@Column(name = "teacher_id", length = 8, columnDefinition = "CHAR(8)")
    @JoinColumn(name = "teacher_id",  columnDefinition = "CHAR(8)",nullable = false,foreignKey = @ForeignKey(ConstraintMode.NO_CONSTRAINT))
    private Teacher teacher;

    @Column(nullable = false)
    private LocalDate  classDate;

    @Column(nullable = false)
    private LocalTime startTimeDetail;

    @Column(nullable = false)
    private LocalTime  endTimeDetail;

    @Column(name = "status_attendance",columnDefinition = "CHAR(20)", nullable = false)
    private String statusAttendance = "Not Marked";

}
