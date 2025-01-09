package com.example.webtrungtam.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Data;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "teacher", indexes = {})
public class Teacher {

    @Id
    @Column(name = "id_teacher",columnDefinition = "CHAR(8)", length = 8)
    private String idTeacher;

    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference(value = "teacher-user") // Trả thông tin lớp cha
    @JoinColumn(name = "user_id", columnDefinition = "CHAR(8)",referencedColumnName = "id_user",foreignKey = @ForeignKey(ConstraintMode.NO_CONSTRAINT))
    private User user;

    @Column(name = "subject_name")
    private String subjectName;

    @Column(name = "dob", nullable = false)
    private LocalDate dob;

    @Column(name = "gender", nullable = false, length = 6)
    private String gender;

    @Column(name = "school", nullable = false)
    private String school;

    @Column(name = "income", nullable = false)
    private int income;

    @JsonBackReference(value = "teacher-class")
    @OneToMany(mappedBy = "teacher")
    private List<ClassEntity> classes;

    public List<ClassEntity> getClasses() {
        return classes;
    }

    public void setClasses(List<ClassEntity> classes) {
        this.classes = classes;
    }

    public String getIdTeacher() {
        return idTeacher;
    }

    public String getSubjectName() {
        return subjectName;
    }

    public void setSubjectName(String subjectName) {
        this.subjectName = subjectName;
    }

    public void setIdTeacher(String idTeacher) {
        this.idTeacher = idTeacher;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getSubject_name() {
        return subjectName;
    }

    public void setSubject_name(String subject_name) {
        this.subjectName = subject_name;
    }

    public LocalDate getDob() {
        return dob;
    }

    public void setDob(LocalDate dob) {
        this.dob = dob;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getSchool() {
        return school;
    }

    public void setSchool(String school) {
        this.school = school;
    }
}