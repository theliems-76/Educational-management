package com.example.webtrungtam.service.admin.Class;

import com.example.webtrungtam.model.Subject;
import com.example.webtrungtam.repository.Class.SubjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SubjectService {

    @Autowired
    private SubjectRepository subjectRepository;

    // Lấy tất cả môn học
    public List<Subject> getAllSubjects() {
        return subjectRepository.findAll();
    }

    // Tìm môn học theo ID
    public Optional<Subject> getSubjectById(int id) {
        return subjectRepository.findById(id);
    }

    // Thêm hoặc cập nhật môn học
    public Subject saveSubject(Subject subject) {
        return subjectRepository.save(subject);
    }

    // Xóa môn học
    public void deleteSubject(int id) {
        subjectRepository.deleteById(id);
    }
}