//package com.example.webtrungtam.util;
//
//import com.example.webtrungtam.model.User;
//import io.jsonwebtoken.*;
//import io.jsonwebtoken.security.Keys;
//import org.springframework.stereotype.Component;
//
//import java.security.Key;
//import java.util.Date;
//
//@Component
//public class JwtUtil {
//
//    // Tạo secretKey bằng Key chuẩn hóa (Base64)
//    private final Key key = Keys.secretKeyFor(SignatureAlgorithm.HS512); // Key chuẩn cho HS512
//    private final long EXPIRATION_TIME = 1000 * 60 * 60 * 10; // Thời gian hết hạn 10 giờ
//
//    // Tạo token
//    public String generateToken(User user, String role) {
//        return Jwts.builder()
//                .setSubject(user.getUsername())        // Username làm Subject
//                .claim("role", role)                   // Vai trò của người dùng
//                .setIssuedAt(new Date(System.currentTimeMillis())) // Thời gian tạo
//                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME)) // Thời gian hết hạn
//                .signWith(key)                         // Mã hóa với key chuẩn
//                .compact();
//    }
//
//    // Xác minh token
//    public boolean validateToken(String token) {
//        try {
//            Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token); // Xác thực token
//            return true;
//        } catch (Exception e) {
//            e.printStackTrace(); // Log lỗi chi tiết
//            return false;
//        }
//    }
//
//    // Lấy username từ token
//    public String getUsernameFromToken(String token) {
//        Claims claims = Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token).getBody();
//        return claims.getSubject(); // Lấy username từ claims
//    }
//
//    // Lấy vai trò từ token
//    public String getRoleFromToken(String token) {
//        Claims claims = Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token).getBody();
//        return claims.get("role", String.class); // Lấy vai trò từ claims
//    }
//}

package com.example.webtrungtam.util;

import com.example.webtrungtam.model.User;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class JwtUtil {

    // Tạo secretKey bằng Key chuẩn hóa
    private final String secretKey = "super_secret_key_1234567890123456";
    private final Key key = Keys.secretKeyFor(SignatureAlgorithm.HS512);

    // Chuyển đổi secretKey thành Key từ bytes
   // private final Key key = Keys.hmacShaKeyFor(secretKey.getBytes(StandardCharsets.UTF_8));

    private final long EXPIRATION_TIME = 1000 * 60 * 60 * 10; // Thời gian hết hạn 10 giờ

    // Blacklist để lưu trữ các token đã bị thu hồi
    private final Set<String> tokenBlacklist = ConcurrentHashMap.newKeySet();

    // Tạo token
    public String generateToken(User user, String role) {
        System.out.println(Base64.getEncoder().encodeToString(key.getEncoded()));
        return Jwts.builder()
                .setSubject(user.getUsername())        // Username làm Subject
                .claim("role", role)                   // Vai trò của người dùng
                .setIssuedAt(new Date(System.currentTimeMillis())) // Thời gian tạo
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME)) // Thời gian hết hạn
                .signWith(key)// Mã hóa với key chuẩn
                .compact();
    }

    // Xác minh token (kiểm tra token có trong blacklist không)
    public boolean validateToken(String token) {
        try {
            // Kiểm tra nếu token đã bị thu hồi (Blacklist)
            if (tokenBlacklist.contains(token)) {
                System.out.println("Token đã bị thu hồi!");
                return false; // Token đã bị thu hồi
            }
            // Xác thực cấu trúc 3 phần của token và chữ ký
            Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(token);
            return true;
        } catch (MalformedJwtException e) {
            System.out.println("Invalid JWT token: " + e.getMessage());
        } catch (ExpiredJwtException e) {
            System.out.println("Expired JWT token: " + e.getMessage());
        }catch (UnsupportedJwtException e) {
            System.out.println("Unsupported JWT token: " + e.getMessage());
        } catch (Exception e) {
            System.out.println("Error validating token: " + e.getMessage());
        }

        // Trả về false nếu có bất kỳ lỗi nào
        return false;
    }

    // Thêm token vào blacklist (logout)
    public void invalidateToken(String token) {
        tokenBlacklist.add(token);
    }

    // Lấy username từ token
    public String getUsernameFromToken(String token) {
        Claims claims = Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token).getBody();
        return claims.getSubject(); // Lấy username từ claims
    }

    // Lấy vai trò từ token
    public String getRoleFromToken(String token) {
        Claims claims = Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token).getBody();
        return claims.get("role", String.class); // Lấy vai trò từ claims
    }
    // Kiểm tra token đã thu hồi chưa
    public boolean isTokenRevoked(String token) {
        return tokenBlacklist.contains(token);
    }
}

