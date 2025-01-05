package com.example.webtrungtam.config;

import com.example.webtrungtam.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.argon2.Argon2PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
    private final String secretKey = "super_secret_key_1234567890123456";
    private static final String TEST_TOKEN = "test-token-12345";
    // Bean để mã hóa mật khẩu bằng Argon2
    @Bean
    public Argon2PasswordEncoder passwordEncoder() {
        return new Argon2PasswordEncoder(16, 32, 1, 65536, 10);
    }
    @Bean
    public JwtUtil jwtUtil() {
        return new JwtUtil();
    }
    @Lazy
    private final JwtAuthenticationFilter jwtAuthenticationFilter;
    @Lazy
    @Autowired
    public SecurityConfig(JwtAuthenticationFilter jwtAuthenticationFilter) {
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
    }

    // Cấu hình bảo mật
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.csrf(csrf -> csrf.disable()) // Tắt CSRF để test API
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/auth/**").permitAll() // Cho phép API đăng nhập không cần xác thực
                        .requestMatchers("/api/login", "/user/search", "/user/messages").permitAll()
                        //.requestMatchers("/api/users/me").authenticated() // Cần xác thực
                        .requestMatchers("/api/user/**").permitAll()
                        .requestMatchers("/ws/chat/**").permitAll() // Cho phép truy cập WebSocket
                        .requestMatchers("/admin/**").hasAnyAuthority("admin") // ADMIN có quyền truy cập trang admin
                        .requestMatchers("/teacher/**").hasAnyAuthority("teacher") // TEACHER truy cập trang giáo viên
                        .requestMatchers("/student/**").hasAnyAuthority("student") // STUDENT truy cập trang học sinh
//                        .anyRequest().authenticated() // Các API khác yêu cầu xác thực
                       .anyRequest().permitAll()


                )
                //.sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)) // Vô hiệu hóa session
                //.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class) // Thêm filter JWT

                //.httpBasic(httpBasic -> httpBasic.disable()) // Không dùng HTTP Basic
                //.formLogin(form -> form.disable()); // Không dùng form đăng nhập

                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED)) // Sử dụng session
                //.formLogin(form -> form.defaultSuccessUrl("/dashboard").permitAll()) // Bật form đăng nhập
                .logout(logout -> logout.permitAll()); // Bật chức năng đăng xuất


        return http.build();
    }
}

