package com.example.webtrungtam.test;

import org.springframework.security.crypto.argon2.Argon2PasswordEncoder;

public class PasswordEncoderTest {
    public static void main(String[] args) {
        Argon2PasswordEncoder encoder = new Argon2PasswordEncoder(16, 32, 1, 65536, 10);
        //String password = "12345678";
        String password = "12345678";

        String encodedPassword = encoder.encode(password);

        System.out.println("Encoded password: " + encodedPassword);

        boolean isMatch = encoder.matches("12345678"
                , "$argon2id$v=19$m=65536,t=10,p=1$xieTfFMzYb26RTENWNeROA$wljjY7XtfuCuzuooBqc3TaS8M+BlQXYSB+bC8JMRLfk");
        System.out.println("Mật khẩu khớp: " + isMatch);

    }
}
