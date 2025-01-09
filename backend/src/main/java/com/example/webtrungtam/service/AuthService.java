// AuthService.java - Service xử lý logic đăng nhập
package com.example.webtrungtam.service;

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

    // Xác thực người dùng (tạo JWT token)
    public String authenticate(String ID, String password) {
        // Tìm người dùng trong database
        User user = userRepository.findByIdUser(ID)
                .orElseThrow(() -> new UsernameNotFoundException("User not found!"));

        // Kiểm tra mật khẩu có khớp không
        if (passwordEncoder.matches(password, user.getPassword())) {
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

//    private final AuthenticationManager authenticationManager;
//    private final UserDetailsService userDetailsService;
//    private final JwtUtil jwtUtil; // Inject JwtUtil
//    private final Argon2PasswordEncoder passwordEncoder;
//
//    @Autowired
//    public AuthService(AuthenticationManager authenticationManager,
//                       UserDetailsService userDetailsService,
//                       JwtUtil jwtUtil,
//                       Argon2PasswordEncoder passwordEncoder) {
//        this.authenticationManager = authenticationManager;
//        this.userDetailsService = userDetailsService;
//        this.jwtUtil = jwtUtil;
//        this.passwordEncoder = passwordEncoder;
//    }
//
//    // Đăng nhập
//    public String login(String username, String password) {
//        Authentication authentication = authenticationManager.authenticate(
//                new UsernamePasswordAuthenticationToken(username, password)
//        );
//        User user = (User) authentication.getPrincipal();
//        return jwtUtil.generateToken(user, user.getRole()); // Tạo token
//    }