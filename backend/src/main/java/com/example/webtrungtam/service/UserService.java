package com.example.webtrungtam.service;

import com.example.webtrungtam.model.Message;
import com.example.webtrungtam.model.Student;
import com.example.webtrungtam.model.Teacher;
import com.example.webtrungtam.model.User;
import com.example.webtrungtam.repository.MessageRepository;
import com.example.webtrungtam.repository.StudentRepository;
import com.example.webtrungtam.repository.TeacherRepository;
import com.example.webtrungtam.repository.UserRepository;
import com.example.webtrungtam.util.IdGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.argon2.Argon2PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.Year;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TeacherRepository teacherRepository;

    @Autowired
    private StudentRepository studentRepository;
    @Autowired
    private MessageRepository messageRepository;

    @Autowired
    private Argon2PasswordEncoder encoder;


    // Lấy thông tin người dùng theo id
    public User getUserById(String userId) {
        return userRepository.findByIdUser( userId).orElseThrow(() -> new RuntimeException("User not found"));
    }

    // Lấy thông tin người dùng theo username
    public User getUserByUsername(String username) {
        return userRepository.findByUsername(username).orElseThrow(() -> new RuntimeException("User not found"));
    }

    // Tìm kiếm danh sách User theo từ khóa
    public List<User> searchUsersByUsername(String username) {
        return userRepository.findByUsernameContaining(username);
    }

     //Lọc danh sách User trả về Teacher
    public List<User> searchTeachersByUsername(String username) {
        return userRepository.findByUsernameContaining(username)
                .stream()
                .filter(user -> user.getTeacher() != null) // Lọc các User có liên kết Teacher
                .toList();
    }

    // Tìm kiếm Student
    public List<User> searchStudentsByUsername(String username) {
        return userRepository.findByUsernameContaining(username)
                .stream()
                .filter(user -> user.getStudent() != null) // Lọc các User có liên kết Teacher
                .toList();
    }


