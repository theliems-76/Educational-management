package com.example.webtrungtam.controller;

import com.example.webtrungtam.model.DocumentStudent;
import com.example.webtrungtam.service.DocumentStudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/document-students")
public class DocumentStudentController {

    @Autowired
    private DocumentStudentService documentStudentService;

    // Lấy tất cả các bản ghi DocumentStudent
    @GetMapping("/view-all")
    public List<DocumentStudent> getAllDocumentStudents() {
        return documentStudentService.getAllDocumentStudents();
    }

    // Lấy một bản ghi cụ thể theo ID
    @GetMapping("/view/{id}")
    public DocumentStudent getDocumentStudentById(@PathVariable Integer id) {
        return documentStudentService.getDocumentStudentById(id);
    }

    // Tạo mới một DocumentStudent
    @PostMapping("/create")
    @PreAuthorize("hasAuthority('Teacher') or hasAuthority('Admin')")
    public DocumentStudent createDocumentStudent(@RequestBody DocumentStudent documentStudent) {
        return documentStudentService.saveDocumentStudent(documentStudent);
    }

    // Cập nhật thông tin DocumentStudent
    @PutMapping("/update/{id}")
    public DocumentStudent updateDocumentStudent(@PathVariable Integer id, @RequestBody DocumentStudent documentStudent) {
        documentStudent.setId(id);
        return documentStudentService.saveDocumentStudent(documentStudent);
    }

    // Xóa một DocumentStudent
    @DeleteMapping("/delete/{id}")
    public void deleteDocumentStudent(@PathVariable Integer id) {
        documentStudentService.deleteDocumentStudent(id);
    }
}
