package com.example.webtrungtam.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.sql.Time;
import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UpdateClassRequest {

    @NotBlank(message = "Tên lớp học là bắt buộc")
    @Size(max = 100, message = "Tên lớp học tối đa 100 ký tự")
    private String className;

    @NotNull(message = "Môn học là bắt buộc")
    private int subjectId;

    @NotNull(message = "Giáo viên là bắt buộc")
    @Size(min = 8, max = 8, message = "Mã giáo viên phải có 8 ký tự")
    private String teacherId;

    private Time startTime;

    private Time endTime;

    public Time getStartTime() {
        return startTime;
    }

    public void setStartTime(Time startTime) {
        this.startTime = startTime;
    }

    public Time getEndTime() {
        return endTime;
    }

    public void setEndTime(Time endTime) {
        this.endTime = endTime;
    }
}
