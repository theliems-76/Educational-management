package com.example.webtrungtam.controller.admin.Class;

import com.example.webtrungtam.model.ClassStudent;
import com.example.webtrungtam.service.admin.Class.ClassStudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin/class-students")
public class ClassStudentController {

    @Autowired
    private ClassStudentService classStudentService;

    @GetMapping("/all")
    public List<ClassStudent> getClassStudents() {
        return classStudentService.getAllClassStudents();
    }

    @PostMapping("/add_student_to_class")
    public ClassStudent addStudentToClass(@RequestBody ClassStudent classStudent) {
        return classStudentService.saveClassStudent(classStudent);
    }

    @DeleteMapping("/delete/{id}")
    public String deleteClassStudent(@PathVariable Integer id) {
        classStudentService.deleteClassStudent(id);
        return "Student removed from class successfully";
    }


}
