import React, { useState, useRef } from "react";
import {
  Typography,
  Tabs,
  Tab,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  IconButton,
  Box,
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import UploadIcon from "@mui/icons-material/Upload";
import DescriptionIcon from "@mui/icons-material/Description";
import AssignmentIcon from "@mui/icons-material/Assignment";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

const ClassDetail = ({ cls, onClose }) => {
  const [tabIndex, setTabIndex] = useState(0);
  const [openAssignment, setOpenAssignment] = useState(null);
  const fileInputRef = useRef({});

  const handleDownload = (fileUrl) => {
    console.log(`Downloading file from: ${fileUrl}`);
  };

  const handleUpload = (id, file) => {
    console.log(`Uploading file for assignment ${id}:`, file);
  };

  const handleFileChange = (id, event) => {
    const file = event.target.files[0];
    if (file) {
      handleUpload(id, file);
    }
  };

  const assignments = [
    {
      id: 1,
      title: "Bài tập 1: React Basics",
      topic: "Tìm hiểu về components, props, và state trong React",
      dueDate: "2025-01-15",
      fileUrl: "/assignments/react-intro.pdf",
      status: "pending",
    },
    {
      id: 2,
      title: "Bài tập 2: State Management",
      topic: "Thực hành về quản lý state với hooks và context",
      dueDate: "2025-01-22",
      fileUrl: "/assignments/state-management.pdf",
      status: "submitted",
    },
  ];

  return (
    <div>
      <Typography variant="h4" className="font-bold mb-4">
        {cls.title}
      </Typography>
      <Typography variant="body1" className="mb-4">
        {cls.description}
      </Typography>
      <div className="p-6 w-full max-w-4xl mx-auto">
        <Tabs
          value={tabIndex}
          onChange={(e, newIndex) => setTabIndex(newIndex)}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          className="mb-4"
        >
          <Tab label="Thông tin lớp học & Tài liệu" />
          <Tab label="Bài tập" />
        </Tabs>

        {tabIndex === 0 && (
          <Box className="mt-4">
            <Typography variant="h6" className="font-bold mb-3">
              Danh sách tài liệu:
            </Typography>
            <List>
              {cls.materials.map((item, index) => (
                <ListItem key={index}>
                  <ListItemIcon>
                    <DescriptionIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText primary={item} className="text-gray-600" />
                  <IconButton
                    onClick={() => handleDownload(`material-${index}`)}
                  >
                    <DownloadIcon />
                  </IconButton>
                </ListItem>
              ))}
            </List>
          </Box>
        )}

        {tabIndex === 1 && (
          <Box className="mt-4">
            <Typography variant="h6" className="font-bold mb-3">
              Danh sách bài tập:
            </Typography>
            <List>
              {assignments.map((assignment) => (
                <Paper key={assignment.id} elevation={1} className="mb-3">
                  <ListItem
                    button
                    onClick={() =>
                      setOpenAssignment(
                        openAssignment === assignment.id ? null : assignment.id
                      )
                    }
                  >
                    <ListItemIcon>
                      <AssignmentIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary={assignment.title}
                      secondary={`Hạn nộp: ${new Date(
                        assignment.dueDate
                      ).toLocaleDateString()}`}
                    />
                    {openAssignment === assignment.id ? (
                      <ExpandLessIcon />
                    ) : (
                      <ExpandMoreIcon />
                    )}
                  </ListItem>

                  {openAssignment === assignment.id && (
                    <Box className="p-4 bg-gray-50">
                      <Typography
                        variant="subtitle1"
                        className="font-bold mb-2"
                      >
                        Nội dung:
                      </Typography>
                      <Typography className="text-gray-600 mb-4">
                        {assignment.topic}
                      </Typography>

                      <Box className="flex gap-3">
                        <Button
                          variant="contained"
                          color="primary"
                          startIcon={<DownloadIcon />}
                          onClick={() => handleDownload(assignment.fileUrl)}
                        >
                          Tải đề bài
                        </Button>

                        <input
                          type="file"
                          ref={(el) =>
                            (fileInputRef.current[assignment.id] = el)
                          }
                          onChange={(e) => handleFileChange(assignment.id, e)}
                          className="hidden"
                          accept=".pdf,.doc,.docx"
                        />
                        <Button
                          variant="contained"
                          color="success"
                          startIcon={<UploadIcon />}
                          onClick={() =>
                            fileInputRef.current[assignment.id].click()
                          }
                        >
                          Nộp bài
                        </Button>
                      </Box>
                    </Box>
                  )}
                </Paper>
              ))}
            </List>
          </Box>
        )}

        <Box className="mt-6 text-right">
          <Button variant="contained" color="secondary" onClick={onClose}>
            Đóng
          </Button>
        </Box>
      </div>
    </div>
  );
};

export default ClassDetail;
