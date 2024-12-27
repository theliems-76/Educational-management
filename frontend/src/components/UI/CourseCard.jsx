import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  Tooltip,
  Badge,
  styled,
} from "@mui/material";
import {
  AddCircleOutline,
  RemoveCircleOutline,
  CheckBoxOutlineBlank,
  CheckBox,
} from "@mui/icons-material";

const NewBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#ed0b4c",
    color: "white",
    padding: "0 4px",
    borderRadius: "8.93px 0px 8.93px 0px",
    fontFamily: "Poppins",
    fontSize: "14px",
    fontStyle: "normal",
    fontWeight: "600",
    lineHeight: "24px", /* 171.429% */
  },
}));

function CourseCard({ course }) {
  const [isAdded, setIsAdded] = React.useState(false);
  const [isChecked, setIsChecked] = React.useState(false);

  const handleAdd = () => {
    setIsAdded(!isAdded);
  };

  const handleCheck = () => {
    setIsChecked(!isChecked);
  };
  return (
    <div className="w-[245px] bg-white rounded-[10px] border border-[#dde1e6] flex-col justify-start items-center inline-flex overflow-hidden shadow-md">
      <div className="self-stretch h-40 bg-[#dde1e6] justify-start items-start inline-flex overflow-hidden relative">
        <CardMedia
          component="img"
          image={course.image}
          alt={course.title}
          className="w-full h-full object-cover"
        />
        <NewBadge
          badgeContent={"New"}
          color="primary"
          anchorOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            "& .MuiBadge-badge": {
              padding: "0 4px",
              borderBottomRightRadius: "8.93px",
              borderTopLeftRadius: "8.93px",
            },
          }}
        />
      </div>
      <div className="self-stretch p-4 bg-white flex-col justify-start items-start gap-1.5 flex">
        <Typography className="text-[#001d6c] text-base font-normal font-['Poppins']">
          {course.teacher}
        </Typography>
        <Typography className="text-[#001d6c] text-base font-semibold font-['Poppins']">
          {course.title}
        </Typography>
        <div className="self-stretch justify-start items-center gap-4 inline-flex mt-auto">
          <Tooltip
            title={isAdded ? "Remove from course" : "Add to course"}
            placement="top"
          >
            <IconButton
              onClick={handleAdd}
              size="small"
              className="text-[#001d6c]"
            >
              {isAdded ? (
                <RemoveCircleOutline />
              ) : (
                <AddCircleOutline />
              )}
            </IconButton>
          </Tooltip>
          <Tooltip
            title={isChecked ? "Uncheck" : "Check"}
            placement="top"
          >
            <IconButton
              onClick={handleCheck}
              size="small"
              className="text-[#001d6c]"
            >
              {isChecked ? (
                <CheckBox />
              ) : (
                <CheckBoxOutlineBlank />
              )}
            </IconButton>
          </Tooltip>
        </div>
      </div>
    </div>
  );
}

export default CourseCard;