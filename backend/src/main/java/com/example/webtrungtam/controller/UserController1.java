//package com.example.webtrungtam.controller;
//
//import com.example.webtrungtam.model.User;
//import com.example.webtrungtam.service.UserService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//import com.example.webtrungtam.util.JwtUtil;
//import java.util.Map;
//
//import java.util.List;
//import java.util.Optional;
//
//@RestController
//@RequestMapping("/api/users")
//public class UserController1 {
//
//    @Autowired
//    private UserService userService;
//    @Autowired
//    private JwtUtil jwtUtil;
//
//
//    // Lấy thông tin người dùng từ token
//    @GetMapping("/me")
//    public ResponseEntity<?> getUserDetails(@RequestHeader("Authorization") String token) {
//        try {
//            // Loại bỏ "Bearer " khỏi token
//            token = token.replace("Bearer ", "");
//
//            // Kiểm tra token có hợp lệ không
//            if (!jwtUtil.validateToken(token)) {
//                return ResponseEntity.status(401).body("Token không hợp lệ!");
//            }
//
//            // Lấy thông tin từ token
//            String username = jwtUtil.getUsernameFromToken(token);
//            String role = jwtUtil.getRoleFromToken(token);
//            User user = userService.getUserByUsername(username);
//            if (user != null) {
//                Map<String, Object> response = Map.of(
//                        "username", user.getUsername(),
//                        "email", user.getEmail(),
//                        "role", role
//                );
//                return ResponseEntity.ok(response);
//            } else {
//                return ResponseEntity.status(404).body("Không tìm thấy người dùng!");
//            }
//
//        } catch (Exception e) {
//            return ResponseEntity.status(500).body("Lỗi hệ thống: " + e.getMessage());
//        }
//    }
//
//    // Lấy danh sách tất cả người dùng
//    @GetMapping
//    public ResponseEntity<List<User>> getAllUsers() {
//        return ResponseEntity.ok(userService.getAllUsers());
//    }
//
//    // Lấy thông tin người dùng theo username
//    @GetMapping("/{username}")
//    public ResponseEntity<User> getUserByUsername(@PathVariable String username) {
//        return ResponseEntity.ok(userService.getUserByUsername(username));
//    }
//
//    // Lấy người dùng theo ID
//    @GetMapping("/{id}")
//    public ResponseEntity<User> getUserById(@PathVariable Long id) {
//        Optional<User> user = userService.getUserById(id);
//        return user.map(ResponseEntity::ok) // Trả về 200 OK nếu tìm thấy
//                .orElseGet(() -> ResponseEntity.notFound().build()); // Trả về 404 nếu không tìm thấy
//    }
//
//    // Tạo người dùng mới
//    @PostMapping
//    public User createUser(@RequestBody User user) {
//        return userService.createUser(user);
//    }
//
//    // Cập nhật thông tin người dùng
//    @PutMapping("/{id}")
//    public ResponseEntity<User> updateUser(@RequestBody User user, User userDetails) {
//        return ResponseEntity.ok(userService.updateUser(user.getId(),userDetails));
//    }
//
//    // Tạo hoặc cập nhật mật khẩu
//    @PatchMapping("/{id}/password")
//    public ResponseEntity<User> updatePassword(@RequestBody User user,String password) {
//        return ResponseEntity.ok(userService.updatePassword(user,password));
//    }
//
//    // Xóa người dùng theo ID
//    @DeleteMapping("/{id}")
//    public ResponseEntity<String> deleteUser(@PathVariable Long id) {
//        userService.deleteUser(id);
//        return ResponseEntity.ok("User deleted successfully!");
//    }
//}
