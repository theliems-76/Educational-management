package com.example.webtrungtam.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.persistence.*;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.annotations.Type;
import org.hibernate.type.SqlTypes;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "messenger")
public class Message {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id_message;

    @ManyToOne
    @JoinColumn(name = "id_sender",columnDefinition = "CHAR(8)", nullable = false)
    private User sender;

    @ManyToOne
    @JoinColumn(name = "id_receiver",columnDefinition = "CHAR(8)", nullable = false)
    private User receiver;

    @Column(nullable = false,columnDefinition = "NVARCHAR(MAX)")
    private String content;

    @Column(name = "timestamp", columnDefinition = "DATETIME")
    private LocalDateTime timestamp;

    @Column(name = "is_read")
    @JdbcTypeCode(SqlTypes.BOOLEAN) // Sử dụng BOOLEAN
    private Boolean isRead;

    public Boolean getIsRead() {
        return isRead;
    }
    // Đánh dấu tin nhắn đã đọc
    public void setIsRead(Boolean isRead) {
        this.isRead = isRead;
    }

    public int getIdMessage() {
        return id_message;
    }

    public void setIdMessage(int id_message) {
        this.id_message = id_message;
    }

    public User getSender() {
        return sender;
    }

    public void setSender(User sender) {
        this.sender = sender;
    }

    public User getReceiver() {
        return receiver;
    }

    public void setReceiver(User receiver) {
        this.receiver = receiver;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }
}
