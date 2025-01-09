package com.example.webtrungtam.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "class_student",indexes = {})
public class ClassStudent {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "class_id", nullable = false)
    private ClassEntity idClass;

    @ManyToOne
    @JoinColumn(name = "student_id", nullable = false)
    private Student idStudent;

    public ClassStudent(ClassEntity idClass, Student idStudent) {
        this.idClass = idClass;
        this.idStudent = idStudent;
    }

    // Getters và Setters
    public ClassEntity getIdClass() {
        return idClass;
    }

    public void setIdClass(ClassEntity idClass) {
        this.idClass = idClass;
    }

    public Student getIdStudent() {
        return idStudent;
    }

    public void setIdStudent(Student idStudent) {
        this.idStudent = idStudent;
    }
}

