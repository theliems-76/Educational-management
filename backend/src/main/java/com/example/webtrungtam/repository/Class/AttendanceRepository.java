package com.example.webtrungtam.repository.Class;

import com.example.webtrungtam.model.Attendance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface AttendanceRepository extends JpaRepository<Attendance, Integer> {

    // Tìm điểm danh theo ID chi tiết lớp học
    List<Attendance> findByClassDetail_IdClassDetail(int classDetailId);

    // Tìm điểm danh theo ID sinh viên
    List<Attendance> findByStudent_IdStudent(String studentId);

    // Tìm điểm danh theo ngày
    List<Attendance> findByAttendanceDate(LocalDate date);

    // Tìm điểm danh theo ID sinh viên và ngày
    List<Attendance> findByStudent_IdStudentAndAttendanceDate(String studentId, LocalDate date);

    // Tìm điểm danh theo ID chi tiết lớp học và trạng thái
    List<Attendance> findByClassDetail_IdClassDetailAndStatuses(int classDetailId, String statuses);

    // Kiểm tra sinh viên đã điểm danh chưa
    boolean existsByClassDetail_IdClassDetailAndStudent_IdStudentAndAttendanceDate(
            int classDetailId, String studentId, LocalDate date);

    // Tìm theo ClassDetailId và StudentId
    Optional<Attendance> findByClassDetail_IdClassDetailAndStudent_IdStudent(
            int classDetailId, String studentId);
}
