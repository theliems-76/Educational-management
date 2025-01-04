package com.example.webtrungtam.repository.Class;

import com.example.webtrungtam.model.Document;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface DocumentRepository extends JpaRepository<Document, Integer> {
    List<Document> findByTitleContaining(String title);

    List<Document> findByDateBetween(LocalDate startDate, LocalDate endDate);

    List<Document> findByTitleContainingAndDateBetween(String title, LocalDate startDate, LocalDate endDate);

}
