package com.example.crud;

import com.example.crud.students;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentRepository extends JpaRepository<students, Long> {
}