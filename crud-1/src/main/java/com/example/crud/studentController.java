package com.example.crud;

import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/students")
public class studentController {

    private final studentService studentService;

    @Autowired
    public studentController(studentService studentService) {
        this.studentService = studentService;
    }

    // Get all students
    @GetMapping
    public ResponseEntity<List<students>> getAllStudents() {
        List<students> students = studentService.getAllStudents();
        return ResponseEntity.ok(students);
    }

    // Add a new student
    @PostMapping
    public ResponseEntity<students> addStudent(@RequestBody students student) {
        students savedStudent = studentService.createStudent(student);
        return ResponseEntity.ok(savedStudent);
    }
}
