package com.example.webtrungtam.service;

import com.example.webtrungtam.model.User;
import com.example.webtrungtam.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.argon2.Argon2PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService1 {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private Argon2PasswordEncoder passwordEncoder;

    // Lấy tất cả người dùng
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // Tạo người dùng mới
    public User createUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword())); // Mã hóa mật khẩu
        return userRepository.save(user);
    }

    // Tìm người dùng theo username
    public User getUserByUsername(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found!"));
        return user;
    }

    // Tìm người dùng theo ID
    public Optional<User> getUserById(String id) {
        User user = userRepository.findByIdUser(id)
               .orElseThrow(() -> new UsernameNotFoundException("User not found!"));
        return Optional.ofNullable(user);
    }

    // Lưu cập nhật mật khẩu mới
    public User updatePassword(User user, String password) {
        user.setPassword(passwordEncoder.encode(user.getPassword())); // Mã hóa mật khẩu
        return userRepository.save(user);
    }

    // Cập nhật thông tin người dùng
    public User updateUser(String id, User userDetails) {
        User user = userRepository.findByIdUser(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy người dùng!"));
        user.setUsername(userDetails.getUsername());
        user.setEmail(userDetails.getEmail());
        user.setPhone(userDetails.getPhone());

        updatePassword(user,userDetails.getPassword());

        return userRepository.save(user);
    }

    // Xóa người dùng
    public void deleteUser(String id) {
        userRepository.deleteById(id);
    }
}
