package com.example.webtrungtam.controller;

import com.example.webtrungtam.dto.CreateStudentRequest;
import com.example.webtrungtam.dto.LoginRequest;
import com.example.webtrungtam.model.Student;
import com.example.webtrungtam.model.User;
import com.example.webtrungtam.repository.UserRepository;
import com.example.webtrungtam.service.AuthService;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
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

    @PostMapping("/signin")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest request, HttpSession session) {

        // Kiểm tra thông tin đầu vào
        if (request.getId()==null || request.getPassword()==null) {
            return ResponseEntity.badRequest().body(Map.of("message", "ID và password là bắt buộc."));
        }

        String Id;
        try {
            Id = request.getId();
        } catch (NumberFormatException e) {
            return ResponseEntity.badRequest().body(Map.of("message", "Id không hợp lệ."));
        }

        String password = request.getPassword();
        if (password == null || password.trim().isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("message", "Vui lòng điền đúng mật khẩu."));
        }

        try {
//            // Xác thực người dùng
//            User user = authService.authenticate(username, password);

            // Xác thực người dùng và lấy token
            String token = authService.authenticate(request);

            // Đăng nhập thành công
            if (token != null) {
                // Truy vấn thông tin người dùng
                User user = userRepository.findByIdUser(Id)
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
                        redirectUrl = "/admin/home";
                        break;
                    case "Teacher":
                        redirectUrl = "/teacher/home";
                        break;
                    case "Student":
                        redirectUrl = "/student/home";
                        break;
                    default:
                        redirectUrl = "/signin";
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
