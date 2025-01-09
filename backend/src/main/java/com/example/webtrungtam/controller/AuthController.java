package com.example.webtrungtam.controller;

import com.example.webtrungtam.model.User;
import com.example.webtrungtam.repository.UserRepository;
import com.example.webtrungtam.service.AuthService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
// Xử lý đăng nhập_đăng xuất
public class AuthController {

    @Autowired
    private AuthService authService;
    @Autowired
    private UserRepository userRepository;

    // API đăng nhập
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> loginRequest,HttpSession session) {

        // Kiểm tra thông tin đầu vào
        if (!loginRequest.containsKey("ID") || !loginRequest.containsKey("password")) {
            return ResponseEntity.badRequest().body(Map.of("message", "ID và password là bắt buộc."));
        }

        String ID;
        try {
            ID = loginRequest.get("ID");
        } catch (NumberFormatException e) {
            return ResponseEntity.badRequest().body(Map.of("message", "ID không hợp lệ."));
        }        String password = loginRequest.get("password");

        if (password == null || password.trim().isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("message", "Thông tin đăng nhập không hợp lệ."));
        }

        try {
//            // Xác thực người dùng
//            User user = authService.authenticate(username, password);
//
//            if (user != null) {
//                String role = user.getRole().getName(); // Lấy tên vai trò từ bảng Role

            // Xác thực người dùng và lấy token
            String token = authService.authenticate(ID, password);

            // Đăng nhập thành công
            if (token != null) {
                // Truy vấn thông tin người dùng
                User user = userRepository.findByIdUser(ID)
                        .orElseThrow(() -> new RuntimeException("Không tìm thấy ID người dùng."));

                String roleName = user.getRoleName();

                // Kiểm tra và lấy vai trò
                if (roleName == null) {
                    return ResponseEntity.status(500).body(Map.of("message", "Người dùng không có vai trò được gán."));
                }

                // Trả về thông tin người dùng và token
                String redirectUrl = "";

                // Xác định giao diện điều hướng
                switch (roleName) {
                    case "Admin":
                        redirectUrl = "/admin/dashboard";
                        break;
                    case "Teacher":
                        redirectUrl = "/teacher/dashboard";
                        break;
                    case "Student":
                        redirectUrl = "/student/dashboard";
                        break;
                    default:
                        redirectUrl = "/login";
                }

                // Lưu ID người dùng vào session
                session.setAttribute("userId", user.getIdUser());

                // Trả về thông tin người dùng và token
                return ResponseEntity.ok(Map.of(
                        "id",user.getIdUser(),
                        "token", token,
                        "role", roleName,
                        "redirectUrl", redirectUrl,
                        "message", "Đăng nhập thành công."
                ));
            } else {
                return ResponseEntity.status(401).body(Map.of("message", "ID hoặc mật khẩu không đúng."));
            }
        } catch (Exception e) {
            e.printStackTrace(); // Log lỗi chi tiết
            return ResponseEntity.status(401).body(Map.of("message", "ID, mật khẩu không đúng."));
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpSession session) {
        try {
            // Loại bỏ tiền tố "Bearer "
            //token = token.substring(7);
            // Thu hồi token
            //jwtUtil.invalidateToken(token);

            session.invalidate(); // Hủy session
            return ResponseEntity.ok("Đăng xuất thành công!");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Lỗi hệ thống: " + e.getMessage());
        }
    }
}
