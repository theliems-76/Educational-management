package com.example.webtrungtam.controller;

import com.example.webtrungtam.model.User;
import com.example.webtrungtam.model.Message;
import com.example.webtrungtam.service.UserService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private UserService userService;

    // API tìm kiếm user theo từ khóa
    @GetMapping("/search")
    public ResponseEntity<?> searchUsersByUsername(@RequestParam("username") String username) {
        List<User> users = userService.searchUsersByUsername(username);
        return ResponseEntity.ok(users);
    }
//    @GetMapping("/createUser")
//    public ResponseEntity<User> createUser(@RequestParam String username, @RequestParam String password, @RequestParam String email,
//            @RequestParam String phone, @RequestParam String role, @RequestParam String classOfSchool) {
//        try {
//            User user = userService.createUser(username, password, email, phone, role, classOfSchool);
//            return ResponseEntity.ok(user);
//        } catch (RuntimeException e) {
//            return ResponseEntity.badRequest().body(null);
//        }
//    }

    // Xem thông tin cá nhân
    @GetMapping("/profile")
    public ResponseEntity<User> getProfile(Authentication authentication, HttpSession session) {
        String userId = session.getAttribute("userId").toString();
        User user = userService.getUserById(userId);
        return ResponseEntity.ok(user);
    }

    // Cập nhật thông tin người dùng
    @PutMapping("/profile/update/{id}")
    public ResponseEntity<?> updateUser(
            @PathVariable String id,
            @RequestBody User userDetails,
            @RequestParam(required = false, defaultValue = "false") boolean resetPassword,
            HttpSession session) {

        // Kiểm tra session ID
        Object sessionUserId = session.getAttribute("userId");
        if (sessionUserId == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Bạn chưa đăng nhập!");
        }
        String currentUserId = sessionUserId.toString();

        // Kiểm tra quyền truy cập
        if (!currentUserId.equals(id)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Bạn không có quyền sửa thông tin của người khác!");
        }

        // Gọi Service xử lý logic cập nhật
        User updatedUser = userService.updateUser(id, userDetails, resetPassword);

        // Trả về kết quả
        return ResponseEntity.ok(updatedUser);
    }

//    // Cập nhật thông tin cá nhân
//    @PutMapping("/profile/{id}")
//    public ResponseEntity<User> updateUser(@PathVariable String id, @RequestBody User userDetails,HttpSession session) {
//
//        // Kiểm tra session ID và userId
//        String currentUserId = session.getAttribute("userId").toString();
//        if (currentUserId == null) {
//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
//        }
//
//        // Đảm bảo người dùng chỉ sửa thông tin của chính mình
//        if (!currentUserId.equals(id)) {
//            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(null);
//        }
//
//        // Xử lý cập nhật thông tin
//        User existingUser = userService.getUserById(id);
//        if (existingUser == null) {
//            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
//        }
//
//        if (userDetails.getUsername() != null && !userDetails.getUsername().isBlank()) {
//            existingUser.setUsername(userDetails.getUsername());
//        }
//        if (userDetails.getEmail() != null && !userDetails.getEmail().isBlank()) {
//            existingUser.setEmail(userDetails.getEmail());
//        }
//        if (userDetails.getPhone() != null && !userDetails.getPhone().isBlank()) {
//            existingUser.setPhone(userDetails.getPhone());
//        }
//
//        User updatedUser = userService.updateUser(currentUserId,existingUser);
//        return ResponseEntity.ok(updatedUser);
//    }


}
