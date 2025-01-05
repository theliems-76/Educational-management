package com.example.webtrungtam.repository.Class;

import com.example.webtrungtam.model.ClassDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Repository
public interface ClassDetailRepository extends JpaRepository<ClassDetail, Integer> {

    // Tìm chi tiết lớp học theo ID lớp
    List<ClassDetail> findByClassEntity_IdClass(int idClass);

    // Tìm chi tiết lớp học theo ID lịch học (schedule_id)
    List<ClassDetail> findBySchedule_IdSchedule(int scheduleId);

    // Tìm chi tiết lớp học theo ID giáo viên
    List<ClassDetail> findByTeacher_IdTeacher(String teacherId);

    // Tìm chi tiết lớp học theo ngày cụ thể
    List<ClassDetail> findByClassDate(LocalDate classDate);

    // Tìm chi tiết lớp học theo khoảng ngày
    List<ClassDetail> findByClassDateBetween(LocalDate startDate, LocalDate endDate);

    // Tìm chi tiết lớp học theo giờ bắt đầu
    List<ClassDetail> findByStartTimeDetail(LocalTime startTimeDetail);

    // Tìm chi tiết lớp học theo trạng thái điểm danh
    List<ClassDetail> findByStatusAttendance(String statusAttendance);

    // Tìm chi tiết lớp học của giáo viên vào ngày cụ thể
    List<ClassDetail> findByTeacher_IdTeacherAndClassDate(String teacherId, LocalDate classDate);

    // Tìm chi tiết lớp học theo giờ bắt đầu và kết thúc
    List<ClassDetail> findByStartTimeDetailBetween(LocalTime startTime, LocalTime endTime);
}