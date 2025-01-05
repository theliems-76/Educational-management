import { Chip, IconButton, Tooltip, Typography, Box } from "@mui/material";
import React from "react";
import { CheckBox, CheckBoxOutlineBlank } from "@mui/icons-material";

function LessonCard({ lesson }) {
  const [isChecked, setIsChecked] = React.useState(false);
  const handleCheck = () => {
    setIsChecked(!isChecked);
  };
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 flex flex-col gap-4 shadow-sm">
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        flexWrap="wrap" // Add flexWrap to make items go to next line
      >
        <Typography variant="body2" className="text-gray-600" sx={{ flexBasis: 'auto' }}>
          {lesson.title}
        </Typography>
       <Chip
          label={lesson.status}
          color={
            lesson.status === "Completed"
              ? "success"
              : lesson.status === "Canceled"
              ? "default"
              : "primary"
          }
          size="small"
          className="font-['Poppins']"
            />
      </Box>
      <div className="flex justify-end items-center gap-4">
        <Tooltip title={isChecked ? "Uncheck" : "Check"} placement="top">
          <IconButton
            onClick={handleCheck}
            size="small"
            className="text-[#001d6c]"
          >
            {isChecked ? <CheckBox /> : <CheckBoxOutlineBlank />}
          </IconButton>
        </Tooltip>
      </div>
    </div>
  );
}

export default LessonCard;