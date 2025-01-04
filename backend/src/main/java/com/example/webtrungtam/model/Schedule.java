package com.example.webtrungtam.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "schedule",indexes = {})
public class Schedule {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_schedule")
    private int idSchedule;

    @ManyToOne
    @JoinColumn(name = "class_id", nullable = false,foreignKey = @ForeignKey(ConstraintMode.NO_CONSTRAINT))
    private ClassEntity classEntity;

    @Column(nullable = false)
    private int dayOfWeek; // Thứ (1 = CN, 2 = T2, ..., 7 = T7)

    @Column(nullable = false)
    private LocalTime startTime;

    @Column(nullable = false)
    private LocalTime  endTime;

    @Column(nullable = false)
    private LocalDate startDate;

}
