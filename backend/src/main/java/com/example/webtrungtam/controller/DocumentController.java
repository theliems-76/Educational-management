package com.example.webtrungtam.controller;

import com.example.webtrungtam.model.Document;
import com.example.webtrungtam.service.DocumentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/user/documents")
public class DocumentController {

    @Autowired
    private DocumentService documentService;

    @GetMapping("/view-all")
    public List<Document> getAllDocuments() {
        return documentService.getAllDocuments();
    }

    @GetMapping("/view/{id}")
    public Document getDocumentById(@PathVariable Integer id) {
        return documentService.getDocumentById(id);
    }

    @PostMapping("/create")
    @PreAuthorize("hasAuthority('Teacher') or hasAuthority('Admin')")
    public Document createDocument(@RequestBody Document document) {
        return documentService.saveDocument(document);
    }

    @PutMapping("/update/{id}")
    public Document updateDocument(@PathVariable Integer id, @RequestBody Document document) {
        document.setIdDocument(id);
        return documentService.saveDocument(document);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteDocument(@PathVariable Integer id) {
        documentService.deleteDocument(id);
    }

    @GetMapping("/search")
    public List<Document> searchDocuments(
            @RequestParam(required = false) String title,
            @RequestParam(required = false) LocalDate startDate,
            @RequestParam(required = false) LocalDate endDate) {

        return documentService.searchDocuments(title, startDate, endDate);
    }

}
