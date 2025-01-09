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
import java.util.stream.Collectors;

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

    public ClassEntity createClass(CreateClassRequest request) {
        // Kiểm tra subject và teacher có tồn tại không
        Subject subject = subjectRepository.findById(request.getSubjectId())
                .orElseThrow(() -> new IllegalArgumentException("Subject not found"));

        Teacher teacher = teacherRepository.findById(request.getTeacherId())
                .orElseThrow(() -> new IllegalArgumentException("Teacher not found"));

        // Tạo lớp học
        ClassEntity classEntity = new ClassEntity();
        classEntity.setClassName(request.getClassName());
        classEntity.setSubject(subject);
        classEntity.setTeacher(teacher);
        classEntity.setNumberStudent(0); // Mặc định số học viên là 0

        // Lưu lớp học vào database
        return classRepository.save(classEntity);
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


    // Thêm học sinh vào lớp
    public void addStudentToClass(int classId, String studentId) {
        // Tìm lớp học
        ClassEntity classEntity = classRepository.findById(classId)
                .orElseThrow(() -> new RuntimeException("Class not found with ID: " + classId));

        // Tìm học sinh
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found with ID: " + studentId));

        // Kiểm tra học sinh đã tồn tại trong lớp chưa
        if (classStudentRepository.existsByIdClassAndIdStudent(classEntity, student)) {
            throw new IllegalArgumentException("Student is already in the class.");
        }

        // Thêm học sinh vào lớp
        ClassStudent classStudent = new ClassStudent(classEntity, student);
        classStudentRepository.save(classStudent);

        // **Cập nhật số lượng học sinh**
        classEntity.setNumberStudent(classEntity.getNumberStudent() + 1);
        classRepository.save(classEntity);
    }

    public void removeStudentFromClass(int classId, String studentId) {
        ClassEntity classEntity = classRepository.findById(classId)
                .orElseThrow(() -> new RuntimeException("Class not found with ID: " + classId));

        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found with ID: " + studentId));

        ClassStudent classStudent = classStudentRepository.findByIdClassAndIdStudent(classEntity, student)
                .orElseThrow(() -> new RuntimeException("Student is not enrolled in this class."));

        // Xóa học sinh khỏi lớp
        classStudentRepository.delete(classStudent);

        // **Giảm số lượng học sinh**
        classEntity.setNumberStudent(classEntity.getNumberStudent() - 1);
        classRepository.save(classEntity);
    }



    public List<Student> getStudentsByClassId(int classId) {
        // Kiểm tra lớp học có tồn tại không
        ClassEntity classEntity = classRepository.findById(classId)
                .orElseThrow(() -> new RuntimeException("Class not found with ID: " + classId));

        // Truy vấn danh sách học sinh từ bảng ClassStudent
        List<ClassStudent> classStudents = classStudentRepository.findByIdClass(classEntity);

        // Trả về danh sách học sinh
        return classStudents.stream()
                .map(ClassStudent::getStudent)
                .collect(Collectors.toList());
    }

}
