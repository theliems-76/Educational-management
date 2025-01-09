package com.example.webtrungtam.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "Messages")
public class Message {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_message;

    @ManyToOne
    @JoinColumn(name = "id_sender", nullable = false)
    private User sender;

    @ManyToOne
    @JoinColumn(name = "id_receiver", nullable = false)
    private User receiver;

    @Column(nullable = false)
    private String content;

    @Column(nullable = false)
    private LocalDateTime timestamp;

    @Column(name = "is_read")
    private Integer isRead=0;

    public Integer getIsRead() {
        return isRead;
    }
    // Đánh dấu tin nhắn đã đọc
    public void setIsRead(Integer isRead) {
        this.isRead = isRead;
    }

    public Long getIdMessage() {
        return id_message;
    }

    public void setIdMessage(Long id_message) {
        this.id_message = id_message;
    }

    public User getSender() {
        return sender;
    }

    public void setSender(User Sender) {
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
