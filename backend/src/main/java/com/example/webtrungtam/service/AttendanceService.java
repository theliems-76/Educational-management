package com.example.webtrungtam.service;

import com.example.webtrungtam.model.Attendance;
import com.example.webtrungtam.model.ClassDetail;
import com.example.webtrungtam.model.Student;
import com.example.webtrungtam.repository.Class.AttendanceRepository;
import com.example.webtrungtam.repository.Class.ClassDetailRepository;
import com.example.webtrungtam.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class AttendanceService {

    @Autowired
    private AttendanceRepository attendanceRepository;

    @Autowired
    private ClassDetailRepository classDetailRepository;

    @Autowired
    private StudentRepository studentRepository;

    // ấy tất cả điểm danh
    public List<Attendance> getAllAttendances() {
        return attendanceRepository.findAll();
    }

    // Lấy điểm danh theo ID chi tiết lớp học
    public List<Attendance> getAttendancesByClassDetailId(int classDetailId) {
        return attendanceRepository.findByClassDetail_IdClassDetail(classDetailId);
    }

    //  Lấy điểm danh theo ID sinh viên
    public List<Attendance> getAttendancesByStudentId(String studentId) {
        return attendanceRepository.findByStudent_IdStudent(studentId);
    }

    // Lấy điểm danh theo ngày
    public List<Attendance> getAttendancesByDate(LocalDate date) {
        return attendanceRepository.findByAttendanceDate(date);
    }

    // Thêm điểm danh mới
    public Attendance addAttendance(int classDetailId, String studentId, LocalDate date, String status) {

        // Kiểm tra chi tiết lớp học và sinh viên có tồn tại không
        ClassDetail classDetail = classDetailRepository.findById(classDetailId)
                .orElseThrow(() -> new RuntimeException("ClassDetail not found with ID: " + classDetailId));

        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found with ID: " + studentId));

        // Kiểm tra sinh viên đã điểm danh chưa
        if (attendanceRepository.existsByClassDetail_IdClassDetailAndStudent_IdStudentAndAttendanceDate(
                classDetailId, studentId, date)) {
            throw new IllegalArgumentException("Student already marked attendance for this date!");
        }

        // Tạo điểm danh mới
        Attendance attendance = new Attendance();
        attendance.setClassDetail(classDetail);
        attendance.setStudent(student);
        attendance.setAttendanceDate(date);
        attendance.setStatuses(status);

        return attendanceRepository.save(attendance);
    }

    // Cập nhật trạng thái điểm danh
    public Attendance updateAttendance(int id, String status) {
        Attendance attendance = attendanceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Attendance not found with ID: " + id));
        attendance.setStatuses(status);
        return attendanceRepository.save(attendance);
    }

    //  Xóa điểm danh theo ID
    public void deleteAttendance(int id) {
        if (!attendanceRepository.existsById(id)) {
            throw new RuntimeException("Attendance not found with ID: " + id);
        }
        attendanceRepository.deleteById(id);
    }


    // điểm danh
    public Attendance markAttendance(int classDetailId, String studentId, String status) {
        ClassDetail classDetail = classDetailRepository.findById(classDetailId)
                .orElseThrow(() -> new RuntimeException("Class detail not found with ID: " + classDetailId));

        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found with ID: " + studentId));

        Attendance attendance = attendanceRepository.findByClassDetail_IdClassDetailAndStudent_IdStudent(
                classDetailId, studentId).orElse(new Attendance());

        attendance.setClassDetail(classDetail);
        attendance.setStudent(student);
        attendance.setAttendanceDate(LocalDate.now());
        attendance.setStatuses(status);

        return attendanceRepository.save(attendance);
    }

}
