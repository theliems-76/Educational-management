package com.example.webtrungtam.repository;

import com.example.webtrungtam.model.Schedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@Repository
public interface ScheduleRepository extends JpaRepository<Schedule, Integer> {

    // Tìm lịch học theo ID lớp học
    List<Schedule> findByClassEntity_IdClass(int aClass);

    // Tìm lịch học theo thứ trong tuần
    List<Schedule> findByDayOfWeek(int dayOfWeek);

    // Tìm lịch học theo ngày bắt đầu
    List<Schedule> findByStartDate(LocalDate startDate);

    // Tìm lịch học của lớp vào ngày cụ thể
    List<Schedule> findByClassEntity_IdClassAndStartDate(int aClass, LocalDate startDate);
}