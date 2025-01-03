import React, { useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { Button, Modal, Box, Typography } from "@mui/material";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { format, parse, startOfWeek, getDay } from "date-fns";
import vi from "date-fns/locale/vi";

const messages = {
  allDay: "Cả ngày",
  previous: "Trước",
  next: "Sau",
  today: "Hôm nay",
  month: "Tháng",
  week: "Tuần",
  day: "Ngày",
  agenda: "Lịch trình",
  date: "Ngày",
  time: "Thời gian",
  event: "Buổi dạy",
  noEventsInRange: "Không có buổi dạy nào trong khoảng thời gian này.",
  showMore: (total) => `+${total} buổi dạy khác`,
};

const locales = { vi: vi };
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

// Dữ liệu lịch dạy (sẽ được thay đổi theo backend)
const events = [
    {
      title: "Toán 8",
      start: new Date(2024, 10, 25, 8, 0), // Ngày 25/11/2024, 8:00 sáng
      end: new Date(2024, 10, 25, 9, 30),   // Ngày 25/11/2024, 9:30 sáng
      type: "lớp học",
      class: "Toán 8",
      subject: "Toán",
      room: "Phòng A201",
    },
    {
      title: "Văn 10",
      start: new Date(2024, 10, 26, 14, 0),
      end: new Date(2024, 10, 26, 15, 30),
      type: "lớp học",
      class: "Văn 10",
      subject: "Văn",
      room: "Phòng B102",
    },
  {
    title: "Họp giáo viên",
    start: new Date(2024, 10, 27, 10, 0),
    end: new Date(2024, 10, 27, 11, 0),
    type: "cuộc họp",
    room: "Phòng họp lớn",
  },
  {
    title: "Lớp Anh Văn",
    start: new Date(2024, 10, 27, 14, 0),
    end: new Date(2024, 10, 27, 15, 30),
    type: "lớp học",
     class: "Anh văn 12",
    subject: "Anh Văn",
    room: "Phòng C303",
  },
];

const eventTypeLabels = {
    "lớp học": "Lớp học",
    "cuộc họp": "Cuộc họp",
  };

const TeacherTimetable = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedEvent(null);
  };

  return (
    <div className="p-4 max-w text-white rounded-lg">
      <h2 className="text-center text-lg font-bold mb-4">Lịch Dạy</h2>

      {/* Calendar */}
      <div className="bg-white text-black rounded-lg ">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
          onSelectEvent={handleEventClick}
          messages={messages}
          culture="vi"
        />
      </div>

      {/* Event Modal */}
      <Modal
        open={modalOpen}
        onClose={closeModal}
        aria-labelledby="chi-tiết-buổi-dạy"
      >
        <Box
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-6 bg-white text-black rounded-lg shadow-md"
          style={{ width: 400 }}
        >
          {selectedEvent ? (
            <>
              <Typography variant="h6" component="h2" className="mb-2">
                {selectedEvent.title}
              </Typography>
              <Typography variant="body1" className="mb-2">
                Loại:{" "}
                {eventTypeLabels[selectedEvent.type] || selectedEvent.type}
              </Typography>
              {selectedEvent.class && (
                 <Typography variant="body1" className="mb-2">
                 Lớp: {selectedEvent.class}
               </Typography>
              )}
              {selectedEvent.subject && (
                 <Typography variant="body1" className="mb-2">
                  Môn: {selectedEvent.subject}
                </Typography>
              )}
              <Typography variant="body2" className="mb-2">
                Thời gian bắt đầu: {format(selectedEvent.start, "PPPp", { locale: vi })}
              </Typography>
              <Typography variant="body2" className="mb-2">
                Thời gian kết thúc: {format(selectedEvent.end, "PPPp", { locale: vi })}
              </Typography>
               {selectedEvent.room && (
                <Typography variant="body1" className="mb-2">
                    Phòng: {selectedEvent.room}
                  </Typography>
              )}
              <Button
                onClick={closeModal}
                variant="contained"
                className="mt-4"
                sx={{ marginTop: 2 }}
              >
                Đóng
              </Button>
            </>
          ) : (
            <Typography>Không có buổi dạy nào được chọn</Typography>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default TeacherTimetable;