package com.example.webtrungtam.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
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
    @JsonBackReference // Phá vỡ đệ quy ở đây
    private ClassEntity idClass;

    @ManyToOne
    @JoinColumn(name = "student_id", nullable = false)
    @JsonManagedReference // Điều phối dữ liệu từ student
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
    public Student getStudent() {
        return this.idStudent;
    }

}

