package com.example.webtrungtam.service.admin;

import com.example.webtrungtam.dto.CreateStudentRequest;
import com.example.webtrungtam.model.Student;
import com.example.webtrungtam.model.StudentId;
import com.example.webtrungtam.model.User;
import com.example.webtrungtam.repository.StudentRepository;
import com.example.webtrungtam.repository.UserRepository;
import com.example.webtrungtam.util.IdGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.argon2.Argon2PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.Year;
import java.util.Optional;

@Service
public class ManagerStudentService {

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private Argon2PasswordEncoder encoder;
    @Transactional
    public Student createStudent(CreateStudentRequest request) {

        // 1. Tạo User trước
        encoder = new Argon2PasswordEncoder(16, 32, 1, 65536, 10);
        String encodedPassword = encoder.encode(request.getPassword());

        // Tạo ID User

        // Lấy năm tạo từ User
        int currentYear = Year.now().getValue();
        String yearPrefix = String.valueOf(currentYear).substring(2); // Hai chữ số cuối của năm, ví dụ: "24"

        // Lấy khối lớp, đảm bảo có hai chữ số
        String classPrefix = String.format("%02d", Integer.parseInt(request.getClassOfSchool())); // Ví dụ: "10"

        // Tạo tiền tố cho ID: YYKK
        String yearClassPrefix = yearPrefix + classPrefix; // Ví dụ: "2410"

        // Tìm số thứ tự cao nhất hiện tại cho năm và khối này
         Integer maxSequence = studentRepository.findMaxSequenceNumberByYearAndClass(yearClassPrefix);
        int newSequence = (maxSequence != null ? maxSequence : 0) + 1;

        // Sinh ID mới
        String newIdStudent = IdGenerator.generateId(yearPrefix, classPrefix, newSequence);

        // Lưu User
        User user = new User();
        user.setIdUser(newIdStudent);
        user.setUsername(request.getUsername());
        user.setPassword(encodedPassword);
        user.setEmail(request.getEmail());
        user.setPhone(request.getPhone());
        user.setRoleName(request.getRole());
        user.setCreated_year(currentYear);
        userRepository.save(user);
        userRepository.flush();

        // 2. Tạo Student liên kết với User vừa tạo
        Student student = new Student();
        student.setIdStudent(newIdStudent); // Dùng idUser làm idStudent luôn
        student.setUser(user);
        student.setDob(request.getDob());
        student.setGender(request.getGender());
        student.setClassOfSchool(request.getClassOfSchool());
        student.setSchool(request.getSchool());

        // Lưu Student
        return studentRepository.save(student);
    }
//    @Transactional
//    public Student createStudent(String idUser, String classOfSchool, String gender, String school,String dob) {
//        // Lấy User theo idUser
//        Optional<User> userOpt = userRepository.findById(idUser);
//        if (!userOpt.isPresent()) {
//            throw new RuntimeException("User with id " + idUser + " not found.");
//        }
//
//        User user = userOpt.get();
//
//        // Lấy năm tạo từ User
//        int createdYear = user.getCreated_year();
//        String yearPrefix = String.valueOf(createdYear).substring(2); // Hai chữ số cuối của năm, ví dụ: "24"
//
//        // Lấy khối lớp, đảm bảo có hai chữ số
//        String classPrefix = String.format("%02d", Integer.parseInt(classOfSchool)); // Ví dụ: "10"
//
//        // Tạo tiền tố cho ID: YYKK
//        String yearClassPrefix = yearPrefix + classPrefix; // Ví dụ: "2410"
//
//        // Tìm số thứ tự cao nhất hiện tại cho năm và khối này
//        Integer maxSequence = studentRepository.findMaxSequenceNumberByYearAndClass(yearClassPrefix);
//        int newSequence = (maxSequence != null ? maxSequence : 0) + 1;
//
//        // Sinh ID mới
//        String newIdStudent = IdGenerator.generateId(yearPrefix, classPrefix, newSequence);
//
//        // Chuyển đổi chuỗi thành LocalDate
//        LocalDate dobLD;
//        try {
//            dobLD = LocalDate.parse(dob); // Đảm bảo định dạng nhập vào là "YYYY-MM-DD"
//        } catch (Exception e) {
//            throw new RuntimeException("Invalid date format for dob. Please use 'YYYY-MM-DD'.");
//        }
//
//
//        // Tạo Student mới
//        Student student = new Student();
//        student.setId(newIdStudent);
//        student.setUser(user);
//        student.setDob(dobLD); // Cần điều chỉnh theo logic thực tế
//        student.setGender(gender);
//        student.setClassOfSchool(classOfSchool);
//        student.setSchool(school);
//
//        return studentRepository.save(student);
//    }

    public Optional<Student> getStudentById(String idStudent) { // Sửa phương thức để chỉ cần idStudent
        return studentRepository.findById(new StudentId(idStudent)); // Tạo StudentId từ idStudent
    }
}
