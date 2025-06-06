package com.example.webtrungtam.service.admin.Class;

import com.example.webtrungtam.model.Schedule;
import com.example.webtrungtam.repository.ScheduleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class ScheduleService {

    @Autowired
    private ScheduleRepository scheduleRepository;

    // Lấy tất cả lịch học
    public List<Schedule> getAllSchedules() {
        return scheduleRepository.findAll();
    }

    // Lấy lịch học theo ID lớp học
    public List<Schedule> getSchedulesByClassId(int idClass) {
        return scheduleRepository.findByClassEntity_IdClass(idClass);
    }

    // Lấy lịch học theo thứ trong tuần
    public List<Schedule> getSchedulesByDayOfWeek(int dayOfWeek) {
        return scheduleRepository.findByDayOfWeek(dayOfWeek);
    }

    // Lấy lịch học theo ngày bắt đầu
    public List<Schedule> getSchedulesByStartDate(LocalDate startDate) {
        return scheduleRepository.findByStartDate(startDate);
    }

    // Lấy lịch học của lớp vào ngày cụ thể
    public List<Schedule> getSchedulesByClassAndDate(int idClass, LocalDate startDate) {
        return scheduleRepository.findByClassEntity_IdClassAndStartDate(idClass, startDate);
    }

    // Thêm lịch học mới
    public Schedule addSchedule(Schedule schedule) {
        return scheduleRepository.save(schedule);
    }

    // Cập nhật lịch học
    public Schedule updateSchedule(int idSchedule, Schedule updatedSchedule) {
        Optional<Schedule> existingSchedule = scheduleRepository.findById(idSchedule);

        if (existingSchedule.isPresent()) {
            Schedule schedule = existingSchedule.get();
            schedule.setClassEntity(updatedSchedule.getClassEntity());
            schedule.setDayOfWeek(updatedSchedule.getDayOfWeek());
            schedule.setStartTime(updatedSchedule.getStartTime());
            schedule.setEndTime(updatedSchedule.getEndTime());
            schedule.setStartDate(updatedSchedule.getStartDate());
            return scheduleRepository.save(schedule);
        } else {
            throw new RuntimeException("Schedule not found with ID: " + idSchedule);
        }
    }

    // Xóa lịch học theo ID
    public void deleteSchedule(int idSchedule) {
        scheduleRepository.deleteById(idSchedule);
    }

}