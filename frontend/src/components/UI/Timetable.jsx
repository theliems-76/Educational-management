import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Typography,
  Button,
  ButtonGroup,
  IconButton,
} from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const times = ["8:00", "9:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"]; // Add more times as needed

const dummyData = {
  "2023-06-01": { "8:00": "Math", "10:00": "Science" },
  "2023-06-03": { "14:00": "Art" },
  "2023-06-11": { "9:00": "Science" },
  "2023-06-17": { "15:00": "History" },
  // Add more data here
};

function Timetable() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState("month");

  const startOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  );
  const endOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  );
  const startOfWeek = new Date(currentDate);
  startOfWeek.setDate(currentDate.getDate() - currentDate.getDay() + (currentDate.getDay() === 0 ? -6 : 1)); // Adjust to start on Monday
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);

  const handlePrevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  const handlePrevWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() - 7);
    setCurrentDate(newDate);
  };
  
  const handleNextWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + 7);
    setCurrentDate(newDate);
  };
  

  const handlePrevDay = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() - 1);
    setCurrentDate(newDate);
  };

  const handleNextDay = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + 1);
    setCurrentDate(newDate);
  };

  const renderMonthView = () => {
    const weeks = [];
    let day = new Date(startOfMonth);
    while (day <= endOfMonth) {
      const week = [];
      for (let i = 0; i < 7; i++) {
        const dateStr = day.toISOString().slice(0, 10);
        const hasData = dummyData[dateStr];
        week.push(
          <TableCell key={i} sx={{border: "1px solid #ccc", width: "14.28%"}}>
            <Typography variant="caption" component="div" sx={{textAlign: "center"}}>
              {day.getDate()}
            </Typography>
            {hasData &&
              Object.entries(hasData).map(([time, subject]) => (
                <div key={time} className={`bg-blue-200 text-blue-800 p-1 mt-1 text-xs rounded ${
                  subject === "History" ? "bg-yellow-200 text-yellow-800" :
                  subject === "Art" ? "bg-green-200 text-green-800" :
                  subject === "Science" ? "bg-blue-200 text-blue-800" : ''
                }`}
                   style={{ width: "100%" }}>
                  {subject} - {time}
                </div>
              ))}
          </TableCell>
        );
        day.setDate(day.getDate() + 1);
      }
      weeks.push(<TableRow key={weeks.length}>{week}</TableRow>);
    }
    return weeks;
  };

  const renderWeekView = () => {
    const weekDays = [];
  
    // Loop through each day of the week
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      const dateStr = day.toISOString().slice(0, 10);
      const hasData = dummyData[dateStr];
  
      const daySchedule = times.map((time) => {
        const subject = hasData && hasData[time] ? hasData[time] : '';
        return (
          <TableCell key={`${dateStr}-${time}`} sx={{ border: '1px solid #ccc', height: '30px' }}>
            <Typography variant="caption" component="div" sx={{ textAlign: 'center' }}>
              {subject}
            </Typography>
          </TableCell>
        );
      });
  
      weekDays.push(
        <TableContainer key={i} component={Paper} sx={{ overflowX: 'hidden' }}>
          <Table size="small">
            <TableBody>
              <TableRow>
                <TableCell sx={{ border: '1px solid #ccc', width: '80px' }}>
                  <Typography variant="body1" component="div">
                    {days[i]} {day.getDate()}
                  </Typography>
                </TableCell>
                {daySchedule}
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      );
    }
  
    return weekDays;
  };
  

  const renderDayView = () => {
    const currentDay = days[currentDate.getDay() - 1]; // Adjust for array index
    const dateStr = currentDate.toISOString().slice(0, 10);
    const hasData = dummyData[dateStr];

    const daySchedule = times.map(time => {
      const subject = hasData && hasData[time] ? hasData[time] : "";
      return (
        <TableRow key={time}>
          <TableCell sx={{ border: "1px solid #ccc", width: "80px" }}>
            <Typography variant="body1" component="div">
              {time}
            </Typography>
          </TableCell>
          <TableCell sx={{ border: "1px solid #ccc" }}>
            <Typography variant="body2" component="div">
              {subject}
            </Typography>
          </TableCell>
        </TableRow>
      );
    });

    return (
      <TableContainer component={Paper} sx={{ overflowX: "hidden" }}>
        <Table size="small">
          <TableBody>{daySchedule}</TableBody>
        </Table>
      </TableContainer>
    );
  };

  return (
    <Paper elevation={2} sx={{ p: 2 }}>
      <div className="flex justify-between items-center mb-4">
        <div>
          <Typography variant="h6" component="h2">
            Time table
          </Typography>
          <Typography variant="subtitle1" component="h3">
            {view === "month" &&
              `${currentDate.toLocaleString("default", {
                month: "long",
              })} ${currentDate.getFullYear()}`}
            {view === "week" &&
              `Week ${startOfWeek.toLocaleString("default", {
                month: "long",
              })} ${startOfWeek.getDate()} - ${endOfWeek.getDate()}, ${currentDate.getFullYear()}`}
            {view === "day" &&
              `${currentDate.toLocaleString("default", {
                month: "long",
              })} ${currentDate.getDate()}, ${currentDate.getFullYear()}`}
          </Typography>
        </div>
        <ButtonGroup variant="outlined" aria-label="view selection">
          <Button
            onClick={() => setView("month")}
            variant={view === "month" ? "contained" : "outlined"}
          >
            Month
          </Button>
          <Button
            onClick={() => setView("week")}
            variant={view === "week" ? "contained" : "outlined"}
          >
            Week
          </Button>
          <Button
            onClick={() => setView("day")}
            variant={view === "day" ? "contained" : "outlined"}
          >
            Day
          </Button>
        </ButtonGroup>
      </div>
      <div className="flex justify-between items-center mb-4">
        <div>
          {view === "month" && (
            <>
              <IconButton onClick={handlePrevMonth}>
                <ChevronLeft />
              </IconButton>
              <IconButton onClick={handleNextMonth}>
                <ChevronRight />
              </IconButton>
            </>
          )}
          {view === "week" && (
            <>
              <IconButton onClick={handlePrevWeek}>
                <ChevronLeft />
              </IconButton>
              <IconButton onClick={handleNextWeek}>
                <ChevronRight />
              </IconButton>
            </>
          )}
          {view === "day" && (
            <>
              <IconButton onClick={handlePrevDay}>
                <ChevronLeft />
              </IconButton>
              <IconButton onClick={handleNextDay}>
                <ChevronRight />
              </IconButton>
            </>
          )}
        </div>
        <Button onClick={() => setCurrentDate(new Date())}>Today</Button>
      </div>
      <TableContainer component={Paper} sx={{ overflowX: "hidden" }}>
        <Table size="small">
          <TableBody>
            {view === "month" && renderMonthView()}
            {view === "week" && (
              <TableRow>
                {renderWeekView()}
              </TableRow>
            )}
            {view === "day" && renderDayView()}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

export default Timetable;