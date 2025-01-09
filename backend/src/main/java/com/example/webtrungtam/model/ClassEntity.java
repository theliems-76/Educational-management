package com.example.webtrungtam.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "classes",indexes = {})
public class ClassEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_class")
    private int idClass;

    @ManyToOne
    @JoinColumn(name = "subject_id",foreignKey = @ForeignKey(ConstraintMode.NO_CONSTRAINT))
    private Subject subject; // Liên kết với môn học

//    @ManyToOne
//    @JsonBackReference
//    @JoinColumn(name = "teacher_id",columnDefinition = "CHAR(8)",foreignKey = @ForeignKey(ConstraintMode.NO_CONSTRAINT))
//    @JsonManagedReference(value = "teacher-class")
//    private Teacher teacher;

    @ManyToOne
    @JoinColumn(name = "teacher_id", columnDefinition = "CHAR(8)", foreignKey = @ForeignKey(ConstraintMode.NO_CONSTRAINT))
    @JsonIgnore // Bỏ qua tham chiếu ngược đến Teacher để tránh vòng lặp
    private Teacher teacher;

    @Column(name = "class_name", nullable = false)
    private String className; // Tên lớp học

    @Column(name = "number_student")
    private int numberStudent=0;

    @OneToMany(mappedBy = "idClass", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore  // ngắn truy xuất danh sách
    @JsonManagedReference // Điều phối dữ liệu từ classEntity
    private List<ClassStudent> classStudents = new ArrayList<>();




    public void addStudent(Student student) {
        // Tạo đối tượng ClassStudent mới
        ClassStudent classStudent = new ClassStudent(this, student);

        // Thêm vào danh sách của lớp hiện tại
        classStudents.add(classStudent);

        // Đảm bảo student đã có danh sách classStudents
        if (student.getClassStudents() == null) {
            student.setClassStudents(new ArrayList<>()); // Nếu null thì khởi tạo
        }
        student.getClassStudents().add(classStudent); // Thêm vào danh sách của student
    }

    public void removeStudent(Student student) {
        // Tìm đối tượng classStudent trong danh sách hiện tại
        ClassStudent classStudent = null;
        for (ClassStudent cs : classStudents) {
            if (cs.getIdStudent().equals(student)) { // So sánh dựa trên idStudent
                classStudent = cs;
                break;
            }
        }

        if (classStudent != null) { // Nếu tìm thấy, thực hiện xóa
            student.getClassStudents().remove(classStudent); // Xóa khỏi student
            classStudents.remove(classStudent); // Xóa khỏi class
            classStudent.setIdClass(null); // Hủy liên kết
            classStudent.setIdStudent(null); // Hủy liên kết
        }
    }



}
