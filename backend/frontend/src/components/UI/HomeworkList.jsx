import React from "react";
import {
  Typography,
  List,
  ListItem,
  Chip,
  IconButton,
  Tooltip,
  Divider,
} from "@mui/material";
import { Visibility as VisibilityIcon, AccessAlarm as AccessAlarmIcon } from "@mui/icons-material";

const homeworkData = [
  {
    id: 1,
    status: "In progress",
    title: "Phép cộng và phép trừ",
    subject: "Toán",
    teacher: "Tomy",
  },
  {
    id: 2,
    status: "Completed",
    title: "Phép cộng và phép trừ",
    subject: "Khoa học",
    teacher: "Akanen",
  },
  {
    id: 3,
    status: "Canceled",
    title: "Phép cộng và phép trừ",
    subject: "Lịch sử",
    teacher: "Vigi",
  },
  {
    id: 4,
    status: "In progress",
    title: "Phép cộng và phép trừ",
    subject: "Mỹ thuật",
    teacher: "Tomas",
  },
];

function HomeworkList() {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <Typography variant="h6" component="h2" gutterBottom>
        Bài tập về nhà
      </Typography>
      <List>
        {homeworkData.map((homework) => (
          <React.Fragment key={homework.id}>
            <ListItem className="flex-col items-start">
              <div className="flex justify-between w-full">
                <div className="flex items-center gap-4">
                  <Chip
                    label={
                      homework.status === "In progress"
                        ? "Đang làm"
                        : homework.status === "Completed"
                        ? "Hoàn thành"
                        : "Đã hủy"
                    }
                    color={
                      homework.status === "In progress"
                        ? "primary"
                        : homework.status === "Completed"
                        ? "success"
                        : "default"
                    }
                    className="font-['Poppins']"
                  />
                  <Typography className="text-[#343a3f] text-sm font-normal font-['Poppins']">
                    {homework.title}
                  </Typography>
                </div>
                <div className="flex items-center gap-2">
                  <Typography className="text-center text-[#868e96] text-xs font-normal font-['Poppins']">
                    {homework.subject}
                  </Typography>
                  <Typography className="text-center text-[#0f62fe] text-xs font-normal font-['Poppins'] ml-2">
                    {homework.teacher}
                  </Typography>
                  <Tooltip title="Xem" placement="top">
                    <IconButton size="small" className="text-[#0f62fe]">
                      <VisibilityIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Thời hạn" placement="top">
                    <IconButton size="small" className="text-[#0f62fe]">
                      <AccessAlarmIcon />
                    </IconButton>
                  </Tooltip>
                </div>
              </div>
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>
    </div>
  );
}

export default HomeworkList;