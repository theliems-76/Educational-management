package com.example.webtrungtam.repository;

import com.example.webtrungtam.model.Message;
import com.example.webtrungtam.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageRepository extends JpaRepository<Message, Integer> {

    // Tìm tin nhắn giữa hai người dùng
    List<Message> findBySenderAndReceiverOrderByTimestampAsc(User sender, User receiver);
    List<Message> findByReceiverAndSenderOrderByTimestampAsc(User receiver, User sender);

    // Tìm tin nhắn chưa đọc
    List<Message> findByReceiverAndIsReadOrderByTimestampAsc(User receiver, boolean isRead);
    // Tìm kiếm nội dung tin nhắn
    List<Message> findByContentContainingOrderByTimestampAsc(String keyword);

    // Phân trang tin nhắn
    Page<Message> findByReceiver(User receiver, Pageable pageable);

    // Tìm tin nhắn bởi người nhận
    List<Message> findByReceiverOrderByTimestampAsc(User receiver);


    // Lấy tin nhắn mới nhất giữa hai người
    @Query("SELECT m FROM Message m WHERE (m.sender = :user1 AND m.receiver = :user2) " +
            "OR (m.sender = :user2 AND m.receiver = :user1) " +
            "ORDER BY m.timestamp DESC")
    List<Message> findLatestMessages(
            @Param("user1") User user1,
            @Param("user2") User user2);

    // Lấy tin nhắn mới nhất (real-time) cho từng người
    @Query("SELECT m FROM Message m WHERE (m.sender = :user OR m.receiver = :user) " +
            "AND m.timestamp = (SELECT MAX(m2.timestamp) FROM Message m2 " +
            "WHERE (m2.sender = m.sender AND m2.receiver = m.receiver) " +
            "OR (m2.sender = m.receiver AND m2.receiver = m.sender))")
    List<Message> findLatestMessagesForUser(@Param("user") User user);
    List<Message> findTop10BySenderAndReceiverOrderByTimestampDesc(User sender, User receiver);
}
