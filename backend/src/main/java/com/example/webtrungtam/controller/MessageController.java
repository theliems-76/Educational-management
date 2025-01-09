package com.example.webtrungtam.controller;

import com.example.webtrungtam.model.Message;
import com.example.webtrungtam.model.User;
import com.example.webtrungtam.service.UserService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/chat")
public class MessageController {

    @Autowired
    private UserService userService;

    // Lấy danh sách tin nhắn mới nhất (real-time)
    @GetMapping("/list")
    public ResponseEntity<String> getListLatestMessages(HttpSession session) {
        try {
            // Lấy ID người dùng hiện tại từ session
            String currentUserId = session.getAttribute("userId").toString();
            if (currentUserId == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Bạn chưa đăng nhập.");
            }
            // Gọi hàm từ service trả về danh sách Map<String, Object>
            List<Map<String, Object>> messages = userService.getListLatestMessages(currentUserId);            // Trả về danh sách tin nhắn
            return ResponseEntity.ok(messages.toString());

        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Không tìm thấy tin nhắn: " + e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Lỗi hệ thống: " + e.getMessage());
        }
    }

    @PostMapping("/send")
    public ResponseEntity<?> sendMessage(
            @RequestParam String receiverId,
            @RequestBody String content,
            HttpSession session) {
        try {
            // Lấy ID người gửi từ session
            String senderId = session.getAttribute("userId").toString();
            if (senderId == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Bạn chưa đăng nhập.");
            }

            // Gửi tin nhắn
            Message sentMessage = userService.sendMessage(senderId, receiverId, content);

            // Lấy danh sách tin nhắn cập nhật
            List<Map<String, Object>> updatedMessages = userService.getMessagesWithUser(senderId, receiverId);

            // Trả về danh sách tin nhắn cập nhật
            return ResponseEntity.ok(updatedMessages);

        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Không tìm thấy người dùng: " + e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Không thể gửi tin nhắn: " + e.getMessage());
        }
    }


    // Lấy tin nhắn chưa đọc
    @GetMapping("/unread/{receiverId}")
    public ResponseEntity<List<Message>> getUnreadMessages(@PathVariable String receiverId) {
        List<Message> messages = userService.getUnreadMessages(receiverId);
        return ResponseEntity.ok(messages);
    }

    // Lấy và cập nhật danh sách tin nhắn giữa hai người
    @GetMapping("/view/{receiverId}")
    public ResponseEntity<?> getLatestMessages(@PathVariable String receiverId, HttpSession session) {
        try {
            // Kiểm tra đăng nhập
            String currentUserId =  session.getAttribute("userId").toString();
            if (currentUserId == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Bạn chưa đăng nhập.");
            }

            // Lấy lịch sử tin nhắn và cập nhật real-time
            List<Map<String, Object>> messages = userService.getMessagesWithUser(currentUserId, receiverId);

            return ResponseEntity.ok(messages);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Lỗi hệ thống: " + e.getMessage());
        }
    }



    // Tìm kiếm người nhắn
    @GetMapping("/search")
    public ResponseEntity<List<User>> searchUsers(@RequestParam String keyword) {
        List<User> users = userService.getUserByKey(keyword);
        return ResponseEntity.ok(users);
    }

    // Lưu tin nhắn
    @PostMapping("/messages/save")
    public ResponseEntity<?> saveMessage(
            @RequestBody Message message,
            HttpSession session) {

        String senderId = (String) session.getAttribute("userId");
        if (senderId == null) {
            return ResponseEntity.status(401).body("Bạn chưa đăng nhập!");
        }

        try {
            Message savedMessage = userService.saveMessage(senderId, message.getReceiver().getIdUser(), message.getContent());
            return ResponseEntity.ok(savedMessage);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Lỗi lưu tin nhắn.");
        }
    }


//    // Xem chi tiết tin nhắn với một người cụ thể
//    @GetMapping("/messages/{receiverId}")
//    public ResponseEntity<List<Message>> getMessagesWithUser(@PathVariable Long receiverId, HttpSession session) {
//        Long userId = (Long) session.getAttribute("userId");
//        if (userId == null) {
//            return ResponseEntity.status(401).body(null);
//        }
//
//        List<Message> messages = userService.getMessagesWithUser(userId, receiverId);
//        return ResponseEntity.ok(messages);
//    }
//
//    @GetMapping("/messages")
//    public ResponseEntity<?> getMessages(HttpSession session) {
//        Long userId = (Long) session.getAttribute("userId");
//        if (userId == null) {
//            return ResponseEntity.status(401).body("Bạn chưa đăng nhập!");
//        }
//        List<Message> messages = userService.getMessagesByUserId(userId);
//        return ResponseEntity.ok(messages);
//    }

//
//    // Đánh dấu tin nhắn đã đọc
//    @PostMapping("/messages/{messageId}/read")
//    public ResponseEntity<String> markAsRead(@PathVariable Long messageId) {
//        userService.markMessageAsRead(messageId);
//        return ResponseEntity.ok("Đã đánh dấu tin nhắn là đã đọc.");
//    }
//
//    // Gửi tin nhắn
//    @PostMapping("/messages/send")
//    public ResponseEntity<?> sendMessage(@RequestBody Map<String, Object> request, HttpSession session) {
//        // Kiểm tra tham số đầu vào
//        if (!request.containsKey("receiverId") || !request.containsKey("content")) {
//            return ResponseEntity.badRequest().body("Thiếu thông tin bắt buộc!");
//        }
//
//        Long receiverId = Long.parseLong(request.get("receiverId").toString());
//        String content = request.get("content").toString();
//
//        // Kiểm tra đăng nhập qua session
//        Long senderId = (Long) session.getAttribute("userId");
//        if (senderId == null) {
//            return ResponseEntity.status(401).body("Bạn chưa đăng nhập!");
//        }
//
//        // Gửi tin nhắn
//        try {
//            Message message = userService.sendMessage(senderId, receiverId, content);
//            return ResponseEntity.ok(message);
//        } catch (Exception e) {
//            return ResponseEntity.status(500).body("Không thể gửi tin nhắn.");
//        }
//    }
}