//    // Cập nhật thông tin người dùng
//    public User updateUser(String id, User userDetails) {
//        User user = userRepository.findByIdUser(id)
//                .orElseThrow(() -> new RuntimeException("Không tìm thấy người dùng!"));
//        user.setUsername(userDetails.getUsername());
//        user.setEmail(userDetails.getEmail());
//        user.setPhone(userDetails.getPhone());
//        updatePassword(user,userDetails.getPassword());
//        return userRepository.save(user);
//    }

    public User updateUser(String id, User userDetails, boolean resetPassword) {
        // Tìm User
        User user = userRepository.findByIdUser(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy người dùng!"));

        // Cập nhật thông tin chung
        user.setUsername(userDetails.getUsername());
        user.setEmail(userDetails.getEmail());
        user.setPhone(userDetails.getPhone());

        // Cập nhật mật khẩu
        if (resetPassword) {
            // Đặt lại mật khẩu là ID
            updatePassword(user, id);
        } else if (userDetails.getPassword() != null && !userDetails.getPassword().isEmpty()) {
            // Cập nhật mật khẩu mới nếu có
            updatePassword(user, userDetails.getPassword());
        }

        // Xác định vai trò của người dùng
        if (user.getStudent() != null) {
            updateStudent(user.getStudent(), userDetails.getStudent());
        } else if (user.getTeacher() != null) {
            updateTeacher(user.getTeacher(), userDetails.getTeacher());
        }

        // Lưu User sau khi cập nhật
        return userRepository.save(user);
    }

    // Cập nhật mật khẩu
    private void updatePassword(User user, String rawPassword) {
        String encodedPassword = encoder.encode(rawPassword);
        user.setPassword(encodedPassword);
    }

    // Cập nhật thông tin Student
    private void updateStudent(Student student, Student studentDetails) {
        if (studentDetails.getDob() != null) {
            student.setDob(studentDetails.getDob());
        }
        if (studentDetails.getGender() != null) {
            student.setGender(studentDetails.getGender());
        }
        if (studentDetails.getClassOfSchool() != null) {
            student.setClassOfSchool(studentDetails.getClassOfSchool());
        }
        if (studentDetails.getSchool() != null) {
            student.setSchool(studentDetails.getSchool());
        }

        // Lưu thông tin Student
        studentRepository.saveAndFlush(student);
    }

    // Cập nhật thông tin Teacher
    private void updateTeacher(Teacher teacher, Teacher teacherDetails) {
        if (teacherDetails.getDob() != null) {
            teacher.setDob(teacherDetails.getDob());
        }
        if (teacherDetails.getGender() != null) {
            teacher.setGender(teacherDetails.getGender());
        }
        if (teacherDetails.getSchool() != null) {
            teacher.setSchool(teacherDetails.getSchool());
        }
        if (teacherDetails.getSubject_name() != null) {
            teacher.setSubject_name(teacherDetails.getSubject_name());
        }

        // Lưu thông tin Teacher
        teacherRepository.saveAndFlush(teacher);
    }

    // Lấy danh sách tin nhắn của người dùng
    public List<Message> getMessages(String username) {
        User user = getUserByUsername(username);
        List<Message> messages = messageRepository.findByReceiverOrderByTimestampAsc(user);
        messages.sort(Comparator.comparing(Message::getTimestamp)); // sắp xếp theo thời gian
        return messages;
    }
    // Tìm kiếm tin nhăn
    public List<Message> searchMessages(String keyword) {
        return messageRepository.findByContentContainingOrderByTimestampAsc(keyword);
    }

    // Lấy tin nhắn chưa đọc
    public List<Message> getUnreadMessages(String userId) {
        User user = getUserById(userId);
        return messageRepository.findByReceiverAndIsReadOrderByTimestampAsc(user, false);
    }

    // Tìm kiếm người nhận tin nhắn
    public List<User> searchReceivers(String keyword) {
        return userRepository.findByUsernameContaining(keyword);
    }

    // Tìm kiếm người đã gửi tin nhắn
    public List<User> searchSenders(String keyword) {
        return userRepository.findByUsernameContaining(keyword);
    }

    // Phân trang tin nhắn khi số lượng tin nhắn lớn
    public Page<Message> getMessagesWithPagination(String userId, int page, int size) {
        User user = getUserById(userId);
        Pageable pageable = PageRequest.of(page, size, Sort.by("timestamp").ascending());
        return messageRepository.findByReceiver(user, pageable);
    }


    // Gửi tin nhắn
    public Message sendMessage(String senderId, String receiverId, String content) {
        if (content == null || content.trim().isEmpty()) {
            throw new IllegalArgumentException("Nội dung tin nhắn không được để trống!");
        }
        User sender = getUserById(senderId);
        User receiver = userRepository.findByIdUser(receiverId).orElseThrow(() -> new RuntimeException("Receiver not found"));
        Message message = new Message();
        message.setSender(sender);
        message.setReceiver(receiver);
        message.setContent(content);
        message.setTimestamp(LocalDateTime.now());
        message.setIsRead(false);
        return messageRepository.save(message);
    }
    public Message saveMessage(String senderId, String  receiverId, String content) {
        // Kiểm tra dữ liệu đầu vào
        if (senderId == null || receiverId == null || content == null || content.trim().isEmpty()) {
            throw new IllegalArgumentException("Sender, receiver, hoặc nội dung không được để trống!");
        }

        // Tìm người gửi
        User sender = userRepository.findById(senderId)
                .orElseThrow(() -> new RuntimeException("Người gửi không tồn tại"));

        // Tìm người nhận
        User receiver = userRepository.findById(receiverId)
                .orElseThrow(() -> new RuntimeException("Người nhận không tồn tại"));

        // Tạo tin nhắn mới
        Message message = new Message();
        message.setSender(sender);
        message.setReceiver(receiver);
        message.setContent(content);
        message.setTimestamp(LocalDateTime.now());
        message.setIsRead(false); // Mặc định là chưa đọc

        // Lưu tin nhắn vào database
        return messageRepository.save(message);
    }

    // Lấy và cập nhật danh sách tin nhắn giữa hai người
    public List<Map<String, Object>> getMessagesWithUser(String senderId, String receiverId) {
        // Lấy thông tin người dùng
        User sender = userRepository.findByIdUser(senderId)
                .orElseThrow(() -> new RuntimeException("Người gửi không tồn tại"));
        User receiver = userRepository.findByIdUser(receiverId)
                .orElseThrow(() -> new RuntimeException("Người nhận không tồn tại"));

        // Lấy tin nhắn hai chiều
        List<Message> messages = new ArrayList<>();
        messages.addAll(messageRepository.findBySenderAndReceiverOrderByTimestampAsc(sender, receiver));
        messages.addAll(messageRepository.findBySenderAndReceiverOrderByTimestampAsc(receiver, sender));

        // Sắp xếp theo thời gian
        messages.sort(Comparator.comparing(Message::getTimestamp));

        // Đánh dấu tất cả tin nhắn là đã đọc
        messages.forEach(msg -> msg.setIsRead(true));
        messageRepository.saveAll(messages);

        // Lấy tin nhắn mới nhất chưa có
        List<Message> newMessages = messageRepository.findBySenderAndReceiverOrderByTimestampAsc(sender, receiver);
        newMessages.stream()
                .filter(msg -> !messages.contains(msg))
                .forEach(messages::add);

        // Sắp xếp lại danh sách tin nhắn
        messages.sort(Comparator.comparing(Message::getTimestamp));

        // Chuyển đổi sang định dạng Map để trả về thông tin cần thiết
        List<Map<String, Object>> result = new ArrayList<>();
        for (Message msg : messages) {
            Map<String, Object> map = new HashMap<>();
            map.put("senderName", msg.getSender().getUsername());
            map.put("content", msg.getContent());
            map.put("timestamp", msg.getTimestamp().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));

            result.add(map);
        }
        return result;
    }


    // Lấy danh sách tin nhắn mới nhất với tất cả người dùng
    public List<Map<String, Object>> getListLatestMessages(String userId) {
        // Tìm người dùng
        User user = userRepository.findByIdUser(userId)
                .orElseThrow(() -> new RuntimeException("Người dùng không tồn tại"));

        // Truy vấn tin nhắn mới nhất từ từng người trò chuyện
        List<Message> latestMessages = messageRepository.findLatestMessagesForUser(user);

        // Gom nhóm theo ID người trò chuyện và trả về Map chứa thông tin
        return latestMessages.stream()
                .collect(Collectors.groupingBy(msg ->
                        msg.getSender().getIdUser().equals(userId) ? msg.getReceiver().getIdUser() : msg.getSender().getIdUser()))
                .values()
                .stream()
                .map(group -> group.stream().max(Comparator.comparing(Message::getTimestamp)).orElse(null)) // Tin nhắn mới nhất từ mỗi nhóm
                .filter(msg -> msg != null) // Lọc bỏ nhóm rỗng
                .map(msg -> {
                    // Tạo một Map để chứa thông tin cần trả về
                    Map<String, Object> response = new HashMap<>();
                    response.put("id", msg.getId_message());
                    response.put("content", msg.getContent());
                    response.put("timestamp", msg.getTimestamp().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));

                    // Lấy thông tin người trò chuyện
                    User chat_user = msg.getSender().getIdUser().equals(userId) ? msg.getReceiver() : msg.getSender();
                    response.put("userNameChat", chat_user.getUsername());
                    response.put("userIdChat", chat_user.getIdUser());

                    return response;
                })
                .sorted(Comparator.comparing(m -> (LocalDateTime) m.get("timestamp"), Comparator.reverseOrder())) // Sắp xếp theo thời gian mới nhất
                .collect(Collectors.toList());
    }

}

