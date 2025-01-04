package com.example.webtrungtam.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.sql.Time;
import java.time.LocalDate;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreateClassRequest {

    private CreateClassRequest classRequest;
    private LocalDate startDate;
    private List<ScheduleRequest> schedules;
    private String className;
    private int subjectId;
    private String teacherId;

    public CreateClassRequest getClassRequest() {
        return classRequest;
    }

    public void setClassRequest(CreateClassRequest classRequest) {
        this.classRequest = classRequest;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public List<ScheduleRequest> getSchedules() {
        return schedules;
    }

    public void setSchedules(List<ScheduleRequest> schedules) {
        this.schedules = schedules;
    }
}
