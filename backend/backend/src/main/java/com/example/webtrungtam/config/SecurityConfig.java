package com.example.webtrungtam.config;

import com.example.webtrungtam.util.JwtUtil;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.servers.Server;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Lazy;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authorization.AuthorizationDecision;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.argon2.Argon2PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.authentication.Http403ForbiddenEntryPoint;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.filter.CorsFilter;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Arrays;
import java.util.Optional;

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
//    @Bean
//    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//        http.csrf(csrf -> csrf.disable()) // Tắt CSRF để test API
//                .authorizeHttpRequests(auth -> auth
//                                .requestMatchers("/swagger-ui/**", "/v3/api-docs/**", "/swagger-resources/**").permitAll()
//                                .requestMatchers("/api/auth/**").permitAll() // Cho phép API đăng nhập không cần xác thực
//                                .requestMatchers("/api/auth/login", "/user/search", "/user/messages").permitAll()
//                                //.requestMatchers("/api/users/me").authenticated() // Cần xác thực
//                                .requestMatchers("/api/user/**").permitAll()
//                                .requestMatchers("/ws/chat/**").permitAll() // Cho phép truy cập WebSocket
//                                .requestMatchers("/admin/**").hasAnyAuthority("Admin") // ADMIN có quyền truy cập trang admin
//                                .requestMatchers("/teacher/**").hasAnyAuthority("Teacher") // TEACHER truy cập trang giáo viên
//                                .requestMatchers("/student/**").hasAnyAuthority("Student") // STUDENT truy cập trang học sinh
//                                .anyRequest().authenticated() // Các API khác yêu cầu xác thực
//                                //.anyRequest().permitAll()
//
//                )
//
//                //.sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)) // Vô hiệu hóa session
//                //.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class) // Thêm filter JWT
//
//                //.httpBasic(httpBasic -> httpBasic.disable()) // Không dùng HTTP Basic
//                //.formLogin(form -> form.disable()); // Không dùng form đăng nhập
//
//                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED)) // Sử dụng session
//                //.formLogin(form -> form.defaultSuccessUrl("/dashboard").permitAll()) // Bật form đăng nhập
//                .logout(logout -> logout.permitAll()); // Bật chức năng đăng xuất
//
//        return http.build();
//    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
        return authConfig.getAuthenticationManager();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable()) // Tắt CSRF
                .cors(cors -> cors.configurationSource(corsConfigurationSource())) // Kích hoạt CORS

                // Xác thực không dùng session
                .sessionManagement(session -> session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS))

                // Phân quyền theo role
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll() // OPTIONS không cần xác thực
                        .requestMatchers("/swagger-ui/**", "/v3/api-docs/**", "/swagger-resources/**").permitAll()
                        .requestMatchers("/api/auth/**").permitAll() // Cho phép API đăng nhập không cần xác thực
                        .requestMatchers("/api/auth/login", "/user/search", "/user/messages").permitAll()
                        .requestMatchers("/api/user/**").permitAll()
                        .requestMatchers("/ws/chat/**").permitAll() // Cho phép truy cập WebSocket
                       // .requestMatchers("/admin/**").hasRole("Admin") // ADMIN có quyền truy cập trang admin
                        //        .requestMatchers("/teacher/**").hasRole("Teacher") // TEACHER truy cập trang giáo viên
                       // .requestMatchers("/student/**").hasRole("Student") // STUDENT truy cập trang học sinh
                                .requestMatchers("/admin/**").permitAll()
//                        .requestMatchers("/admin/**").access((authentication, context) -> {
//                            String role = context.getRequest().getHeader("Role");
//                            return new AuthorizationDecision("Admin".equals(role)); // Kiểm tra role "Admin"
//                        })
                        .requestMatchers("/teacher/**").access((authentication, context) -> {
                            String role = context.getRequest().getHeader("Role");
                            return new AuthorizationDecision("Teacher".equals(role)); // Kiểm tra role "Teacher"
                        })
                        .requestMatchers("/student/**").access((authentication, context) -> {
                            String role = context.getRequest().getHeader("Role");
                            return new AuthorizationDecision("Student".equals(role)); // Kiểm tra role "Student"
                        })

                        .anyRequest().authenticated() // Các API khác yêu cầu xác thực
                        //.anyRequest().permitAll()
                )

                // Xử lý ngoại lệ
                .exceptionHandling(exception -> exception
                        .authenticationEntryPoint(new Http403ForbiddenEntryPoint())) // Trả về lỗi 403 nếu không có quyền
                .logout(logout -> logout.permitAll());
        return http.build();
    }


    // Cấu hình CORS
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOriginPatterns(Arrays.asList("*")); // Cho phép tất cả origin
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("*")); // Cho phép tất cả headers
        configuration.setExposedHeaders(Arrays.asList("Role")); // Cho phép client đọc Header "Role"
        configuration.setAllowCredentials(true); // Hỗ trợ cookies và thông tin xác thực

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

}

