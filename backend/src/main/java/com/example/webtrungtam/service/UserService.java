package com.example.webtrungtam.service;

import com.example.webtrungtam.model.Message;
import com.example.webtrungtam.model.User;
import com.example.webtrungtam.repository.MessageRepository;
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
    private MessageRepository messageRepository;

    @Autowired
    private Argon2PasswordEncoder encoder;

    //public User createUser(String username, String rawPassword, String email, String phone, String role,String classOfSchool) {
//
//        // Lấy năm hiện tại
//        int currentYear = Year.now().getValue();
//        String yearPrefix = String.valueOf(currentYear).substring(2); // Hai chữ số cuối của năm, ví dụ: "24"
//
//        // Lấy khối lớp, đảm bảo có hai chữ số
//        String classPrefix = String.format("%02d", Integer.parseInt(classOfSchool)); // Ví dụ: "10"
//
//        // Tạo tiền tố cho ID: YYKK
//        String yearClassPrefix = yearPrefix + classPrefix; // Ví dụ: "2410"
//
//        // Tìm số thứ tự cao nhất hiện tại
//        Optional<User> lastUserOpt = userRepository.findTopByOrderByIdUserDesc();
//        int currentMax = 0;
//        if (lastUserOpt.isPresent()) {
//            String lastId = lastUserOpt.get().getIdUser();
//            if (lastId.startsWith(yearClassPrefix)) {
//                try {
//                    int sequence = Integer.parseInt(lastId.substring(4)); // Lấy phần số thứ tự
//                    currentMax = sequence;
//                } catch (NumberFormatException e) {
//                    currentMax = 0;
//                }
//            }
//        }
//
//
//        // Sinh số thứ tự mới
//        int newSequence = currentMax + 1;
//
//        // Sinh ID mới
//        String newIdUser = IdGenerator.generateId(yearPrefix, "00", newSequence); // "00" là placeholder cho khối nếu không áp dụng
//
//        // Mã hóa mật khẩu
//        encoder = new Argon2PasswordEncoder(16, 32, 1, 65536, 10);
//        String encodedPassword = encoder.encode(rawPassword);
//
//        // Tạo User mới
//        User newUser = new User();
//        newUser.setIdUser(newIdUser);
//        newUser.setUsername(username);
//        newUser.setPassword(encodedPassword);
//        newUser.setEmail(email);
//        newUser.setPhone(phone);
//        newUser.setCreated_year(currentYear);
//        newUser.setRoleName(role);
//
//        return userRepository.save(newUser);
    //}

    // Lấy thông tin người dùng theo username
    public User getUserById(String userId) {
        return userRepository.findByIdUser( userId).orElseThrow(() -> new RuntimeException("User not found"));
    }
    // Lấy thông tin người dùng theo username
    public User getUserByUsername(String username) {
        return userRepository.findByUsername(username).orElseThrow(() -> new RuntimeException("User not found"));
    }
    // Lấy thông tin người dùng theo từ khóa
    public List<User> getUserByKey(String keyword) {
        return userRepository.findByUsernameContaining(keyword);
    }

    public User findByIdUser(String id) {
        return userRepository.findByIdUser(id)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with ID: " + id));
    }

    // Cập nhật thông tin người dùng
    public User updateUser(String id, User userDetails) {
        User user = userRepository.findByIdUser(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy người dùng!"));
        user.setUsername(userDetails.getUsername());
        user.setEmail(userDetails.getEmail());
        user.setPhone(userDetails.getPhone());
        // user.setRole(userDetails.getRole());
        //updatePassword(user,userDetails.getPassword());
        return userRepository.save(user);
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
        return messageRepository.findByReceiverAndIsReadOrderByTimestampAsc(user, 0);
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
        message.setIsRead(0);
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
        message.setIsRead(0); // Mặc định là chưa đọc

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
        messages.forEach(msg -> msg.setIsRead(1));
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

