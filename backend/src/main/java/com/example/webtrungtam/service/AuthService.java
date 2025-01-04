// AuthService.java - Service xử lý logic đăng nhập
package com.example.webtrungtam.service;

import com.example.webtrungtam.dto.CreateStudentRequest;
import com.example.webtrungtam.dto.LoginRequest;
import com.example.webtrungtam.model.User;
import com.example.webtrungtam.repository.UserRepository;
import com.example.webtrungtam.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.argon2.Argon2PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.Optional;

@Service
public class AuthService {
    @Autowired
    private UserRepository userRepository;


    @Autowired
    private Argon2PasswordEncoder passwordEncoder;
    @Autowired
    private JwtUtil jwtUtil; // Đảm bảo đã tạo lớp JwtUtil cho việc xử lý JWT.

    public String authenticate(LoginRequest request) {
        // Tìm người dùng trong database
        User user = userRepository.findByIdUser(request.getId())
                .orElseThrow(() -> new UsernameNotFoundException("User not found!"));

        // Kiểm tra mật khẩu có khớp không
        if (passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            System.out.println("Mật khẩu hợp lệ!");

            String roleName = user.getRoleName();;
            String token = jwtUtil.generateToken(user, roleName);

            return token;
        }
        else {
            System.out.println("Mật khẩu không hợp lệ!");
            return null;
        }
    }
}
