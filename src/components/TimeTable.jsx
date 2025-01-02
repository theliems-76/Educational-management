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
import {
  ChevronLeft,
  ChevronRight,
  Search as SearchIcon,
} from "@mui/icons-material";

const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

// Dữ liệu mẫu cho timetable (Thay thế bằng dữ liệu thật từ API)
const dummyData = {
  "2023-06-01": { "8:00": "Math" },
  "2023-06-11": { "10:00": "Science" },
  "2023-06-17": { "15:00": "History" },
  "2023-06-27": { "14:00": "Art" },
  "2023-06-30": { "10:00": "Art" },
  // Add more data here
};

function Timetable() {
  const [currentDate, setCurrentDate] = useState(new Date()); // 'month', 'week', 'day'

  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const daysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();

  const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
  const startingDay = firstDayOfMonth.getDay() === 0 ? 6 : firstDayOfMonth.getDay() - 1; // Start from Monday

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth - 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1));
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  const renderMonth = () => {
    const totalDays = daysInMonth(currentMonth, currentYear);
    const totalWeeks = Math.ceil((totalDays + startingDay) / 7);
  
    const tableRows = [];
    let dayCounter = 1;
  
    for (let i = 0; i < totalWeeks; i++) {
      const cells = [];
      for (let j = 0; j < 7; j++) {
        const isCurrentMonth = i * 7 + j >= startingDay && dayCounter <= totalDays;
        const day = isCurrentMonth ? dayCounter : null;
        const dateStr = isCurrentMonth
          ? `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(
              day
            ).padStart(2, "0")}`
          : null;
        const dayData = isCurrentMonth && dummyData[dateStr] ? dummyData[dateStr] : {};
  
        cells.push(
          <TableCell
            key={`${i}-${j}`}
            sx={{
              border: "1px solid #f2f4f8",
              width: "14.28%",
              height: "103px",
              textAlign: "center",
              bgcolor: !isCurrentMonth ? "#f2f4f8" : null,
              opacity: !isCurrentMonth ? 0.3 : 1,
            }}
          >
            {day && (
              <>
                <Typography variant="caption" component="div">
                  {day}
                </Typography>
                {Object.entries(dayData).map(([time, subject]) => (
                  <div
                    key={time}
                    className={`text-xs mt-1 rounded p-1 ${
                      subject === "History"
                        ? "bg-yellow-200 text-yellow-800"
                        : subject === "Art"
                        ? "bg-green-200 text-green-800"
                        : subject === "Science"
                        ? "bg-blue-200 text-blue-800"
                        : ""
                    }`}
                  >
                    {subject} - {time}
                  </div>
                ))}
              </>
            )}
          </TableCell>
        );
        if (isCurrentMonth) dayCounter++;
      }
      tableRows.push(<TableRow key={i}>{cells}</TableRow>);
    }
  
    return tableRows;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <Button variant="outlined" size="small" onClick={handleToday}>
            Today
          </Button>
          <IconButton size="small" onClick={handlePrevMonth}>
            <ChevronLeft />
          </IconButton>
          <IconButton size="small" onClick={handleNextMonth}>
            <ChevronRight />
          </IconButton>
          <Typography variant="h6" component="h3">
            {months[currentMonth]} {currentYear}
          </Typography>
        </div>
        </div>
      <TableContainer component={Paper} elevation={0}>
        <Table aria-label="timetable">
          <TableBody>
            <TableRow>
              {daysOfWeek.map((day, index) => (
                <TableCell
                  key={index}
                  align="center"
                  sx={{
                    border: "1px solid #f2f4f8",
                    "&:first-of-type": {
                      borderLeft: "none", 
                    },
                    "&:last-of-type": {
                      borderRight: "none",
                    },
                    borderTop:"none",
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    fontWeight="bold"
                    color={
                      day === "Sat"
                        ? "primary"
                        : day === "Sun"
                        ? "error"
                        : "inherit"
                    }
                  >
                    {day}
                  </Typography>
                </TableCell>
              ))}
            </TableRow>
            {renderMonth()}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Timetable;