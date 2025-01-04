package com.example.webtrungtam.service.admin.Class;



import com.example.webtrungtam.model.ClassStudent;
import com.example.webtrungtam.repository.Class.ClassStudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClassStudentService {

    @Autowired
    private ClassStudentRepository classStudentRepository;

    public List<ClassStudent> getAllClassStudents() {
        return classStudentRepository.findAll();
    }

    public ClassStudent saveClassStudent(ClassStudent classStudent) {
        return classStudentRepository.save(classStudent);
    }

    public void deleteClassStudent(Integer id) {
        classStudentRepository.deleteById(id);
    }
}
