package com.example.webtrungtam.service.admin.Class;

import com.example.webtrungtam.dto.ScheduleRequest;
import com.example.webtrungtam.model.ClassDetail;
import com.example.webtrungtam.model.ClassEntity;
import com.example.webtrungtam.model.Schedule;
import com.example.webtrungtam.model.Teacher;
import com.example.webtrungtam.repository.Class.ClassDetailRepository;
import com.example.webtrungtam.repository.Class.ClassRepository;
import com.example.webtrungtam.repository.ScheduleRepository;
import com.example.webtrungtam.repository.TeacherRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

@Service
public class ClassDetailService {

    @Autowired
    private ClassDetailRepository classDetailRepository;

    @Autowired
    private ClassRepository classRepository;

    @Autowired
    private ScheduleRepository scheduleRepository;

    @Autowired
    private TeacherRepository teacherRepository;

    // Lấy tất cả chi tiết lớp học
    public List<ClassDetail> getAllClassDetails() {
        return classDetailRepository.findAll();
    }

    // Lấy chi tiết lớp học theo ID lớp
    public List<ClassDetail> getClassDetailsByClassId(int idClass) {
        return classDetailRepository.findByClassEntity_IdClass(idClass);
    }

    // Lấy chi tiết lớp học theo lịch học
    public List<ClassDetail> getClassDetailsByScheduleId(int scheduleId) {
        return classDetailRepository.findBySchedule_IdSchedule(scheduleId);
    }

    // Lấy chi tiết lớp học theo giáo viên
    public List<ClassDetail> getClassDetailsByTeacherId(String teacherId) {
        return classDetailRepository.findByTeacher_IdTeacher(teacherId);
    }

    // Lấy chi tiết lớp học theo ngày cụ thể
    public List<ClassDetail> getClassDetailsByDate(LocalDate date) {
        return classDetailRepository.findByClassDate(date);
    }

    // Lấy chi tiết lớp học trong khoảng ngày
    public List<ClassDetail> getClassDetailsByDateRange(LocalDate startDate, LocalDate endDate) {
        return classDetailRepository.findByClassDateBetween(startDate, endDate);
    }

    // Lấy chi tiết lớp học theo giờ bắt đầu
    public List<ClassDetail> getClassDetailsByStartTime(LocalTime startTime) {
        return classDetailRepository.findByStartTimeDetail(startTime);
    }

    // Lấy chi tiết lớp học theo trạng thái điểm danh
    public List<ClassDetail> getClassDetailsByAttendanceStatus(String statusAttendance) {
        return classDetailRepository.findByStatusAttendance(statusAttendance);
    }

    // Thêm mới chi tiết lớp học
    public ClassDetail addClassDetail(ClassDetail classDetail) {
        return classDetailRepository.save(classDetail);
    }

    // Cập nhật chi tiết lớp học
    public ClassDetail updateClassDetail(int id, ClassDetail updatedDetail) {
        ClassDetail existingDetail = classDetailRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Class detail not found with ID: " + id));

        existingDetail.setClassDate(updatedDetail.getClassDate());
        existingDetail.setStartTimeDetail(updatedDetail.getStartTimeDetail());
        existingDetail.setEndTimeDetail(updatedDetail.getEndTimeDetail());
        existingDetail.setStatusAttendance(updatedDetail.getStatusAttendance());

        return classDetailRepository.save(existingDetail);
    }

    // Xóa chi tiết lớp học theo ID
    public void deleteClassDetail(int id) {
        if (!classDetailRepository.existsById(id)) {
            throw new RuntimeException("Class detail not found with ID: " + id);
        }
        classDetailRepository.deleteById(id);
    }

    // Tạo chi tiết lớp học mới từ request
    public ClassDetail createClassDetail(int classId, int scheduleId, String teacherId,
                                         LocalDate classDate, LocalTime startTime, LocalTime endTime, String statusAttendance) {

        // Tìm các thực thể liên quan
        ClassEntity classEntity = classRepository.findById(classId)
                .orElseThrow(() -> new RuntimeException("Class not found with ID: " + classId));

        Schedule schedule = scheduleRepository.findById(scheduleId)
                .orElseThrow(() -> new RuntimeException("Schedule not found with ID: " + scheduleId));

        Teacher teacher = teacherRepository.findById(teacherId)
                .orElseThrow(() -> new RuntimeException("Teacher not found with ID: " + teacherId));

        // Tạo chi tiết lớp học mới
        ClassDetail classDetail = new ClassDetail();
        classDetail.setClassEntity(classEntity);
        classDetail.setSchedule(schedule);
        classDetail.setTeacher(teacher);
        classDetail.setClassDate(classDate);
        classDetail.setStartTimeDetail(startTime);
        classDetail.setEndTimeDetail(endTime);
        classDetail.setStatusAttendance(statusAttendance);

        return classDetailRepository.save(classDetail);
    }


    /// tự động tạo lịch theo tuần
    public void generateClassSchedule(int classId, LocalDate startDate, List<ScheduleRequest> schedules) {
        ClassEntity classEntity = classRepository.findById(classId)
                .orElseThrow(() -> new RuntimeException("Class not found with ID: " + classId));

        // Tạo lịch học lặp lại
        for (ScheduleRequest schedule : schedules) {
            LocalDate currentDate = startDate;

            // Xác định ngày đầu tiên trùng với thứ đã chọn
            while (currentDate.getDayOfWeek().getValue() != schedule.getDayOfWeek()) {
                currentDate = currentDate.plusDays(1);
            }

            // Tạo lịch học lặp lại trong 3 tháng
            for (int i = 0; i < 12; i++) {
                ClassDetail classDetail = new ClassDetail();
                classDetail.setClassEntity(classEntity);
                classDetail.setClassDate(currentDate);
                classDetail.setStartTimeDetail(schedule.getStartTime());
                classDetail.setEndTimeDetail(schedule.getEndTime());
                classDetail.setStatusAttendance("Not Marked"); // Trạng thái mặc định

                classDetailRepository.save(classDetail);

                // Chuyển sang tuần tiếp theo
                currentDate = currentDate.plusDays(7);
            }
        }
    }
}
