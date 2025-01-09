package com.example.webtrungtam.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Data;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "student", indexes = {})
public class Student {

    @Id
    @Column(name = "id_student", columnDefinition = "CHAR(8)",length = 8)
    private String idStudent;

    @OneToOne
    @JsonManagedReference(value = "student-user") // Trả thông tin lớp cha
    @JoinColumn(name = "user_id", columnDefinition = "CHAR(8)",nullable = false, unique = true,foreignKey = @ForeignKey(ConstraintMode.NO_CONSTRAINT))
    private User user;

    @Column(name = "dob", nullable = false)
    private LocalDate  dob;

    @Column(name = "gender", nullable = false, length = 6)
    private String gender;

    @Column(name = "class_of_school", nullable = false, length = 2)
    private String classOfSchool;

    @Column(name = "school", nullable = false)
    private String school;

    @OneToMany(mappedBy = "idStudent", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ClassStudent> classStudents = new ArrayList<>();

    public List<ClassStudent> getClassStudents() {
        return classStudents;
    }

    public void setClassStudents(List<ClassStudent> classStudents) {
        this.classStudents = classStudents;
    }

    public String getId() {
        return idStudent;
    }

    public void setId(String id) {
        this.idStudent = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public LocalDate  getDob() {
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

    public String getClassOfSchool() {
        return classOfSchool;
    }

    public void setClassOfSchool(String classOfSchool) {
        this.classOfSchool = classOfSchool;
    }

    public String getSchool() {
        return school;
    }

    public void setSchool(String school) {
        this.school = school;
    }
}