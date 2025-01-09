package com.example.webtrungtam.service.admin;

import com.example.webtrungtam.dto.CreateStudentRequest;
import com.example.webtrungtam.model.Student;
import com.example.webtrungtam.model.Teacher;
import com.example.webtrungtam.model.User;
import com.example.webtrungtam.repository.StudentRepository;
import com.example.webtrungtam.repository.UserRepository;
import com.example.webtrungtam.util.IdGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.argon2.Argon2PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Year;
import java.util.List;
import java.util.Optional;

@Service
public class ManagerStudentService {
    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private UserRepository userRepository;

    @Transactional
    public Student createStudent(CreateStudentRequest request) {

        // Tạo ID User

        // Lấy năm tạo từ User
        int currentYear = Year.now().getValue();
        String yearPrefix = String.valueOf(currentYear).substring(2); // Hai chữ số cuối của năm "24"

        // Lấy khối lớp, đảm bảo có hai chữ số
        String classPrefix = String.format("%02d", Integer.parseInt(request.getClassOfSchool())); // "10"

        // Tạo tiền tố cho ID: YYKK
        String yearClassPrefix = yearPrefix + classPrefix; // "2410"

        // Tìm số thứ tự cao nhất hiện tại cho năm và khối này
        Integer maxSequence = studentRepository.findMaxSequenceNumberByYearAndClass(yearClassPrefix);
        int newSequence = (maxSequence != null ? maxSequence : 0) + 1;

        // Sinh ID mới
        String newIdStudent = IdGenerator.generateId(yearPrefix, classPrefix, newSequence);

        Argon2PasswordEncoder encoder = new Argon2PasswordEncoder(16, 32, 1, 65536, 10);
        String encodedPassword = encoder.encode(newIdStudent);

        // Lưu User
        User user = new User();
        user.setIdUser(newIdStudent);
        user.setUsername(request.getUsername());
        user.setPassword(encodedPassword);
        user.setEmail(request.getEmail());
        user.setPhone(request.getPhone());
        user.setRoleName("Student");
        user.setCreated_year(currentYear);
        userRepository.save(user);
        userRepository.flush();  //     Đẩy lên database lập tức

        // Tạo Student liên kết với User vừa tạo
        Student student = new Student();
        student.setIdStudent(newIdStudent); //     Liên kết user ở trên
        student.setUser(user);
        student.setDob(request.getDob());
        student.setGender(request.getGender());
        student.setClassOfSchool(request.getClassOfSchool());
        student.setSchool(request.getSchool());

        // Lưu Student
        return studentRepository.save(student);
    }

    public Optional<Student> getStudentById(String idStudent) {
        return studentRepository.findById(idStudent); // Tạo StudentId từ idStudent
    }

    public void deleteStudent(String id) {
        Student student = studentRepository.findStudentById(id);

        // Lấy User liên kết
        User user = student.getUser();

        // Gỡ liên kết với User
        student.setUser(null);

        // Lưu thay đổi để tránh lỗi ràng buộc khóa ngoại
        studentRepository.save(student);

        // Xóa Student
        studentRepository.delete(student);

        // Xóa User nếu tồn tại
        if (user != null) {
            userRepository.delete(user);
        }
    }

    // Lấy tất cả học sinh
    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    // Lấy giáo viên có liên kết với User
    public List<Student> getStudentsWithUsers() {
        return studentRepository.findStudentsWithUsers();
    }

    // Thêm hoặc cập nhật học sinh
    public Student saveStudent(Student student) {
        return studentRepository.save(student);
    }

    // Tìm học sinh theo giới tính
    public List<Student> findStudentsByGender(String gender) {
        return studentRepository.findByGender(gender);
    }

}
