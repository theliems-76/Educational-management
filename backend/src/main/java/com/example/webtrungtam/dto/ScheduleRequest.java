package com.example.webtrungtam.dto;

import java.time.LocalTime;

public class ScheduleRequest {
    private int dayOfWeek; // Thứ trong tuần (1 = CN, 2 = T2, ...)
    private LocalTime startTime;
    private LocalTime endTime;

    // Getter và Setter
    public int getDayOfWeek() {
        return dayOfWeek;
    }

    public void setDayOfWeek(int dayOfWeek) {
        this.dayOfWeek = dayOfWeek;
    }

    public LocalTime getStartTime() {
        return startTime;
    }

    public void setStartTime(LocalTime startTime) {
        this.startTime = startTime;
    }

    public LocalTime getEndTime() {
        return endTime;
    }

    public void setEndTime(LocalTime endTime) {
        this.endTime = endTime;
    }
}
