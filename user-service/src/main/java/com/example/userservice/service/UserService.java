package com.example.userservice.service;

import com.example.userservice.model.User;
import com.example.userservice.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;

    @Autowired // constructor injection
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // Tüm kullanıcıları getir
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // ID ile kullanıcı getir
    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    // Yeni kullanıcı ekle
    public User createUser(User user) {
        return userRepository.save(user);
    }

    // Kullanıcı sil
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    // Email ile kullanıcı ara
    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }
}