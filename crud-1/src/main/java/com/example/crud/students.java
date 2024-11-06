package com.example.crud;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import jdk.jfr.DataAmount;
import lombok.Data;

@Data
@Entity
@Table(name="Students")
public class students {  // Changed class name to "Student" (uppercase "S")

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name="userName")
    private String userName;

    @Column(name="type")
    private String type;

//    @JsonProperty("en_name")
    @Column(name = "en_name")
    private String enName;

    @Column(name = "email" ,unique = true)
    private String email;

    @Column(name = "faculty")
    private String faculty;

    public students(){}

    public students(String userName, String type, String enName, String email, String faculty) {
        this.userName = userName;
        this.type = type;
        this.enName = enName;
        this.email = email;
        this.faculty = faculty;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getEnName() {
        return enName;
    }

    public void setEnName(String enName) {
        this.enName = enName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getFaculty(){
        return faculty;
    }

    public void setFaculty(String faculty){
        this.faculty = faculty;
    }
}

