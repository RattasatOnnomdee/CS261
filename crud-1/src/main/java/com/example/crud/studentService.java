package com.example.crud;

import com.example.crud.students;
import com.example.crud.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class studentService {

    @Autowired
    private StudentRepository studentRepository;

    // Create a new student
    public students createStudent(students student) {
        return studentRepository.save(student);
    }

    // Get all students
    public List<students> getAllStudents() {
        return studentRepository.findAll();
    }

    // Get student by ID
    public Optional<students> getStudentById(Long id) {
        return studentRepository.findById(id);
    }

    // Update a student
    public students updateStudent(Long id, students student) {
        if (studentRepository.existsById(id)) {
//            students.setId(id);
            return studentRepository.save(student);
        }
        return null;
    }

    // Delete a student
    public void deleteStudent(Long id) {
        studentRepository.deleteById(id);
    }
}
