package com.example.webtrungtam.model;

import lombok.Data;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "Student")
public class Student {
//    @EmbeddedId
//    private StudentId id;

    @Id
    @Column(name = "id_student", length = 8)
    private String idStudent;

    @OneToOne
    @JoinColumn(name = "id_user", nullable = false, unique = true)
    private User user;

    @Column(name = "dob", nullable = false)
    private LocalDate  dob;

    @Column(name = "gender", nullable = false, length = 6)
    private String gender;

    @Column(name = "class_of_school", nullable = false, length = 2)
    private String classOfSchool;

    @Column(name = "school", nullable = false)
    private String school;

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