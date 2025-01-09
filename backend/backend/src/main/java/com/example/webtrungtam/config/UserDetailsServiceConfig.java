package com.example.webtrungtam.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;

@Configuration
public class UserDetailsServiceConfig {
    @Bean
    public UserDetailsService userDetailsService() {
        return new InMemoryUserDetailsManager(); // Hoặc sử dụng custom service của bạn
    }
}
