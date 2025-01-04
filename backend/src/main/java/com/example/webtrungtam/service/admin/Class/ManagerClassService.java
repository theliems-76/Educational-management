package com.example.webtrungtam.service.admin.Class;

import com.example.webtrungtam.dto.CreateClassRequest;
import com.example.webtrungtam.dto.UpdateClassRequest;
import com.example.webtrungtam.model.*;
import com.example.webtrungtam.repository.Class.ClassRepository;
import com.example.webtrungtam.repository.Class.ClassStudentRepository;
import com.example.webtrungtam.repository.Class.SubjectRepository;
import com.example.webtrungtam.repository.StudentRepository;
import com.example.webtrungtam.repository.TeacherRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ManagerClassService {

    @Autowired
    private ClassRepository classRepository;

    @Autowired
    private TeacherRepository teacherRepository;

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private ClassStudentRepository classStudentRepository;

    @Autowired
    private SubjectRepository subjectRepository;

    // Lấy tất cả lớp học
    public List<ClassEntity> getAllClasses() {
        return classRepository.findAll();
    }

    // Tìm lớp học theo tên lớp (className)
    public List<ClassEntity> getClassesByName(String className) {
        return classRepository.findByClassNameContaining(className);
    }

    // Tìm tất cả các lớp học của một giáo viên cụ thể
    public List<ClassEntity> getAllClassesByTeacher(String teacherId) {
        Teacher teacher = teacherRepository.findById(teacherId)
                .orElseThrow(() -> new RuntimeException("Teacher not found with ID: " + teacherId));

        return classRepository.findAllByTeacher(teacher);
    }

    // Kiểm tra lớp học có tồn tại dựa trên tên lớp và giáo viên
    public boolean isClassExists(String className, String teacherId) {
        Teacher teacher = teacherRepository.findById(teacherId)
                .orElseThrow(() -> new RuntimeException("Teacher not found with ID: " + teacherId));

        return classRepository.existsByClassNameAndTeacher(className,teacher);
    }

    // Tìm lớp học theo ID
    public ClassEntity getClassById(int id) {
        return classRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Class not found with ID: " + id));
    }

    // Thêm hoặc cập nhật lớp học
    public ClassEntity saveClass(ClassEntity aClass) {
        return classRepository.save(aClass);
    }

    // Xóa lớp học
    public void deleteClass(int id) {
        if (!classRepository.existsById(id)) {
            throw new RuntimeException("Class not found with ID: " + id);
        }
        classRepository.deleteById(id);
    }

    // Tạo lớp học mới
    public ClassEntity createClass(CreateClassRequest request) {
        // Tìm subject và teacher
        Subject subject = subjectRepository.findById(request.getSubjectId())
                .orElseThrow(() -> new RuntimeException("Subject not found with ID: " + request.getSubjectId()));
        Teacher teacher = teacherRepository.findById(request.getTeacherId())
                .orElseThrow(() -> new RuntimeException("Teacher not found with ID: " + request.getTeacherId()));

        // Tạo lớp học
        ClassEntity aClass = new ClassEntity();
        aClass.setClassName(request.getClassName());
        aClass.setSubject(subject);

        aClass.setTeacher(teacher);

        return classRepository.save(aClass);
    }

    // Cập nhật lớp học
    public ClassEntity updateClass(int id, UpdateClassRequest request) {
        // Tìm lớp học hiện tại
        ClassEntity existingClass = classRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Class not found with ID: " + id));

        Subject subject = subjectRepository.findById(request.getSubjectId())
                .orElseThrow(() -> new RuntimeException("Subject not found with ID: " + request.getSubjectId()));
        Teacher teacher = teacherRepository.findById(request.getTeacherId())
                .orElseThrow(() -> new RuntimeException("Teacher not found with ID: " + request.getTeacherId()));

        // Cập nhật thông tin
        existingClass.setClassName(request.getClassName());
        existingClass.setSubject(subject);
        existingClass.setTeacher(teacher);

        return classRepository.save(existingClass);
    }

    // Thêm sinh viên vào lớp
    public void addStudentToClass(int classId, String studentId) {
        ClassEntity classEntity = getClassById(classId);
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found with ID: " + studentId));

        if (classStudentRepository.existsByIdClassAndIdStudent(classEntity, student)) {
            throw new IllegalArgumentException("Student is already in the class.");
        }

        ClassStudent classStudent = new ClassStudent(classEntity, student);
        classStudentRepository.save(classStudent);
    }

    // Xóa sinh viên khỏi lớp
    public void removeStudentFromClass(int classId, String studentId) {
        ClassEntity classEntity = getClassById(classId);
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found with ID: " + studentId));

        ClassStudent classStudent = classStudentRepository.findByIdClassAndIdStudent(classEntity, student)
                .orElseThrow(() -> new RuntimeException("Student is not enrolled in this class."));

        classStudentRepository.delete(classStudent);
    }
}
