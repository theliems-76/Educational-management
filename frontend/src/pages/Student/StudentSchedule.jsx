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
  event: "Sự kiện",
  noEventsInRange: "Không có sự kiện nào trong khoảng thời gian này.",
  showMore: (total) => `+${total} sự kiện khác`,
};

const locales = { vi: vi };
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});
//Data
//Nếu đổi tên biến thì chỗ nào có chứ events đổi hết
const events = [
  {
    title: "Tết Dương Lịch",
    start: new Date(2025, 0, 1),
    end: new Date(2025, 0, 1),
    type: "ngày nghỉ",
  },
  {
    title: "Tết Nguyên Đán",
    start: new Date(2025, 0, 27),
    end: new Date(2025, 1, 1),
    type: "ngày nghỉ",
  },
  {
    title: "Hạn nộp bài tập",
    start: new Date(2025, 0, 13, 23, 0),
    end: new Date(2025, 0, 13, 23, 59),
    type: "deadline",
  },
];

const eventTypeLabels = {
  "ngày nghỉ": "Ngày nghỉ lễ",
  deadline: "Hạn nộp bài",
};

const StudySchedule = () => {
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
      <h2 className="text-center text-lg font-bold mb-4">Lịch Học Tập</h2>

      {/* Calendar */}
      <div className="bg-white text-black rounded-lg ">
        <Calendar
          localizer={localizer}
          //Điền data sự kiện vô
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
        aria-labelledby="chi-tiết-sự-kiện"
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
              <Typography variant="body1" className="mb-4">
                Loại sự kiện:{" "}
                {eventTypeLabels[selectedEvent.type] || selectedEvent.type}
              </Typography>
              <Typography variant="body2">
                Ngày tạo: {format(selectedEvent.start, "PPPp", { locale: vi })}
              </Typography>
              <Typography variant="body2">
                Hạn chót: {format(selectedEvent.end, "PPPp", { locale: vi })}
              </Typography>
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
            <Typography>Không có sự kiện nào được chọn</Typography>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default StudySchedule;
