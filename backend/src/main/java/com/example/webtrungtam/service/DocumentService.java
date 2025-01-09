package com.example.webtrungtam.service;

import com.example.webtrungtam.model.Document;
import com.example.webtrungtam.repository.Class.DocumentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class DocumentService {

    @Autowired
    private DocumentRepository documentRepository;

    public List<Document> getAllDocuments() {
        return documentRepository.findAll();
    }

    public Document getDocumentById(Integer id) {
        return documentRepository.findById(id).orElse(null);
    }

    public Document saveDocument(Document document) {
        return documentRepository.save(document);
    }

    public void deleteDocument(Integer id) {
        documentRepository.deleteById(id);
    }

    public List<Document> searchDocuments(String title, LocalDate startDate, LocalDate endDate) {
        if (title != null && startDate != null && endDate != null) {
            return documentRepository.findByTitleContainingAndDateBetween(title, startDate, endDate);
        } else if (title != null) {
            return documentRepository.findByTitleContaining(title);
        } else if (startDate != null && endDate != null) {
            return documentRepository.findByDateBetween(startDate, endDate);
        } else {
            return documentRepository.findAll();
        }
    }

}
