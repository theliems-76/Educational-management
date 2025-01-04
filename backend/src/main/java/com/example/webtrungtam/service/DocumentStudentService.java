package com.example.webtrungtam.service;

import com.example.webtrungtam.model.DocumentStudent;
import com.example.webtrungtam.repository.Class.DocumentStudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DocumentStudentService {

    @Autowired
    private DocumentStudentRepository documentStudentRepository;

    public List<DocumentStudent> getAllDocumentStudents() {
        return documentStudentRepository.findAll();
    }

    public DocumentStudent getDocumentStudentById(Integer id) {
        return documentStudentRepository.findById(id).orElse(null);
    }

    public DocumentStudent saveDocumentStudent(DocumentStudent documentStudent) {
        return documentStudentRepository.save(documentStudent);
    }

    public void deleteDocumentStudent(Integer id) {
        documentStudentRepository.deleteById(id);
    }
}
