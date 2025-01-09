package com.example.webtrungtam.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.LocalDate;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreateClassRequest {

    @NotBlank
    private String className;

    @NotNull
    private int subjectId;

    @NotBlank
    private String teacherId;

    @NotNull
    private LocalDate startDate;

    @NotNull
    private List<ScheduleRequest> schedules;
}
