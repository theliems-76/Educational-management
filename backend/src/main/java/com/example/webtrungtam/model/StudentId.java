package com.example.webtrungtam.model;

import java.io.Serializable;
import java.util.Objects;

import jakarta.persistence.Embeddable;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Embeddable
@EqualsAndHashCode
@AllArgsConstructor
public class StudentId implements Serializable {

    private String idStudent;
    private String idUser;

    public StudentId() {}

    public StudentId(String idUser) {
        this.idUser = idUser;
    }

    public String getIdStudent() {
        return idStudent;
    }

    public void setIdStudent(String idStudent) {
        this.idStudent = idStudent;
    }

    public String getIdUser() {
        return idUser;
    }

    public void setIdUser(String idUser) {
        this.idUser = idUser;
    }

    // equals() và hashCode() để đảm bảo tính duy nhất
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        StudentId studentId = (StudentId) o;

        return Objects.equals(idUser, studentId.idUser);
    }

    @Override
    public int hashCode() {
        return idUser != null ? idUser.hashCode() : 0;
    }
}
