package com.example.webtrungtam.dto;

import java.time.LocalDate;

public class CreateStudentRequest {
    private String username;

    private String email;

    private String phone;

    private String classOfSchool;

    private String gender;

    private String school;

    private LocalDate dob;

    // Getters và Setters
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getClassOfSchool() { return classOfSchool; }
    public void setClassOfSchool(String classOfSchool) { this.classOfSchool = classOfSchool; }

    public String getGender() { return gender; }
    public void setGender(String gender) { this.gender = gender; }

    public String getSchool() { return school; }
    public void setSchool(String school) { this.school = school; }

    public LocalDate getDob() { return dob; }
    public void setDob(LocalDate dob) { this.dob = dob; }
}
