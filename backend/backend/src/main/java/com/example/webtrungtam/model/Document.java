package com.example.webtrungtam.model;

import io.jsonwebtoken.lang.Classes;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "document")
public class Document {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idDocument;

    @ManyToOne
    @JoinColumn(name = "class_id", nullable = false)
    private ClassEntity classEntity;

    private String creator;

    private String title;

    @Lob
    @Column(columnDefinition = "NVARCHAR(MAX)")
    private String content;

    private String fileType;

    @Column(name = "file_url")
    private String fileURL;

    @Temporal(TemporalType.DATE)
    private LocalDate date;
}

