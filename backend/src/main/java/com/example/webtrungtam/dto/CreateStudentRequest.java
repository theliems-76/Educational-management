package com.example.webtrungtam.dto;

import java.time.LocalDate;

public class CreateStudentRequest {

    // Thông tin User
    private String username;

    private String password;

    private String email;

    private String phone;

    private String role; // 1: Admin, 2: Giáo viên, 3: Học sinh

    // Thông tin Student
    private String classOfSchool;

    private String gender;

    private String school;

    private LocalDate dob;

    // Getters và Setters
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }

    public String getClassOfSchool() { return classOfSchool; }
    public void setClassOfSchool(String classOfSchool) { this.classOfSchool = classOfSchool; }

    public String getGender() { return gender; }
    public void setGender(String gender) { this.gender = gender; }

    public String getSchool() { return school; }
    public void setSchool(String school) { this.school = school; }

    public LocalDate getDob() { return dob; }
    public void setDob(LocalDate dob) { this.dob = dob; }
}
