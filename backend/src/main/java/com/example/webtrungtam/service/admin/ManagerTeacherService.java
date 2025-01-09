package com.example.webtrungtam.service.admin;

import com.example.webtrungtam.dto.CreateTeacherRequest;
import com.example.webtrungtam.model.Student;
import com.example.webtrungtam.model.Teacher;
import com.example.webtrungtam.model.User;
import com.example.webtrungtam.repository.MessageRepository;
import com.example.webtrungtam.repository.TeacherRepository;
import com.example.webtrungtam.repository.UserRepository;
import com.example.webtrungtam.util.IdGenerator;
import jakarta.persistence.EntityNotFoundException;
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
public class ManagerTeacherService {
    @Autowired
    private TeacherRepository teacherRepository;

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private MessageRepository messageRepository;
    @Transactional
    public Teacher createTeacher(CreateTeacherRequest request) {

        // Tạo ID User

        // Lấy năm tạo từ User
        int currentYear = Year.now().getValue();
        String yearPrefix = String.valueOf(currentYear).substring(2); // Hai chữ số cuối của năm "24"

        String classPrefix = "00";

        // Tạo tiền tố cho ID: YYKK "2400"
        String yearClassPrefix = yearPrefix + classPrefix;

        // Tìm số thứ tự cao nhất hiện tại cho năm và khối này
        Integer maxSequence = teacherRepository.findMaxSequenceNumberByYearAndClass(yearClassPrefix);
        int newSequence = (maxSequence != null ? maxSequence : 0) + 1;

        // Sinh ID mới
        String newIdTeacher = IdGenerator.generateId(yearPrefix, classPrefix, newSequence);

        Argon2PasswordEncoder encoder = new Argon2PasswordEncoder(16, 32, 1, 65536, 10);
        String encodedPassword = encoder.encode(newIdTeacher);

        // Lưu User
        User user = new User();
        user.setIdUser(newIdTeacher);
        user.setUsername(request.getUsername());
        user.setPassword(encodedPassword);
        user.setEmail(request.getEmail());
        user.setPhone(request.getPhone());
        user.setRoleName("Teacher");
        user.setCreated_year(currentYear);
        userRepository.save(user);
        userRepository.flush();  //     Đẩy lên database lập tức

        // Tạo Student liên kết với User vừa tạo
        Teacher teacher = new Teacher();
        teacher.setIdTeacher(newIdTeacher); //     Liên kết user ở trên
        teacher.setUser(user);
        teacher.setDob(request.getDob());
        teacher.setGender(request.getGender());
        teacher.setSubject_name(request.getSubject_name());
        teacher.setSchool(request.getSchool());
        teacher.setIncome(request.getIncome());

        return teacherRepository.save(teacher );
    }

    public Optional<Teacher> getTeacherById(String idTeacher) {
        return teacherRepository.findById(idTeacher);

    }

    public void deleteTeacher(String id) {


        // Tìm học sinh theo ID
        Teacher teacher = teacherRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Không tìm thấy học sinh với ID: " + id));

        // Lấy thông tin người dùng liên kết với học sinh
        User user = teacher.getUser();

        //  Xóa tất cả tin nhắn
        messageRepository.deleteBySender(user);
        messageRepository.deleteByReceiver(user);

        // Gỡ liên kết khóa ngoại và thông tin lớp học
        teacher.setUser(null);

        // Lưu thay đổi để cập nhật trạng thái liên kết
        teacherRepository.save(teacher);

        // Xóa học sinh
        teacherRepository.delete(teacher);

        // Xóa tài khoản người dùng liên kết
        if (user != null) {
            userRepository.delete(user);
        }
    }

    // Phân trang và sắp xếp
    public Page<Teacher> searchTeachersByName(String keyword, int page, int size, String sortBy, String sortDir) {
        // Tạo đối tượng Sort
        Sort sort = sortDir.equalsIgnoreCase(Sort.Direction.ASC.name())
                ? Sort.by(sortBy).ascending()
                : Sort.by(sortBy).descending();

        // Tạo Pageable
        Pageable pageable = PageRequest.of(page, size, sort);

        // Truy vấn dữ liệu từ repository
        return teacherRepository.searchTeachersByName(keyword, pageable);
    }


    // Lấy tất cả giáo viên
    public List<Teacher> getAllTeachers() {
        return teacherRepository.findAll();
    }

    // Lấy giáo viên có liên kết với User
    public List<Teacher> getTeachersWithUsers() {
        return teacherRepository.findTeachersWithUsers();
    }


    // Thêm hoặc cập nhật giáo viên
    public Teacher saveTeacher(Teacher teacher) {
        return teacherRepository.save(teacher);
    }

    // Tìm giáo viên theo môn học
    public List<Teacher> findTeachersBySubject(String subjectName) {
        return teacherRepository.findBySubjectName(subjectName);
    }
}
