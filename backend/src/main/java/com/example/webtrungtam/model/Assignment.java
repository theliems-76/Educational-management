package com.example.webtrungtam.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "assignment")
public class Assignment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idAssignment;

    @ManyToOne
    @JoinColumn(name = "class_id", nullable = false)
    private ClassEntity classEntity;

    @Column(nullable = false)
    private String title;

    @Lob
    @Column(columnDefinition = "NVARCHAR(MAX)")
    private String descriptions;

    private String fileType;

    @Column(name = "file_url")
    private String fileURL;

    @Temporal(TemporalType.DATE)
    private LocalDate assignmentDate;

    @Temporal(TemporalType.DATE)
    private LocalDate dueDate;
}
