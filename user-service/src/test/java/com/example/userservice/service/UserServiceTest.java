package com.example.userservice;

import com.example.userservice.service.UserService;
import com.example.userservice.model.User;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(classes = UserServiceApplication.class)
public class UserServiceTest {

    @Autowired
    private UserService userService;

    @Test
    public void testGetAllUsers() {
        List<User> users = userService.getAllUsers();

        assertEquals(2, users.size());
        assertEquals("rencber", users.get(0).getName());
        assertEquals("ayse@example.com", users.get(1).getEmail());
    }
}