package com.newsaggregator.service;

import com.newsaggregator.dto.auth.*;
import com.newsaggregator.entity.Role;
import com.newsaggregator.entity.User;
import com.newsaggregator.repository.UserRepository;
import com.newsaggregator.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public ApiResponse signup(SignupRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            return ApiResponse.error("Email already registered");
        }

        User user = User.builder()
                .fullName(request.getFullName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.USER)
                .emailVerified(true)
                .build();
        user.onCreate();

        userRepository.save(user);
        String token = jwtService.generateToken(user);

        return ApiResponse.success("Registration successful", buildAuthResponse(token, user));
    }

    public ApiResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail()).orElse(null);

        if (user == null || !passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            return ApiResponse.error("Invalid email or password");
        }

        String token = jwtService.generateToken(user);
        return ApiResponse.success("Login successful", buildAuthResponse(token, user));
    }

    private AuthResponse buildAuthResponse(String token, User user) {
        return AuthResponse.builder()
                .token(token)
                .type("Bearer")
                .user(AuthResponse.UserDto.builder()
                        .id(user.getId())
                        .fullName(user.getFullName())
                        .email(user.getEmail())
                        .role(user.getRole().name())
                        .build())
                .build();
    }
}
